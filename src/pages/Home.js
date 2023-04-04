import React from 'react';
import { useNavigate } from "react-router-dom";

import PubNub from 'pubnub';

import './Home.css';

import QR from "../components/QR";

import NameInput from "../components/NameInput";

var channelID = sessionStorage.getItem("pexKey");


function Home() {

  let navigate = useNavigate(); 
  
  const { userAgent } = navigator
  console.log(userAgent);

  var virtualRemote = new PubNub({
    publishKey: 'pub-c-62c7c7fd-85b5-41d0-a67f-7e3601a60752',
    subscribeKey: 'sub-c-4d7062b1-224e-4c5a-bcc4-1e789b5a6d32',
    keepAlive: true, // Keep the connection alive
    presenceTimeout: 600, // Don't timeout for 10 minutes
    uuid: "PexAssist_VirtualRemote"
    });
      
      virtualRemote.unsubscribeAll();
      virtualRemote.subscribe({ channels: [channelID],});
      virtualRemote.setHeartbeatInterval(60); // Send a heartbeat every 60 seconds
      
      virtualRemote.addListener({
          message: function (obj) {
              console.log("RX: " + obj.message);
      
              if (obj.message.includes("TerminateCall")=== true){
                  console.log("Action: Call has ended");
                 
                  virtualRemote.unsubscribeAll();
                  let path = "/pexQR?m=" +  sessionStorage.getItem("meetingID");
                  console.log ("End call path:",  path);
                  
                  navigate(path);
              }

              if (obj.message.includes("StartCall")=== true){
                  console.log("Action: Call has started");
                  startRemoteControl();
              }

          }});

 

 

  const startRemoteControl = () => {
  let path = "/pexQR/remote"; 
  navigate(path);
  }


return (
<>


<NameInput/>
<QR/>
<div><button className="remoteControlButton" id="remoteControlButton" onClick={startRemoteControl}>Remote Control</button></div>



</> 
)

}

export default Home;

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
    publishKey: 'pub-c-df7d4742-a65f-4f77-8f83-f1771c9445ba',
    subscribeKey: 'sub-c-b8d120fe-7004-40cb-ac25-0fc682333de0',
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

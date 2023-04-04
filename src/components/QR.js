import React from 'react';
import { useNavigate } from "react-router-dom";

import './QR.css';
import qr_loading from '../qr_loading.png';

function QR() {

const api_server="https://api.qrserver.com/v1/create-qr-code/?data=";

var today = new Date();
var date = today.getDate()+'-'+(today.getMonth()+1)+'-' + today.getFullYear();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime =  time +' '+ date;
console.log("Timestamp:", dateTime)
  
var href_string = window.location.href.toString();
var qr_image = qr_loading;
var qr_description;
var qr_info;

var sessionKey = sessionStorage.getItem("pexKey");

var remoteKey= '';

let navigate = useNavigate(); 


if (sessionKey !== null) {
  remoteKey = sessionKey;
} else {
const length= 12;
var characters= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
var charactersLength = characters.length;
for ( var i = 0; i < length; i++ ) {
  remoteKey += characters.charAt(Math.floor(Math.random() * charactersLength));
};
sessionStorage.setItem("pexKey", remoteKey);
}



if (href_string.includes("?m=")) {
  var pos = href_string.indexOf('?m=',0) +3;
  var meeting_id = href_string.slice(pos)
  
  sessionStorage.setItem("meetingID", meeting_id);
  console.log ("Session Meeting id:", sessionStorage.getItem("meetingID"));
  var name= localStorage.getItem("name");

var myObj = {
  "meeting": meeting_id,
  "name": name,
  "session": remoteKey
};

qr_image = api_server + JSON.stringify(myObj) + "&size=350x350";
qr_description = "Pex Meeting Code";
qr_info = "";

console.log ('QR code:', JSON.stringify(myObj));


} else {
  navigate("/pexQR/invalidMeeting");
   
}


  return (
    <div > 
    <div><img className="qrImage" name="qrImage" src={qr_image} alt="PexMeeting Code"/></div> 
    </div>
  );




}

export default QR;

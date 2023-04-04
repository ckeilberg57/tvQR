import React, { useState, useEffect } from 'react';
    import PubNub from 'pubnub';
    import { PubNubProvider, usePubNub } from 'pubnub-react';


    var channelID = sessionStorage.getItem("pexKey");
    console.log ("Remote Control Channel:", channelID );


const pubnub = new PubNub({
  publishKey: 'pub-c-df7d4742-a65f-4f77-8f83-f1771c9445ba',
  subscribeKey: 'sub-c-b8d120fe-7004-40cb-ac25-0fc682333de0',
  keepAlive: true, // Keep the connection alive
  presenceTimeout: 600, // Don't timeout for 10 minutes
  uuid: '1234'
    });

    function PubApp() {
      return (
        <PubNubProvider client={pubnub}>
          <Chat />
        </PubNubProvider>
      );
    }

    

    function Chat() {
      const pubnub = usePubNub();
      const [channels] = useState(['awesome-channelXCDFGH56ZZ39889']);
      const [messages, addMessage] = useState([]);
      const [message, setMessage] = useState('');

      const handleMessage = event => {
        const message = event.message;
        if (typeof message === 'string' || message.hasOwnProperty('text')) {
          const text = message.text || message;
          addMessage(messages => [...messages, text]);
        }
      };

      const sendMessage = message => {
        if (message) {
          pubnub
            .publish({ channel: channels[0], message })
            .then(() => setMessage(''));
            console.log ("send message:", channels[0], message)
        }
      };



      useEffect(() => {
        pubnub.addListener({ message: handleMessage });
        pubnub.subscribe({ channels });
      }, [pubnub, channels]);

      

      return (
        <div style={pageStyles}>
          <div style={chatStyles}>
            <div style={headerStyles}>React Chat Example</div>
            <div style={listStyles}>
              {messages.map((message, index) => {
                return (
                  <div key={`message-${index}`} style={messageStyles}>
                    {message}
                  </div>
                );
              })}
            </div>
            <div style={footerStyles}>
              <input
                type="text"
                style={inputStyles}
                placeholder="Type your message"
                value={message}
                onKeyPress={e => {
                  if (e.key !== 'Enter') return;
                  sendMessage(message);
                }}
                onChange={e => setMessage(e.target.value)}
              />
              <button
                style={buttonStyles}
                onClick={e => {
                  e.preventDefault();
                  sendMessage(message);
                }}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      );
    }

    const pageStyles = {
      alignItems: 'center',
      background: '#282c34',
      display: 'flex',
      justifyContent: 'center',
      minHeight: '100vh',
    };

    const chatStyles = {
      display: 'flex',
      flexDirection: 'column',
      height: '50vh',
      width: '50%',
    };

    const headerStyles = {
      background: '#323742',
      color: 'white',
      fontSize: '1.4rem',
      padding: '10px 15px',
    };

    const listStyles = {
      alignItems: 'flex-start',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      overflow: 'auto',
      padding: '10px',
    };

    const messageStyles = {
      backgroundColor: '#eee',
      borderRadius: '5px',
      color: '#333',
      fontSize: '1.1rem',
      margin: '5px',
      padding: '8px 15px',
    };

    const footerStyles = {
      display: 'flex',
    };

    const inputStyles = {
      flexGrow: 1,
      fontSize: '1.1rem',
      padding: '10px 15px',
    };

    const buttonStyles = {
      fontSize: '1.1rem',
      padding: '10px 15px',
    };

    export default PubApp;

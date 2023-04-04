import React, {useState, useEffect} from 'react';


import './Clock.css';


function Clock() {

  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
         setInterval(() => setDateState(new Date()), 10000);
  }, []);

  return (
    <div className="Clock">
      
        <div className="Time">
        {dateState.toLocaleString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })}
            </div>
        <div className="Date">
        {dateState.toLocaleDateString('en-GB', {
                weekday: 'long',
                day: 'numeric',
                month: 'long'
              })}
              </div>
    
     
    </div>
  );
}

export default Clock;

import {useRef, useState} from 'react';
import './NameInput.css';

const NameInput = (props)=>{

const nameInputRef = useRef();

const [enteredName, setEnteredName] = useState(() => {
    // getting stored value
    const initialValue = localStorage.getItem("name");
    console.log ("Name (init):", initialValue);
   
    return initialValue || "";
  });


console.log ("Name:", enteredName);

const nameInputChnageHandler = event => {
setEnteredName (event.target.value);
};

const nameOnFocusOutHandler = event => {
    setEnteredName (event.target.value);  
    console.log ("name on (blur) focus out:", enteredName);
    localStorage.setItem("name", enteredName);
    window.location.reload(false);
    };


return (
<div className='form-control'>
<label htmlFor='name'></label>
<input
className="inputForm"
ref={nameInputRef}
type='text'
id='name'
value={localStorage.getItem("name")}
placeholder="Your name" 
required
onChange={nameInputChnageHandler}
onBlur={nameOnFocusOutHandler}
/>
</div>

)

};

export default NameInput;

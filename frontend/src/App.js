import './App.css';
import { useState } from 'react'

function App() {
  const [inputValue, setInputValue]= useState('')
  const [greetingToDisplay, setGreetingToDisplay]= useState('')

  const handleInput = () => {
    console.log(inputValue)
    fetch('http://localhost:8080/greeting', {
      method: 'POST',
      body: JSON.stringify({
        inputValue
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
       .then((response) => response.json())
       .then((data) => {
          console.log(data.message);
          setGreetingToDisplay(data.message)
          
       })
       .catch((err) => {
          console.log(err.message);
       });
  }


  const getRequest = () => {
    console.log(5)
     fetch("http://localhost:8080/get-greeting")
    .then((res) =>res.json())
    .then((resultsData) =>{
      //Testing logs----------
      console.log(resultsData);
   
      });
  }

  return (
    <div className="App">
        <h1>Send a message:</h1>
        <input onChange={(e) => {setInputValue(e.target.value)}}></input>
        <button onClick={handleInput}>Send the message</button>
        <div>{greetingToDisplay === false ? '' : greetingToDisplay}</div>
        <button onClick={getRequest}>Get request</button>
    </div>
  );
}

export default App;

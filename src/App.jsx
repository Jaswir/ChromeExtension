import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [colour, setColour] = useState(0)

  const onClick = async () => {
    let [tabs] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tabs.id },
      function: addLikeButton,
    })
  }

  function addLikeButton() {

    // Element with this custom html property and value contains all messages
    var messageContainer = document.querySelectorAll('[aria-live="polite"]')[0]

    console.log("Message Container: ")
    console.log(messageContainer)

    //Add Like button to first message
    if (messageContainer.children.length != 0) {

      // Create the like button element
      var likeButton = document.createElement("div");
      likeButton.id = "likeButtonContainer";
      likeButton.className = "like-button";

      const myPolicy = trustedTypes.createPolicy('my-policy', {
        createHTML: (input) => {
          return input;
        }
      });

      const trustedHTML = myPolicy.createHTML(`
        <button id="likeButton" class="like-icon">&#128077;</button>
        <span id="likeCounter" class="like-count">0</span>`
      )
      likeButton.innerHTML = trustedHTML

      //Add like button element to message
      var message = messageContainer.children[0]
      message.appendChild(likeButton);

      //Add event listener for increase like counter
      var likeCount = 0
      var likeButton2 = document.getElementById("likeButton");
      var likeCounter = document.getElementById("likeCounter");

      likeButton2.addEventListener("click", function () {
        likeCount = 1 - likeCount;
        likeCounter.textContent = likeCount;
      });
    }
  }
  
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => onClick()}>
          Click me
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

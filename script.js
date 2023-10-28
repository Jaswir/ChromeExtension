
// document.getElementById("colorPicker").addEventListener("input", event => {
//   changeBackground(event.target.value)
// })


// Executes Specified Functions on active chrome tab
function executeFunctionsOnChromeTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: addLikeButton,
        })
    })
}

executeFunctionsOnChromeTab()



// FUNCTIONS // 
function addLikeButton() {
    // Element with this custom html property and value contains all messages
    var messageContainer = document.querySelectorAll('[aria-live="polite"]')[0]

    console.log("Message Container: ")
    console.log(messageContainer)

    //Add Like button to first message
    if (messageContainer.children.length != 0) {



        // Create the like button element
        var likeButton = document.createElement("div");
        likeButton.id = "likeButton";
        likeButton.className = "like-button";

        const myPolicy = trustedTypes.createPolicy('my-policy', {
            createHTML: (input) => {
                return input;
            }
        });

        const trustedHTML = myPolicy.createHTML(`
        <button class="like-icon">Like</button>
        <span class="like-count">&#128077;</span>`
        )
        likeButton.innerHTML = trustedHTML

        //Add like button element to message
        var message = messageContainer.children[0]
        message.appendChild(likeButton);

    }
}



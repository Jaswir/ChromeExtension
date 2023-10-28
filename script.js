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

//Kinda got stuck on this function , attempting to add a thumbs up reply 
// for every new message added to the dom, would be really great if you got that working!
// Make it so that every message has a like button, 
// or atleast for testing purposes like the first 2 messages. 
// 1 from person A, 1 from person B.
function addMessageListener() {

    var messageContainer = document.querySelectorAll('[aria-live="polite"]')[0]

    // Create a new Mutation Observer
    const observer = new MutationObserver(function (mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {

                // Checks if new messages were added
                const newMessage = mutation.addedNodes[0]
                console.log('New message added:', mutation.addedNodes[0]);


                // Adds like button to new message
                var likeButton = document.createElement("div");
                likeButton.id = "likeButton";
                likeButton.className = "like-button";

                const myPolicy = trustedTypes.createPolicy('my-policy', {
                    createHTML: (input) => {
                        return input;
                    }
                });

                const trustedHTML = myPolicy.createHTML(`
                        <button class="like-icon">&#128077;</button>
                        <span class="like-count">0</span>`
                )
                likeButton.innerHTML = trustedHTML
                const clonedElement = likeButton.cloneNode(true);

                //Add like button element to new message
                newMessage.appendChild(clonedElement);
            }
        }
    });

    // Configure and start observing the target element
    const config = { childList: true };
    observer.observe(messageContainer, config);

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
      
        likeButton2.addEventListener("click", function() {
          likeCount = 1 - likeCount;
          likeCounter.textContent = likeCount;  
        });
    }
}



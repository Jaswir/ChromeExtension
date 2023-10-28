
// chrome.extension.getBackgroundPage().console.log('foo');

// document.getElementById("colorPicker").addEventListener("input", event => {
//   changeBackground(event.target.value)
// })


// Executes Specified Functions on active chrome tab
function executeFunctionsOnChromeTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: changeText,
        })
    })
}

executeFunctionsOnChromeTab()

// function makeBlankPage() {
//     var body = document.body;

//     // Remove all child nodes from the body
//     while (body.firstChild) {
//         body.removeChild(body.firstChild);
//     }
// }


function changeText() {

    // Element with this custom html property and value contains all messages
    var messageContainer = document.querySelectorAll('[aria-live="polite"]')[0]

    console.log("Message Container: ")
    console.log(messageContainer)

    //Change text of first message
    if (messageContainer.children.length != 0) {
        var text0 = messageContainer.children[0].
            children[1].innerText = "thumbs up"
    }
}



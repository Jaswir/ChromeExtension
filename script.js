
// chrome.extension.getBackgroundPage().console.log('foo');

// document.getElementById("colorPicker").addEventListener("input", event => {
//   changeBackground(event.target.value)
// })

changeBackground("#fffaec")

// Executes Specified Script on active chrome tab
function changeBackground(color) {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: changeText,
            // args: [color],
        })
    })
}

function makeBlankPage() {
    var body = document.body;

    // Remove all child nodes from the body
    while (body.firstChild) {
        body.removeChild(body.firstChild);
    }
}

function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color

    console.log("Jaswir is the best")
    console.log("Message Dom: ")
}

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
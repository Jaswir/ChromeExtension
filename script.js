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
}

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
            function: changeBackgroundColor,
            args: [color],
        })
    })
}


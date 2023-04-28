

if(document.readyState !== 'complete') {
  addEventListener('load', () => {
    startDOMEvent() 
  })
} else {
  startDOMEvent() 
}

function sendMessage(key, value) {
  chrome.tabs.query(
    {
      currentWindow: true, 
      active: true
    }, 
    function (tabs){
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { [key]: value });
    }
  );
}

function colorPick (nome, value) {
  sendMessage(nome,value)
}

function startDOMEvent() {
  let checkbox = document.querySelector("#ativação")
  checkbox.addEventListener('click', function (event) {
    sendMessage('active', event.target.checked)
  })
  let colorPicker = document.querySelector("#colorpicker")
  colorPicker.addEventListener('change', function (event) {
    colorPick('color', event.target.value)
  })
}

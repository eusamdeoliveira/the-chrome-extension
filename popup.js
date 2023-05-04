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

function colocaNoStorage(key, value) {
  chrome.storage.local.set({ [key]: value })
}

function pegaNoStorage(key, callback) {
  chrome.storage.local.get([key]).then(callback)
}

function colorPick (nome, value) {
  sendMessage(nome,value)
}

function startDOMEvent() {
  let checkbox = document.querySelector("#ativação")
  pegaNoStorage("active", (result) => {
    
    if(!result.active) return
    checkbox.checked = result.active
  })
  checkbox.addEventListener('click', function (event) {
    sendMessage('active', event.target.checked)
    colocaNoStorage("active", event.target.checked)
  })
  let colorPicker = document.querySelector("#colorpicker")
  pegaNoStorage("color", (result) => {

    if(!result.color) return
    colorPicker.value = result.color
  })
  colorPicker.addEventListener('change', function (event) {
    colorPick('color', event.target.value)
    colocaNoStorage("color", event.target.value)
  })
}

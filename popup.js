

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
  chrome.storage.local.set({ [key]: value }).then(() => {
    console.log("Value is set to " + value);
  });
}

function pegaNoStorage(key) {
  chrome.storage.local.get([key]).then((result) => {
    console.log("Value currently is " + result.key);
  });
}

function colorPick (nome, value) {
  sendMessage(nome,value)
}

function startDOMEvent() {
  let checkbox = document.querySelector("#ativação")
  // pegar o valor no storage (active)
  checkbox.addEventListener('click', function (event) {
    sendMessage('active', event.target.checked)
    //salvar o valor no storage (active)

  })
  let colorPicker = document.querySelector("#colorpicker")
  // pegar o valor no storage (color)
  colorPicker.addEventListener('change', function (event) {
    colorPick('color', event.target.value)
    //salvar o valor no storage (color)
  })
}

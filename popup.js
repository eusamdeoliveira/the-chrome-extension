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

let checkbox = document.querySelector("#ativação")
checkbox.addEventListener('click', function (event) {
  sendMessage('active', event.target.checked)
  console.log(event.target.checked)
})
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

setTimeout(() => {
  sendMessage('active', true)
}, 1000)

setTimeout(() => {
  sendMessage('active', false)
}, 11000)
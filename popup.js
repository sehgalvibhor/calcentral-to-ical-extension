function hello() {
  chrome.tabs.executeScript({
    file: 'inject.js'
  }); 
}

document.getElementById('clickme').addEventListener('click', hello);

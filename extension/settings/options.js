// Saves options to firefox.storage
function saveOptions(e) {
  e.getPreventDefault();
  var country = document.getElementById('country').value;
  browser.storage.local.set({
    country: country
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector("#country").value = result.country || "france";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("country");
  getting.then(setCurrentChoice, onError);
  /*storage.sync.get({
    country: 'france'
  }, function(items) {
    document.getElementById('country').value = items.country;
  });*/
}
document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);

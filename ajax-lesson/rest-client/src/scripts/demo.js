document.getElementById('clearLog').addEventListener('click', window.clearLog);

// "Get Profile (Sync)" button click handler
document.getElementById('getProfileSync').addEventListener('click', function() {
  window.logMessage('Send GET /profiles (sync) request...');

  var isAsync = false;
  window.getProfile(isAsync, function(xmlhttp) {
    window.logMessage('Response GET /profiles (sync): ', xmlhttp.responseText, true);
  });
});

// "Get Profile (Async)" button click handler
document.getElementById('getProfileAsync').addEventListener('click', function() {
  window.logMessage('Send GET /profiles (async) request...');

  var isAsync = true;
  window.getProfile(isAsync, function(xmlhttp) {
    window.logMessage('Response GET /profiles (async): ', xmlhttp.responseText, true);
  });
});

// "Get Profile (Fetch API)" button click handler
document.getElementById('getProfileFetchAPI').addEventListener('click', function() {
  window.logMessage('Send GET /profiles (fetch) request...');

  window.getProfileWithFetchAPI().then(function(response) {
    window.logMessage('Response GET /profiles (fetch): ', response, true);
  });
});

// "Create Profile" form submit handler
document.getElementById('createProfile').addEventListener('click', function() {
  var profileName = document.getElementById('profileName').value;
  var profileAge = parseInt(document.getElementById('profileAge').value);

  var requestData = {
    name: profileName,
    age: profileAge
  };

  window.logMessage('Send POST /profiles request...');
  window.createProfile(requestData, function(xmlhttp) {
    window.logMessage('Response POST /profiles: ', xmlhttp.responseText, true);
  });
});

// "Upload Avatar" form submit handler
document.getElementById('uploadAvatar').addEventListener('click', function() {
  var formData = new FormData();

  var fileInputElement = document.getElementById('profileAvatarFile');
  formData.append('avatar', fileInputElement.files[0]);

  var userId = document.getElementById('userId').value;

  window.logMessage('Send POST /upload-avatar request...');
  window.uploadProfileAvatar(formData, userId, function(xmlhttp) {
    window.logMessage('Response POST /upload-avatar: ', xmlhttp.responseText, true);
  });
});

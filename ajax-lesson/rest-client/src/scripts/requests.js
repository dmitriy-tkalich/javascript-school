var endpoint = 'http://52.32.195.195:3000';

/**
 * Send GET /profiles request to retrieve profile
 */
function getProfile(isAsync, callback) {
  var xmlhttp = new XMLHttpRequest();  // Create XMLHttpRequest object to make AJAX request

  // Set event handler for request status change
  xmlhttp.onreadystatechange = function() {
    // Check if request state is DONE -- client-server communication is finished
    if (xmlhttp.readyState == XMLHttpRequest.DONE) {
      // Check if response status code is 200 (OK)
      if (xmlhttp.status == 200) {
        // parse JSON-formatted text to javascript object
        var response = JSON.parse(xmlhttp.responseText);
        console.log(response);

        callback(xmlhttp);
      } else {
        // NON 200 status code was returned. Usually it means, something went wrong, so we show error message
        alert('something else other than 200 was returned');
     }
    }
  };

  // Initialize request
  // * requestType -- type of request, e.g. GET, POST, PUT etc.
  // * URL -- url to make request
  // * isAsync -- show if request should be async or sync
  xmlhttp.open('GET', endpoint + '/profiles', isAsync);

  // Send request to server (specified in open method URL)
  xmlhttp.send();
}

/**
 * Send GET /profiles request to retrieve profile with Fetch API
 */
function getProfileWithFetchAPI() {
  // Call fetch method, which will initiate request immediately and provide to you response in callback
  return fetch(endpoint + '/profiles', { method: 'get' }).then(function(response) {
    return response.text();
  });
}

/**
 * Send POST /profiles request to create profile
 */
function createProfile(requestData, callback) {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == XMLHttpRequest.DONE) {
      if (xmlhttp.status == 200 || xmlhttp.status == 201) {
        callback(xmlhttp);
      }
    }
  };

  // Set POST type request
  xmlhttp.open('POST', endpoint + '/profiles', true);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  // Save profile data to JSON and put it in request body
  xmlhttp.send(JSON.stringify(requestData));
}

/**
 * Send POST /upload-avatar request to update profile's avatar
 */
function uploadProfileAvatar(formData, userId, callback) {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == XMLHttpRequest.DONE) {
      if (xmlhttp.status == 200 || xmlhttp.status == 201) {
        callback(xmlhttp);
      }
    }
  };

  xmlhttp.open('POST', endpoint + '/upload-avatar?userId=' + userId, true);
  // Add formData, which contains avatar to request body
  xmlhttp.send(formData);
}

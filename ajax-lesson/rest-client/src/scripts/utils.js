/**
 * Helper to log message on the page
 */
function logMessage(title, message, hasMargin) {
  if(hasMargin == undefined) hasMargin = false;

  var messagesList = document.getElementById('messagesList');

  var messageWrapperElement = document.createElement('div');
  var titleElement = document.createElement('b');
  var messageElement = document.createElement('pre');

  titleElement.innerHTML = title || '';
  messageElement.innerHTML = message || '';

  messageWrapperElement.appendChild(titleElement);
  if(message) {
    messageWrapperElement.appendChild(messageElement);
  }

  if(hasMargin) messageWrapperElement.style = 'margin-bottom: 10px';

  messagesList.appendChild(messageWrapperElement);
}

/**
 * Clear messages log
 */
function clearLog() {
  var messagesList = document.getElementById('messagesList');
  messagesList.innerHTML = '';
}

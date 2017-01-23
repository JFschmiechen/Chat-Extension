var config = {
  apiKey: "AIzaSyCAwawwT34ytgXyy5F6KDAKMVErYYlBqYM",
  authDomain: "chatapp-7fa59.firebaseapp.com",
  databaseURL: "https://chatapp-7fa59.firebaseio.com",
  storageBucket: "chatapp-7fa59.appspot.com",
  messagingSenderId: "805518429060"
};
firebase.initializeApp(config);
chrome.browserAction.onClicked.addListener(function(e) {
  window.open(chrome.extension.getURL("index.html"),"gc-popout-window","width =200,height=320")
});

const mainText = document.getElementById("mainText");
const returnField = document.getElementById("returnField");
const sendButton = document.getElementById('sendButton');
var fieldRef = firebase.database().ref(name);

var listenerRefresh = function(name) {
  if (listenerRefresh.done) return;

    fieldRef = firebase.database().ref(name);
    fieldRef.limitToLast(7).on('child_added', function(snap) {
      var div = document.createElement('p'); // creates new p tag in chatbox
      if (snap.val().currentName == firebase.auth().currentUser.displayName) {
        div.style.position = 'right';
      chatArea.appendChild(div);
      div.textContent = snap.val().currentName + ": " + snap.val().messageText;
    });
    fieldRef.on('child_removed', function(snapGone) {
      chatArea.removeChild(chatArea.firstChild);
    });
  listenerRefresh.done = true;
}

sendButton.onclick = function() {
  listenerRefresh(name);
  var firebaseRef = firebase.database().ref(name);
  var userNow = firebase.auth().currentUser;
  var currentName;
  if (userNow != null) {
    currentName = firebase.auth().currentUser.displayName;
  }
  var messageText = mainText.value;
  var newMessage = firebaseRef.push();
  newMessage.set({
     'messageText': messageText,
     'currentName': currentName
      });
  query = firebase.database().ref(name);
  query.on('value', function(snapshot) {
    count = snapshot.numChildren();
    if (count >= 7) {
      snapshot.forEach(function(childSnapshot) {
        query.child(childSnapshot.key).remove();
        return true;
      });
    }
  });
}



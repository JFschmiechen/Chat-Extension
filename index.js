var config = {
  apiKey: "AIzaSyCAwawwT34ytgXyy5F6KDAKMVErYYlBqYM",
  authDomain: "chatapp-7fa59.firebaseapp.com",
  databaseURL: "https://chatapp-7fa59.firebaseio.com",
  storageBucket: "chatapp-7fa59.appspot.com",
  messagingSenderId: "805518429060"
};
firebase.initializeApp(config);
const mainText = document.getElementById("mainText");
const returnField = document.getElementById("returnField");
const sendButton = document.getElementById('sendButton');
var fieldRef = firebase.database().ref(name);
var test;
var userEmail;
var timeStamp = firebase.database.ServerValue.TIMESTAMP;
var count = 0;
var totalMsg = 0;
var foo = sendButton.onclick;

sendButton.onclick = function() {
listenerRefresh(name);
  var firebaseRef = firebase.database().ref(name);
  var userNow = firebase.auth().currentUser;
  var currentName;
  if (userNow != null) {
    currentName = firebase.auth().currentUser.displayName;
  }
  var messageText = mainText.value;
  //get reference to the child node that you want to append to
  var newMessage = firebaseRef.push();
  newMessage.set({
     'messageText': messageText,
     'currentName': currentName
      });
  console.log("TESTING PUSHING NEW MESSAGE");
  console.log(newMessage.toString());
  totalMsg++;
  query = firebase.database().ref(name);
  query.on('value', function(snapshot) {
    count = snapshot.numChildren();
    if (count >= 3) {
      snapshot.forEach(function(childSnapshot) {
        query.child(childSnapshot.key).remove();
        return true;
      });
    }
  });
}

var joinRefRefresh = function(joinName) {
  databaseRef = firebase.database().ref(joinName);
  databaseRef.on('value', function(snapshot) {
    snapshot.forEach(function(childSnap) {
      var p = document.createElement('p');
      chatArea.appendChild(p);
      p.textContent = childSnap.val().currentName + ": " + childSnap.val().messageText;              
    });
  });
}

// Room Services
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
const fieldRef = firebase.database().ref(name);

var userEmail;
var timeStamp = firebase.database.ServerValue.TIMESTAMP;
var count = 0;
var totalMsg = 0;

firebase.auth().onAuthStateChanged(function(user) {
  if (user != null) {
    userEmail = user.email;
  }
})

sendButton.onclick = function() {
  var firebaseRef = firebase.database().ref(name);
  var user = firebase.auth().currentUser;
  var currentName;
  if (user != null) {
      currentName = firebase.auth().currentUser.displayName;
  }
  var messageText = mainText.value;
  firebaseRef.push({messageText,
	  currentName
  }, function(error) {
    console.log(error);
  });
  totalMsg++;
  query = firebase.database().ref(name)
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

fieldRef.on('child_added', function(textSnap) {
  var div = document.createElement('p'); // creates new p tag in chatbox
  chatArea.appendChild(div);
  div.textContent = textSnap.val().currentName + ": " + textSnap.val().messageText;
}, function(error) {
  console.error(error);
});

fieldRef.on('child_removed', function(textSnap, id) {
  chatArea.removeChild(chatArea.firstChild);
});

// Room Services

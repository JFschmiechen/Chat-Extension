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
const sendBtn = document.getElementById('sendBtn');
const fieldRef = firebase.database().ref(name);

var userEmail;
var timeStamp = firebase.database.ServerValue.TIMESTAMP;
var count = 0;
var totalMsg = 0;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    userEmail = user.email;
  }
})

sendBtn.onclick = function(){sendClick()};
function sendClick() {
  firebaseRef = firebase.database().ref(name);

  var messageText = mainText.value;
    firebaseRef.child(totalMsg).set({messageText,
	    timeStamp,
      count
  	});
    totalMsg++;
    count++;
  if (totalMsg >= 3) {
    fieldRef.child(totalMsg - count).remove();
    count--;
  }
}

fieldRef.on('child_added', function(textSnap, id) {
   id = textSnap.key;
   var div = document.createElement('p'); // creates new p tag in chatbox
   chatArea.appendChild(div);
   div.textContent = userEmail + ": " + textSnap.val().messageText;


});

fieldRef.on('child_removed', function(textSnap, id) {
  id = chatArea.firstChild.key;
  chatArea.removeChild(chatArea.firstChild);
});

// Room Service

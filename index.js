const mainText = document.getElementById("mainText");
const returnField = document.getElementById("returnField");
const fieldRef = firebase.database().ref('messageLog');
var userEmail;
var timeStamp = firebase.database.ServerValue.TIMESTAMP;
var count = 0;
var totalMsg = 0;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    userEmail = user.email;
  }
})

function sendClick() {
  firebaseRef = firebase.database().ref('messageLog');

  var messageText = mainText.value;
    firebaseRef.child(totalMsg).set({messageText,
	timeStamp,
	count,
	});
  if (totalMsg >= 3) {
    fieldRef.child(totalMsg - count).remove();
  }
}

fieldRef.on('child_added', function(textSnap, id) {
   id = textSnap.key;
   var div = document.createElement('p'); // creates new p tag in chatbox
   chatArea.appendChild(div);
   div.textContent = userEmail + ": " + textSnap.val().messageText;
   count++;
   totalMsg++;

});

fieldRef.on('child_removed', function(textSnap, id) {
  id = chatArea.firstChild.key;
  chatArea.removeChild(chatArea.firstChild);
  count--;
});

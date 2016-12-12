var mainText = document.getElementById("mainText");
var returnField = document.getElementById("returnField");
var fieldRef = firebase.database().ref();

function sendClick() {
  var timeStamp = firebase.database.ServerValue.TIMESTAMP;
  var msgCount = 1;
  firebaseRef = firebase.database().ref();

  var messageText = mainText.value;
    firebaseRef.push(messageText);
    var temp = firebaseRef.key;
    firebaseRef.temp.ref().child('timeID').set(timeStamp); // Error, syntax most likely wrong
}

fieldRef.on('child_added', function(textSnap, id) {

   id = textSnap.key;
   var div = document.createElement('p'); // creates new p tag in chatbox
   chatArea.appendChild(div);
   div.textContent = textSnap.val();
});

fieldRef.on('child_removed', function(textSnap, id) {

  id = chatArea.firstChild.key;
  chatArea.removeChild(chatArea.firstChild);
})

var mainText = document.getElementById("mainText");
var returnField = document.getElementById("returnField");

var fieldRef = firebase.database().ref().child("text");

fieldRef.on('value', function(textSnap) {
   returnField.innerText = textSnap.val();
});

function sendClick() {
  firebaseRef = firebase.database().ref();

  var messageText = mainText.value;
  firebaseRef.child("text").set(messageText);

}

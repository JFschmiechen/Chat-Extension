var mainText = document.getElementById("mainText");
var returnField = document.getElementById("returnField");
var fieldRef = firebase.database().ref('messageLog');
var timeStamp = firebase.database.ServerValue.TIMESTAMP;
var count = 0;
var totalMsg = 0;

function sendClick() {

  firebaseRef = firebase.database().ref('messageLog');

  var messageText = mainText.value;
    firebaseRef.push({messageText,
	timeStamp,
	count
	});
  firebaseRef.orderByChild('timeStamp');l
}

fieldRef.on('child_added', function(textSnap, id) {

   id = textSnap.key;
   var div = document.createElement('p'); // creates new p tag in chatbox
   chatArea.appendChild(div);
   div.textContent = textSnap.val().messageText;
   count++;
   totalMsg++;
});

fieldRef.on('child_removed', function(textSnap, id) {

  id = chatArea.firstChild.key;
  chatArea.removeChild(chatArea.firstChild);
  count--;
});

  fieldRef.on('value', function(parentSnap) {
    parentSnap.forEach(function(childSnap) {
    var childBirth = childSnap.val().timeStamp;
    var childKey = childSnap.key;
    alert("before if");
    if (true) {
      alert("after if");
      childSnap.ref().set(null);
      alert("done");
    }
  });
});

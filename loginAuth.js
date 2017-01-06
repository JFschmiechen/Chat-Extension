const email = document.getElementById('emailField');
const pass = document.getElementById('passField');
const buttonLogin = document.getElementById('login');
const buttonSignUp = document.getElementById('signUp');
const buttonLogout = document.getElementById('logOut');
const logOutInner = document.getElementById('logOutInner');
const invalidText = document.getElementById('invalidEmail');
const createButton = document.getElementById('createRoom');
const joinButton = document.getElementById('joinRoom');
const roomService = document.getElementById('roomService');
const roomName = document.getElementById('roomName');
const roomPass = document.getElementById('roomPass');
const roomNameJoin = document.getElementById('roomNameJoin');
const roomPassJoin = document.getElementById('roomPassJoin');
const finalizeJoin = document.getElementById('finalizeJoin');
const backToRoomServiceJoin = document.getElementById('backToRoomServiceJoin');
const finalizeRoomButton = document.getElementById('finalizeRoom');
const createRoomForm = document.getElementById('createForm');
const backToRoomService = document.getElementById('backToRoomService');
const displayForm = document.getElementById('displayForm');
const displayCancel = document.getElementById('displayCancel');
const displayFinalize = document.getElementById('displayFinalize');
const db = firebase.database().ref();
const databaseRoom = firebase.database().ref(joinName);

var name;
var joinName;
var joinPass;
var userDisplayName;

// Login

buttonLogin.addEventListener('click', function(e) {
  const emailVal = email.value;
  const passVal = pass.value;
  const auth = firebase.auth();
  const promise = auth.signInWithEmailAndPassword(emailVal, passVal);
  roomService.removeAttribute('hidden');
  buttonLogout.removeAttribute('hidden');
  loginForm.setAttribute('hidden', 'loginForm');
  invalidText.setAttribute('hidden', 'invalidText');

  promise.catch(function(e) {
    console.log(e.message);
  });
});

// sign up

buttonSignUp.addEventListener('click', function(e) {
  const emailVal = email.value;
  const passVal = pass.value;
  const auth = firebase.auth();
  if ((emailVal.includes('@') && emailVal.includes('.com'))) {
    firebase.auth().createUserWithEmailAndPassword(emailVal, passVal)
      .catch(function(error) {
        console.log(error);
      });

  } else {
    invalidText.removeAttribute('hidden');
  }
  displayNameForm.removeAttribute('hidden');
  loginForm.setAttribute('hidden', 'loginForm');
});

displayFinalize.addEventListener('click', function(e) {
  firebase.auth().currentUser.updateProfile({displayName: document.getElementById('displayForm').value});
  roomService.removeAttribute('hidden');
  buttonLogout.removeAttribute('hidden');
  loginForm.setAttribute('hidden', 'loginForm');
  invalidText.setAttribute('hidden', 'invalidText');
  displayNameForm.setAttribute('hidden', 'displayNameForm');

})

displayCancel.addEventListener('click', function(e) {
  var user = firebase.auth().currentUser;
  roomService.setAttribute('hidden', 'roomService');
  buttonLogout.setAttribute('hidden', 'buttonLogout');
  container.setAttribute('hidden', 'container');
  loginForm.removeAttribute('hidden');
  displayNameForm.setAttribute('hidden', displayNameForm);
  if (user) {
    user.delete();
  }
})

// Log out

buttonLogout.addEventListener('click', function(e) {
  firebase.auth().signOut();
  roomService.setAttribute('hidden', 'roomService');
  buttonLogout.setAttribute('hidden', 'buttonLogout');
  container.setAttribute('hidden', 'container');
  loginForm.removeAttribute('hidden');
});

logOutInner.addEventListener('click', function(e) {
  firebase.auth().signOut();
  roomService.setAttribute('hidden', 'roomService');
  buttonLogout.setAttribute('hidden', 'buttonLogout');
  container.setAttribute('hidden', 'container');
  loginForm.removeAttribute('hidden');
})

// Back to menu

if (backToRoomService) {
  backToRoomService.addEventListener('click', function(e) {
    roomService.removeAttribute('hidden');
    createRoomForm.setAttribute('hidden', 'createRoomForm');
  })
}

// Create room

if (createButton) {
  createButton.addEventListener('click', function(e) {
    createRoomForm.removeAttribute('hidden');
    roomService.setAttribute('hidden', 'roomService');
  })
}

if (finalizeRoomButton) {
  finalizeRoomButton.addEventListener('click', function(e) {
    name = roomName.value;
    var pass = roomPass.value;
    passList = db.child('passwords');
    db.once('value', function(snapshot) {
      if (snapshot.hasChild(name)) {
        document.getElementById('nameTaken').innerHTML = name + " has been taken. Try something different.";
        document.getElementById('nameTaken').removeAttribute('hidden');
      } else {
        container.removeAttribute('hidden');
        db.child(name).set(pass);
        passList.child(name).set(pass);
        createRoomForm.setAttribute('hidden', 'createRoomForm');
        chatArea.innerHTML = "Chat";
       }
    });
  })
}

// Join room

if (joinRoom) {
  joinRoom.addEventListener('click', function(e) {
    joinForm.removeAttribute('hidden');
    roomService.setAttribute('hidden', 'roomService');
  })
}

  backToRoomServiceJoin.addEventListener('click', function(e) {
    joinForm.setAttribute('hidden', 'joinForm');
    roomService.removeAttribute('hidden');
  })

if (finalizeJoin) {
  finalizeJoin.addEventListener('click', function(e) {
    joinName = roomNameJoin.value;
    joinPass = roomPassJoin.value;

    roomToJoin = firebase.database().ref('passwords');
    roomToJoin.on("value", function(snapShot) {


      if (snapShot.child(joinName).val() == joinPass) {
        alert('after if');
      databaseRoom.once('value')
        .then(function(snapshot) {
            snapshot.forEach(function(childSnap) {
              var p = document.createElement('p');
              chatArea.appendChild(p);
              p.textContent = childSnap.val().messageText;
            });
          });
        container.removeAttribute('hidden');
        joinForm.setAttribute('hidden', 'joinForm');
	      alert('done');
      }
    });
  })
}
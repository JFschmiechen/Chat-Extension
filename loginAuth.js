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
const emailAuthRoom = document.getElementById('emailAuthRoom');
const cancelAuth = document.getElementById('cancelAuth');
const mainBackToRoomService = document.getElementById('mainBackToRoomService');
const db = firebase.database().ref();

var name;
var joinName;
var joinPass;
var userDisplayName;
//var user = firebase.auth().currentUser;

// Login

buttonLogin.addEventListener('click', function(e) {
  const emailVal = email.value;
  const passVal = pass.value;
  const promise = firebase.auth().signInWithEmailAndPassword(emailVal, passVal);

  firebase.auth().onAuthStateChanged(function(user) {
      firebase.auth().currentUser.reload();
      if (firebase.auth().currentUser.emailVerified) {
        if (firebase.auth().currentUser.displayName == null) { // No name
          displayNameForm.removeAttribute('hidden');
          roomService.setAttribute('hidden', 'roomService');
          buttonLogout.setAttribute('hidden', 'buttonLogout');
          loginForm.setAttribute('hidden', 'loginForm');
          invalidText.setAttribute('hidden', 'invalidText');
        } else { // Green light

          displayNameForm.setAttribute('hidden', 'displayNameForm');
          roomService.removeAttribute('hidden');
          loginForm.setAttribute('hidden', 'loginForm');
          console.log(name);
          console.log(firebase.auth().currentUser.displayName);
        }
      } else { // click here to send another email.
        emailAuthRoom.removeAttribute('hidden');
        loginForm.setAttribute('hidden', 'loginForm');
      }
    promise.catch(function(e) {
      console.log(e.message);
    });
  });
});

// sign up

buttonSignUp.addEventListener('click', function(e) {
  const emailVal = email.value;
  const passVal = pass.value;
  const auth = firebase.auth();
  if ((emailVal.includes('@') && emailVal.includes('.'))) {
    firebase.auth().createUserWithEmailAndPassword(emailVal, passVal)
      .catch(function(error) {
        console.log(error);
      });
  } else {
    invalidText.removeAttribute('hidden');
  }
  firebase.auth().onAuthStateChanged(function(user) {
    if (!(firebase.auth().currentUser.emailVerified)) {
      firebase.auth().currentUser.sendEmailVerification().then(function() {
        loginForm.setAttribute('hidden', 'loginForm');
        emailAuthRoom.removeAttribute('hidden');
        console.log("email sent");
      }, function(error) {
        console.log(error);
      });
    }
  });
});

cancelAuth.addEventListener('click', function(e) {
  emailAuthRoom.setAttribute('hidden', 'emailAuthRoom');
  loginForm.removeAttribute('hidden');
});

// Setting username

displayFinalize.addEventListener('click', function(e) {
  var user = firebase.auth().currentUser;
  user.updateProfile({
    displayName: displayForm.value
  });
  console.log(user);
  roomService.removeAttribute('hidden');
  buttonLogout.removeAttribute('hidden');
  loginForm.setAttribute('hidden', 'loginForm');
  invalidText.setAttribute('hidden', 'invalidText');
  displayNameForm.setAttribute('hidden', 'displayNameForm');
});

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
});

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
});

// Back to menu

if (backToRoomService) {
  backToRoomService.addEventListener('click', function(e) {
    roomService.removeAttribute('hidden');
    createRoomForm.setAttribute('hidden', 'createRoomForm');
  });
}

if (mainBackToRoomService) {
  mainBackToRoomService.addEventListener('click', function(e) {
    roomService.removeAttribute('hidden');
    container.setAttribute('hidden', 'container');
  });
}

// Create room

if (createButton) {
  createButton.addEventListener('click', function(e) {
    createRoomForm.removeAttribute('hidden');
    roomService.setAttribute('hidden', 'roomService');
  });
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
        chatArea.innerHTML = 'Chat';
      }
    });
  });
};

// Join room

if (joinRoom) {
  joinRoom.addEventListener('click', function(e) {
    joinForm.removeAttribute('hidden');
    roomService.setAttribute('hidden', 'roomService');
  });
}

if (backToRoomServiceJoin) {
  backToRoomServiceJoin.addEventListener('click', function(e) {
    joinForm.setAttribute('hidden', 'joinForm');
    roomService.removeAttribute('hidden');
  });
}

if (finalizeJoin) {
  finalizeJoin.addEventListener('click', function(e) {
    name = roomNameJoin.value;
    joinPass = roomPassJoin.value;

    roomToJoin = firebase.database().ref('passwords');
    roomToJoin.on("value", function(snapShot) {


    if (snapShot.child(name).val() == joinPass) {
      fieldRef.once('value')
        .then(function(snapshot) {
            snapshot.forEach(function(childSnap) {
              var p = document.createElement('p');
              chatArea.appendChild(p);
              p.textContent = childSnap.val().messageText;
            });
          });
        container.removeAttribute('hidden');
        joinForm.setAttribute('hidden', 'joinForm');
	      //mainText.value = '';
      }
    });
  });
}

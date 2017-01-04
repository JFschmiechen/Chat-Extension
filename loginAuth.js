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
const roomPassJoin = document.getElementById('roomPassJoin')
const finalizeJoin = document.getElementById('finalizeJoin');
const backToRoomServiceJoin = document.getElementById('backToRoomServiceJoin');
const finalizeRoomButton = document.getElementById('finalizeRoom');
const createRoomForm = document.getElementById('createForm');
const backToRoomService = document.getElementById('backToRoomService');
const db = firebase.database().ref();

var name = "default";
var joinName;
var joinPass;

// Login

buttonLogin.addEventListener('click', function(e) {
  const emailVal = email.value;
  const passVal = pass.value;
  const auth = firebase.auth();

  const promise = auth.signInWithEmailAndPassword(emailVal, passVal);
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
    const promise = auth.createUserWithEmailAndPassword(emailVal, passVal);
  } else {
    invalidText.removeAttribute('hidden');
  }

  promise.catch(function(e) {
    console.log(e.message);
  });
});

// Log out

buttonLogout.addEventListener('click', function(e) {
  firebase.auth().signOut();
});

logOutInner.addEventListener('click', function(e) {
  firebase.auth().signOut();
})

// Auth state change

firebase.auth().onAuthStateChanged(function(firebaseUser) {
  if (firebaseUser) {
    console.log(firebaseUser);
    roomService.removeAttribute('hidden');
    buttonLogout.removeAttribute('hidden');
    loginForm.setAttribute('hidden', 'loginForm');
    invalidText.setAttribute('hidden', 'invalidText');
  } else {
    console.log("logged out");
    roomService.setAttribute('hidden', 'roomService');
    buttonLogout.setAttribute('hidden', 'buttonLogout');
    container.setAttribute('hidden', 'container');
    loginForm.removeAttribute('hidden');
  }
});

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
    passList.child(name).set(pass);
    container.removeAttribute('hidden');
    createRoomForm.setAttribute('hidden', 'createRoomForm');
    chatArea.innerHTML = "";
  })
}

// Join room

if (joinRoom) {
  joinRoom.addEventListener('click', function(e) {
    joinForm.removeAttribute('hidden');
    roomService.setAttribute('hidden', 'roomService');
  })
}

if (finalizeJoin) {
  finalizeJoin.addEventListener('click', function(e) {
    joinName = roomNameJoin.value;
    joinPass = roomPassJoin.value;

    roomToJoin = firebase.database().ref('passwords');
    roomToJoin.on("value", function(snapShot) {
    console.log(snapShot.child(joinName).val());
    
      if (snapShot.child(joinName).val() == joinPass) {
        alert('after if');
        roomToJoin.on('value', function(snapshot) {
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
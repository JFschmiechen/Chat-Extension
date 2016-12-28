
const email = document.getElementById('emailField');
const pass = document.getElementById('passField');
const btnLogin = document.getElementById('login');
const btnSignUp = document.getElementById('signUp');
const btnLogout = document.getElementById('logOut');
const logOutInner = document.getElementById('logOutInner');
const invalidText = document.getElementById('invalidEmail');
const createBtn = document.getElementById('createRm');
const joinBtn = document.getElementById('joinRm');
const rmService = document.getElementById('roomService');
const rmName = document.getElementById('rmName');
const rmPass = document.getElementById('rmPass');
const rmNameJoin = document.getElementById('rmNameJoin');
const rmPassJoin = document.getElementById('rmPassJoin')
const finalizeJoin = document.getElementById('finalizeJoin');
const backToRmSJ = document.getElementById('backToRmSJ');
const finalizeRmBtn = document.getElementById('finalizeRm');
const createRmForm = document.getElementById('createForm');
const backToRmS = document.getElementById('backToRmS');
const db = firebase.database().ref();
var name;
var joinName;
var joinPass;

// Login

btnLogin.addEventListener('click', e => {
  const emailVal = email.value;
  const passVal = pass.value;
  const auth = firebase.auth();

  const promise = auth.signInWithEmailAndPassword(emailVal, passVal);

  promise.catch(e => console.log(e.message));
});

// sign up

btnSignUp.addEventListener('click', e => {
  const emailVal = email.value;
  const passVal = pass.value;
  const auth = firebase.auth();
  if ((emailVal.includes('@') && emailVal.includes('.com'))) {
    const promise = auth.createUserWithEmailAndPassword(emailVal, passVal);
  } else {
    invalidText.removeAttribute('hidden');
  }

  promise.catch(e => console.log(e.message));
});

// Log out

btnLogout.addEventListener('click', e => {
  firebase.auth().signOut();
});

logOutInner.addEventListener('click', e => {
  firebase.auth().signOut();
})

// Auth state change

firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    console.log(firebaseUser);
    rmService.removeAttribute('hidden');
    btnLogout.removeAttribute('hidden');
    loginForm.setAttribute('hidden', 'loginForm');
    invalidText.setAttribute('hidden', 'invalidText');
  } else {
    console.log("logged out");
    rmService.setAttribute('hidden', 'rmService');
    btnLogout.setAttribute('hidden', 'btnLogout');
    container.setAttribute('hidden', 'container');
    loginForm.removeAttribute('hidden');
  }
});

// Back to menu

if (backToRmS) {
  backToRmS.addEventListener('click', e => {
    rmService.removeAttribute('hidden');
    createRmForm.setAttribute('hidden', 'createRmForm');
  })
}
// Create room

if (createBtn) {
  createBtn.addEventListener('click', e => {
    createRmForm.removeAttribute('hidden');
    rmService.setAttribute('hidden', 'rmService');
  })
}

if (finalizeRmBtn) {
  finalizeRmBtn.addEventListener('click', e => {
    name = rmName.value;
    var pass = rmPass.value;
    db.child(name).set(pass);
    container.removeAttribute('hidden');
    createRmForm.setAttribute('hidden', 'createRmForm');
    chatArea.innerHTML = "";
  })
}

// Join room
if (joinRm) {
  joinRm.addEventListener('click', e => {
    joinForm.removeAttribute('hidden');
    rmService.setAttribute('hidden', 'rmService');
  })
}

if (finalizeJoin) {
  finalizeJoin.addEventListener('click', e => {
    joinName = rmNameJoin.value;
    joinPass = rmPassJoin.value;

    roomToJoin = db.child(joinName).ref();

    if (roomToJoin.val() == joinPass) {
      db.once('value')
        .then(function(snapshot) {
          snapshot.forEach(function(childSnap) {
            var p = document.createElement('p');
            chatArea.appendChild('p');
            p.textContent = childSnap.val().messageText;
          })
        })
      }
    })
  }

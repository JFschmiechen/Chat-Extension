const email = document.getElementById('emailField');
const pass = document.getElementById('passField');
const btnLogin = document.getElementById('login');
const btnSignUp = document.getElementById('signUp');
const btnLogout = document.getElementById('logOut');

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

  const promise = auth.createUserWithEmailAndPassword(emailVal, passVal);

  promise.catch(e => console.log(e.message));
});

// Log out

btnLogout.addEventListener('click', e => {
  firebase.auth().signOut();
});

// Auth state change

firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    console.log(firebaseUser);
    btnLogout.removeAttribute('hidden');
    container.removeAttribute('hidden');
    loginForm.setAttribute('hidden', 'loginForm');

  } else {
    console.log("logged out");
    btnLogout.setAttribute('hidden', 'btnLogout');
    container.setAttribute('hidden', 'container');
    loginForm.removeAttribute('hidden');
  }
});

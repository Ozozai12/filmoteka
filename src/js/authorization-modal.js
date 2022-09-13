const ui = new firebaseui.auth.AuthUI(firebase.auth());
const userName = document.querySelector('.sign-name');
const logOutBtn = document.querySelector('.btn__autorisation');
const logIcon = document.querySelector('.icon-enter');

// 2) These are our configurations.
const uiConfig = {
  signInFlow: 'popup',
  // signInSuccessUrl: 'https://ozozai12.github.io/filmoteka/',
  signInSuccessUrl: 'http://localhost:1234/',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: function (authResult) {
      if (authResult) {
        return true;
      }
    },
  },
};

// 3) Call the 'start' method on our ui class
// including our configuration options.
const uiStart = () => ui.start('#firebaseui-auth-container', uiConfig);
logOutBtn.addEventListener('click', logOut);
firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    let displayName = firebaseUser.displayName;
    if (displayName === null) {
      displayName = 'guest';
    }
    userName.innerHTML = `${displayName}`;
    logOutBtn.classList.remove('is-hidden');
    logIcon.style.display = 'none';
  } else {
    notLogged();
  }
});

function notLogged() {
  userName.innerHTML = 'SIGN IN';
  // showOpenModalBtn();
  uiStart();
}

function logOut() {
  firebase.auth().signOut();
  window.location.reload();
}

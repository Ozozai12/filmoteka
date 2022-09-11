const ui = new firebaseui.auth.AuthUI(firebase.auth());
const userName = document.querySelector('.sign-name');

// 2) These are our configurations.
const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: 'signedIn',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: function (authResult) {
      if (authResult) {
        // setUserData(firebaseUser.uid);
        return true;
      }
    },
  },
};

// 3) Call the 'start' method on our ui class
// including our configuration options.
const uiStart = () => ui.start('#firebaseui-auth-container', uiConfig);
// const userName = document.querySelector('.name');
function setUserData(userId) {
  const userLibrary = {
    userId: userId,
    userWatched: [],
    userQueue: [],
  };
  const updates = {};
  updates['users/' + userId] = userLibrary;
  return firebase.database().ref().update(updates);
}

firebase.auth().onAuthStateChanged(firebaseUser => {
  window.location.href = 'https://ozozai12.github.io/filmoteka/';
  if (firebaseUser) {
    let displayName = firebaseUser.displayName;
    if (displayName === null) {
      displayName = 'guest';
    }
    userName.innerHTML = `${displayName}`;
  } else {
    notLogged();
  }
});

function notLogged() {
  userName.innerHTML = 'SIGN IN';
  // showOpenModalBtn();
  uiStart();
}

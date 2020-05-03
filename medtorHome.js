var firebaseConfig = {
  apiKey: "AIzaSyBudIMeTFdzQ1HNSTOrGCfr3WnTa2y-Ij8",
  authDomain: "medtortest.firebaseapp.com",
  databaseURL: "https://medtortest.firebaseio.com",
  projectId: "medtortest",
  storageBucket: "medtortest.appspot.com",
  messagingSenderId: "423809348674",
  appId: "1:423809348674:web:0e1a0f78ffb4db0e59a9db",
  measurementId: "G-R464GQH3TF"
};
firebase.initializeApp(firebaseConfig);

var databaseRef = firebase.database().ref();

var upperLogInBtn = document.getElementById('upperLogIn')

console.log("working");

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    //user signed in
    console.log("here");
    upperLogInBtn.innerHTML = user.email;
    upperLogInBtn.href = "#";

  } else {
    //user not signed in
    console.log("didHere2")
  }
});

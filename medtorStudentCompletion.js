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
var functions = firebase.functions();

var upperLogInBtn = document.getElementById('upperLogIn');
var emailText = document.getElementById('emailer');

var theUserRN = null;
var formState = null;
console.log("here");
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    if (user.emailVerified == false) {
      console.log("userNotVerified");
      window.location.href = "medtorHome.html";
    }
    if (user.displayName == "Mentor") {
      window.location.href = "medtorAuthPass.html";
    }

    if (localStorage.getItem("currUser") === null){
      logOut(event);
    }
    else {
      theUserRN = JSON.parse(localStorage["currUser"]);
      formState = theUserRN["formState"];
      if (formState < 5){
        window.location.href = "medtorResults.html";
      }
    }

    //emailText.innerHTML = user.email;
    document.getElementById('nameIns').innerHTML = theUserRN.matchMentor.name;
    document.getElementById('emailIns').innerHTML = theUserRN.matchMentor.email;
    document.getElementById('phoneIns').innerHTML = theUserRN.matchMentor.phone;
    //user signed in
    console.log("here");
    upperLogInBtn.innerHTML = "Log Out";
    upperLogInBtn.onclick = function(){
      console.log("trying to log out");
      logOut(event);
    };


  } else {
    //user not signed in
    console.log("here2");
    window.location.href = "medtorHome.html";
  }
});


function logOut(e) {
  e = e || window.event;
  e.preventDefault();
  localStorage.clear();
  firebase.auth().signOut().then(function() {
    window.location.href = "medtorHome.html";
  }).catch(function(error) {
    // An error happened.
  });
}

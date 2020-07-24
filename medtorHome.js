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

var theUserRN = null;
var formState = null;

//console.log("working");

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    //user signed in
    //console.log("here");
    // upperLogInBtn.display = 'none';
    // upperLogInBtn.disable = true;

    //upperLogOutBtn.disable = false;
    upperLogInBtn.innerHTML = "Log Out";
    //upperLogInBtn.href = "medtorHome.html";
    upperLogInBtn.onclick = function(){
      logOut(event);
    };

    if (localStorage.getItem("currUser") === null){
      logOut(event);
    }
    else {
      theUserRN = JSON.parse(localStorage["currUser"]);
      formState = theUserRN["formState"];
      if (formState >= 4 && user.displayName == "Student"){
        document.getElementById("profBtn").innerHTML = "My Matches";

      }
    }

    document.getElementById("welcomeSec").style.display = "flex";
    document.getElementById("welcome").innerHTML = "Welcome " + user.email + "!";
    document.getElementById("mentBtn").style.display = "none";
    document.getElementById("studBtn").style.display = "none";
    // upperLogItem.style.background = "#27abff"
    // upperLogItem.style.borderColor = "#27abff"
    //document.getElementById("itemLogIn").style.background = #27abff;

  } else {
    //user not signed in
    //console.log("didHere2");
    upperLogInBtn.innerHTML = "Register";
    upperLogInBtn.href = "medtorRegisterDec.html";
    upperLogInBtn.onclick = function(){
      null;
    };
  }
});

function goNextPage(){
  var user = firebase.auth().currentUser;
  if (user.displayName == "Student") {
    if (formState == 5){
      window.location.href = "medtorStudentCompletion.html";
    }
    else if (formState == 4){
      window.location.href = "medtorResults.html";
    }
    else {
      window.location.href = "medtorStudentForm1.html";
    }
  }
  if (user.displayName == "Mentor") {
    window.location.href = "medtorMentorForm1.html";
  }
}

//log out feature
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

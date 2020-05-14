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

console.log("working");

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    //user signed in
    console.log("here");
    // upperLogInBtn.display = 'none';
    // upperLogInBtn.disable = true;

    //upperLogOutBtn.disable = false;
    upperLogInBtn.innerHTML = "Log Out";
    //upperLogInBtn.href = "medtorHome.html";
    upperLogInBtn.onclick = function(){
      logOut(event);
    };
    // upperLogItem.style.background = "#27abff"
    // upperLogItem.style.borderColor = "#27abff"
    //document.getElementById("itemLogIn").style.background = #27abff;

  } else {
    //user not signed in
    console.log("didHere2");
    upperLogInBtn.innerHTML = "Register";
    upperLogInBtn.href = "#";
    upperLogInBtn.onclick = function(){
      null;
    };
  }
});

function hoverStud(element) {
  element.setAttribute('src', "Icons/RegIcons/hoverStudent.png");
}

function unhoverStud(element) {
  element.setAttribute('src', "Icons/RegIcons/openStudent.png");
}

function hoverMent(element) {
  element.setAttribute('src', "Icons/RegIcons/hoverMentor.png");
}

function unhoverMent(element) {
  element.setAttribute('src', "Icons/RegIcons/openMentor.png");
}

function goStudent(){
  window.location.href = "medtorAuthStud.html";
}

function goMentor(){
  window.location.href = "medtorAuthPass.html";
}


// function unhover(element) {
//   element.setAttribute('src', );
// }

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

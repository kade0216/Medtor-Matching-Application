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
var p1 = document.getElementById("person1");
var p2 = document.getElementById("person2");
var p3 = document.getElementById("person3");
var p4 = document.getElementById("person4");
var p5 = document.getElementById("person5");

var upperLogInBtn = document.getElementById('upperLogIn');
var confirmBtn = document.getElementById("confirmButton");
var selected = null;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    if (user.emailVerified == false) {
      console.log("userNotVerified");
      window.location.href = "medtorHome.html";
    }
    if (user.displayName == "Mentor") {
      window.location.href = "medtorAuthPass.html";
    }
    // if (user.displayName == "Student") {
    //   window.location.href = "medtorAuthPass.html";
    // }
    //MAKE SURE DISPLAY NAME IS CHANGED TO STUDENTDONE
    //user signed in
    console.log("here");
    upperLogInBtn.innerHTML = "Log Out";
    upperLogInBtn.onclick = function(){
      logOut(event);
    };

  } else {
    //user not signed in
    console.log("here2");
    window.location.href = "medtorHome.html";
  }
});


//ADD OTHER FUNCTIONS AND CODE HERE
//Add overflow functions for colleges and names

function goDetail(e) {
  window.location.href = "medtorDetailView.html";
}

function submitSelect(e) {
  e = e || window.event;
  e.preventDefault();
}

function changeColor(e, person){
  e = e || window.event;
  e.preventDefault();
  allPeople = [p1, p2, p3, p4, p5];
  for (var index = 0; index < allPeople.length; index++){
    currPerson = allPeople[index];
    if (currPerson != person) {
      currPerson.getElementsByTagName("img")[0].src = "Icons/checkMark/checkMarkOpen.png"
    }
    else {
      currPerson.getElementsByTagName("img")[0].src = "Icons/checkMark/checkedMarkFull.png"
    }
  }
  selected = person;

  confirmBtn.style.display = "block";
}

function logOut(e) {
  e = e || window.event;
  e.preventDefault();
  firebase.auth().signOut().then(function() {
    window.location.href = "medtorHome.html";
  }).catch(function(error) {
    // An error happened.
  });
}

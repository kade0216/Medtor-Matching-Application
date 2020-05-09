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

var edSec = document.getElementById("educationSec");
var pathSec = document.getElementById("pSec");
var passSec = document.getElementById("passionSec");

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

    // var person = localStorage['pObj'];
    // console.log(person);
    populateEducation();

  } else {
    //user not signed in
    console.log("here2");
    window.location.href = "medtorHome.html";
  }
});


//ADD OTHER FUNCTIONS AND CODE HERE
//NAME OVERFLOW

function populateEducation() {

  //Grabbing and setting all variables;
  var people = JSON.parse(localStorage['allPeople']);
  var specific = localStorage['accessedPerson'] - 1;
  person = people[specific];
  console.log(person);

  var undergrad = person.Undergrad + " (" + person.UndergradLoc + ")";
  var underYear = person.UndergradYear;
  var study = person.Major + " (Major)";
  if (person.Minor != "n/a") {
    study += ", " + person.Minor + " (Minor)";
  }
  var medSchool = person.MedSchool + " (" + person.MedSchoolLoc + ")";
  var medYear = person.MedSchoolYear;

  var research = ""
  if (person.research1 != "na"){
    research += person.research1;
    if (person.research2 != "na"){
      research += ", " + person.research2;
    }
  }
  else {
    if (person.research2 != "na"){
      research += person.research2;
    }
    else {
      research = "None";
    }
  }
  var volunteer = ""
  if (person.volunteer1 != "na"){
    volunteer += person.volunteer1;
    if (person.volunteer2 != "na"){
      volunteer += ", " + person.volunteer2;
    }
  }
  else {
    if (person.volunteer2 != "na"){
      volunteer += person.volunteer2;
    }
    else {
      volunteer = "None";
    }
  }
  var gapYear = ""
  if (person.gap1 != "No Gap Year"){
    gapYear += person.gap1;
    if (person.gap2 != "No Gap Year"){
      gapYear += ", " + person.gap2;
    }
  }
  else {
    if (person.gap2 != "No Gap Year"){
      gapYear += person.gap2;
    }
    else {
      gapYear = "No Gap Year";
    }
  }
  var profession = person.profession1 + ", " + person.profession2;
  var hobbies = person.hobby1 + ", " + person.hobby2 + ", " + person.hobby3;
  var homeState = person.homeState;
  var name = person.firstName + " " + person.lastName;

  //setting displayName
  document.getElementById("theName").getElementsByTagName("span")[0].innerHTML = shortenName(person.firstName, person.lastName);


  //setting variables
  var setEd = [name, undergrad, underYear, study, medSchool, medYear];
  var setPath = [research, volunteer, gapYear, profession];
  var setPass = [hobbies, homeState];

  for (var i = 0; i < 6; i ++){
    edSec.getElementsByTagName('span')[1+i].innerHTML = setEd[i];
  }
  for (var i = 0; i < 4; i ++){
    pathSec.getElementsByTagName('span')[1+i].innerHTML = setPath[i];
  }
  for (var i = 0; i < 2; i ++){
    passSec.getElementsByTagName('span')[1+i].innerHTML = setPass[i];
  }

  document.getElementById("loading").style.display = "none";
  document.getElementById("innerSec").style.display = "flex";

}

function shortenName(firstN, lastN){
  togetherName = firstN + " " + lastN;
  if (togetherName.length > 17) {
    return firstN + " " + lastN[0] + ".";
  }
  else {
    return togetherName;
  }
}

function goBack(e) {
  e = e || window.event;
  e.preventDefault();
  //localStorage.clear();

  window.location.href = "medtorResults.html"
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

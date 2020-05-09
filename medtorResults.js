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

var per1 = null;
var per2 = null;
var per3 = null;
var per4 = null;
var per5 = null;

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
    // window.location.href = "winndo"
    console.log(localStorage);
    console.log("here");
    upperLogInBtn.innerHTML = "Log Out";
    upperLogInBtn.onclick = function(){
      logOut(event);
    };

    //localStorage.clear();
    var cells = [p1, p2, p3, p4, p5];
    if (localStorage.getItem("allPeople") === null) {
      var returnedPerson = firebase.functions().httpsCallable('findMatches');
      returnedPerson( {text: " "}).then(function(result){
        console.log(result);
        per1 = result["data"]["firstObj"]["theObj"];
        per2 = result["data"]["secondObj"]["theObj"];
        per3 = result["data"]["thirdObj"]["theObj"];
        per4 = result["data"]["fourthObj"]["theObj"];
        per5 = result["data"]["fifthObj"]["theObj"];

        var dataInputs = [per1, per2, per3, per4, per5];
        localStorage.setItem("allPeople", JSON.stringify(dataInputs));

        for (var i = 0; i < cells.length; i++){
          document.getElementById("innerSec").style.display = "block";
          document.getElementById("loading").style.display = "none";
          if (dataInputs[i] == null){
            cells[i].style.display = "none";
          }
          else {
            cells[i].style.display = "flex";
            writeCell(cells[i], dataInputs[i]);
          }
        }

      });
    }
    else {
      var dataInputs = JSON.parse(localStorage["allPeople"]);
      for (var i = 0; i < cells.length; i++){
        document.getElementById("innerSec").style.display = "block";
        document.getElementById("loading").style.display = "none";
        if (dataInputs[i] == null){
          cells[i].style.display = "none";
        }
        else {
          cells[i].style.display = "flex";
          writeCell(cells[i], dataInputs[i]);
        }
      }
    }

    //localStorage.setItem("entireObj", JSON.stringify(person));

  } else {
    //user not signed in
    console.log("here2");
    window.location.href = "medtorHome.html";
  }
});


//ADD OTHER FUNCTIONS AND CODE HERE
//Add overflow functions for colleges and names

function goDetail(e, person) {
  e = e || window.event;
  e.preventDefault();

  localStorage.setItem("accessedPerson", person);
  //console.log(localStorage);

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



function writeCell(cellSet, inputObject, nameFullSet, medSchoolSet, undergradSet, yearSet, gapYearSet) {
  setList = ["mentorName", "medSchool", "college", "year", "gapYear"];
  var name = shortenName(inputObject.firstName, inputObject.lastName);
  var medSchool = inputObject.MedSchool;
  var college = shortenCollege(inputObject.Undergrad);
  var year = inputObject.UndergradYear;
  var gap = null;
  if (inputObject.gap1 === "No Gap Year" || inputObject.gap2 === "No Gap Year") {
    gap = "No Gap Year"
  }
  else {
    gap = "Gap Year"
  }

  inList = [name, medSchool, college, year, gap];

  for (var i = 0; i < setList.length; i++) {
    var eachCell = cellSet.getElementsByClassName(setList[i]);
    eachCell[0].childNodes[1].innerHTML = inList[i];
    //console.log(eachCell[0].childNodes[1].innerHTML);
  }
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

function shortenCollege(collegeN) {
  var allWords = collegeN.split(/[ ,&-]+/);
  if (allWords.length > 3) {
    var shortVersion = "";
    for (var v = 0; v < allWords.length; v++) {
      if (allWords[v][0] === "(" || allWords[v] === "the" || allWords[v] === "The" || allWords[v] === "of" || allWords[v] === "Of" || allWords[v] === "at" || allWords[v] === "At") {
        //console.log(allWords[v][0]);
      }
      else {
        shortVersion += allWords[v][0];
      }
    }
    return shortVersion.toUpperCase();
  }
  else {
    return collegeN;
  }
}

function reloadData(e) {
  e = e || window.event;
  e.preventDefault();

  var returnedPerson = firebase.functions().httpsCallable('findMatches');
  returnedPerson( {text: " "}).then(function(result){
    console.log(result);
    per1 = result["data"]["firstObj"]["theObj"];
    per2 = result["data"]["secondObj"]["theObj"];
    per3 = result["data"]["thirdObj"]["theObj"];
    per4 = result["data"]["fourthObj"]["theObj"];
    per5 = result["data"]["fifthObj"]["theObj"];

    var cells = [p1, p2, p3, p4, p5];
    var dataInputs = [per1, per2, per3, per4, per5];
    localStorage.setItem("allPeople", JSON.stringify(dataInputs));

    for (var i = 0; i < cells.length; i++){
      document.getElementById("innerSec").style.display = "block";
      document.getElementById("loading").style.display = "none";
      if (dataInputs[i] == null){
        cells[i].style.display = "none";
      }
      else {
        cells[i].style.display = "flex";
        writeCell(cells[i], dataInputs[i]);
      }
    }
  });
}

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

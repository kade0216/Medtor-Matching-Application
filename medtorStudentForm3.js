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

var res1L = document.getElementById('res1Label');
var res2L = document.getElementById('res2Label');
var vol1L = document.getElementById('vol1Label');
var vol2L = document.getElementById('vol2Label');
var gap1L = document.getElementById('gap1Label');
var gap2L = document.getElementById('gap2Label');
var prof1L = document.getElementById('prof1Label');
var prof2L = document.getElementById('prof2Label');

var research1 = document.getElementById('research1Input');
var research2 = document.getElementById("research2Input");
var volunteer1 = document.getElementById('volunteer1Input');
var volunteer2 = document.getElementById("volunteer2Input");
var gap1 = document.getElementById('gapyear1Input');
var gap2 = document.getElementById("gapyear2Input");
var future1 = document.getElementById('futureprof1Input');
var future2 = document.getElementById("futureprof2Input");

var originalFontSize = research1.style.fontSize;

var theUserRN = null;
var formState = null;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    if (user.emailVerified == false) {
      //console.log("userNotVerified");
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
      if (formState == 4){
        window.location.href = "medtorResults.html" //ADD IN because shouldn't be able to edit
        //fillFields(); //take out
      }
      else if (formState == 5){
        window.location.href = "medtorStudentCompletion.html";
      }
      else if (formState >= 3){
        fillFields();
      }
      else if (formState < 2) {
        window.location.href = "medtorStudentForm2.html";
      }
    }
    //user signed in
    //console.log("here");
    upperLogInBtn.innerHTML = "Log Out";
    upperLogInBtn.onclick = function(){
      logOut(event);
    };

    sortList("futureprof1Input");
    sortList("futureprof2Input");
    sortList("yesgroup"); //for the yes group for gap years
    sortList("research1Input");
    sortList("research2Input");
    sortList("volunteer1Input");
    sortList("volunteer2Input");


  } else {
    //user not signed in
    //console.log("here2");
    window.location.href = "medtorHome.html";
  }
});

function goNext(e) {
  e = e || window.event;
  e.preventDefault();

  var user = firebase.auth().currentUser;

  var res1 = research1.value
  var res2 = research2.value
  var vol1 = volunteer1.value
  var vol2 = volunteer2.value
  var g1 = gap1.value
  var g2 = gap2.value
  var prof1 = future1.value
  var prof2 = future2.value

  if (checkFields()) {
    if (user.emailVerified == true) {
      ////console.log("data passes");
      theUserRN.research1 = res1;
      theUserRN.research2 = res2;
      theUserRN.volunteer1 = vol1;
      theUserRN.volunteer2 = vol2;
      theUserRN.gap1 = g1;
      theUserRN.gap2 = g2;
      theUserRN.profession1 = prof1;
      theUserRN.profession2 = prof2;
      if (formState < 3){
        theUserRN.formState = 3;
      }
      localStorage.setItem("currUser", JSON.stringify(theUserRN));

      // extraData = {
      //   research1: res1,
      //   research2: res2,
      //   volunteer1: vol1,
      //   volunteer2: vol2,
      //   gap1: g1,
      //   gap2: g2,
      //   profession1: prof1,
      //   profession2: prof2,
      // }
      theCurrUser = databaseRef.child("studentUsers").child(user.uid);
      theCurrUser.update(theUserRN).then(function() {
        //new code
        //console.log("entered new data")
        window.location.href = "medtorFormPreferencePage.html";
        // var returnedPerson = firebase.functions().httpsCallable('findMatches');
        // returnedPerson( {text: " "}).then(function(result){
        //   theObject = result;
        //   //console.log(theObject);
        // });

      });
    }
    else {
      window.alert("You're email has not been verified")
    }
  }
}

function checkFields() {
  if (research1.value != 'none' && volunteer1.value != 'none' && gap1.value != 'none' && future1.value != 'none'){
    //console.log('fields are good');
    return true;
  }
  else {
    console.log(research1.value);
    console.log(volunteer1.value);
    console.log(gap1.value);
    console.log(future1.value);
    window.alert("Incomplete: Fill in all fields with proper inputs");
    return false;
  }
}

function goBack(e) {
  e = e || window.event;
  e.preventDefault();
  window.location.href = "medtorStudentForm2.html";
}

function changeColor(e, obj, labeler) {
  e = e || window.event;
  e.preventDefault();
  //console.log("here");
  if (obj.value != "none") {
    obj.style.color = "black";
    obj.style.fontSize = "14px";
    labeler.style.display = "block";
  }
  else {
    obj.style.color = "rgb(169, 169, 169, 80.0)"
    obj.style.fontSize = originalFontSize;
    labeler.style.display = "none";
  }
}

research1.addEventListener('change', e => {
  changeColor(e, research1, res1L);
})
research2.addEventListener('change', e => {
  changeColor(e, research2, res2L);
})
volunteer1.addEventListener('change', e => {
  changeColor(e, volunteer1, vol1L);
})
volunteer2.addEventListener('change', e => {
  changeColor(e, volunteer2, vol2L);
})
gap1.addEventListener('change', e => {
  changeColor(e, gap1, gap1L);
})
gap2.addEventListener('change', e => {
  changeColor(e, gap2, gap2L);
})
future1.addEventListener('change', e => {
  changeColor(e, future1, prof1L);
})
future2.addEventListener('change', e => {
  changeColor(e, future2, prof2L);
})

function sortList(id) {
  var list, i, switching, b, shouldSwitch;
  list = document.getElementById(id);
  switching = true;
  while (switching) {
    switching = false;
    b = list.getElementsByTagName("OPTION");
    for (i = 1; i < (b.length - 1); i++) {
      shouldSwitch = false;
      if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
    }
  }
}

function fillFields() {
  var eventer = new Event('change');

  research1.value = theUserRN["research1"];
  research2.value = theUserRN["research2"];
  volunteer1.value = theUserRN["volunteer1"];
  volunteer2.value = theUserRN["volunteer2"];
  gap1.value = theUserRN["gap1"];
  gap2.value = theUserRN["gap2"];
  future1.value = theUserRN["profession1"];
  future2.value = theUserRN["profession2"];

  changeColor(eventer, research1, res1L);
  changeColor(eventer, research2, res2L);
  changeColor(eventer, volunteer1, vol1L);
  changeColor(eventer, volunteer2, vol2L);
  changeColor(eventer, gap1, gap1L);
  changeColor(eventer, gap2, gap2L);
  changeColor(eventer, future1, prof1L);
  changeColor(eventer, future2, prof2L);
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

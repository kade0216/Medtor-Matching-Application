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

var genderLabel = document.getElementById("gendLabel");
var homeLabel = document.getElementById("homeL");
var hob1Label = document.getElementById("hob1L");
var hob2Label = document.getElementById("hob2L");
var hob3Label = document.getElementById("hob3L");

var homeStateIn = document.getElementById('homeStateInput');
var genderIn = document.getElementById("gend");
var hobbyIn1 = document.getElementById("hobby1");
var hobbyIn2 = document.getElementById("hobby2");
var hobbyIn3 = document.getElementById("hobby3");
var originalFontSize = homeStateIn.style.fontSize;

var theUserRN = null;
var formState = null;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    if (user.emailVerified == false) {
      console.log("userNotVerified");
      window.location.href = "medtorHome.html";
    }
    if (user.displayName == "Student") {
      window.location.href = "medtorAuthStud.html";
    }

    if (localStorage.getItem("currUser") === null){
      logOut(event);
    }
    else {
      theUserRN = JSON.parse(localStorage["currUser"]);
      formState = theUserRN["formState"];
      if (formState >= 1){
        fillFields();
      }
      else if (formState < 0) {
        window.location.href = "medtorMentorForm1.html";
      }
    }

    //user signed in
    console.log("here");
    upperLogInBtn.innerHTML = "Log Out";
    upperLogInBtn.onclick = function(){
      logOut(event);
    };
    // helloWorld();

    //sorts hobby lists alphabetically
    sortList("hobby1");
    sortList("hobby2");
    sortList("hobby3");


  } else {
    //user not signed in
    console.log("here2");
    window.location.href = "medtorHome.html";
  }
});

//occurs when nextButton is pressed, first checks to make sure fields are inputted properly
//then adds data to user database in firebase.
function goNext(e) {
  e = e || window.event;
  e.preventDefault();

  var user = firebase.auth().currentUser;

  var firstNameIn = document.getElementById('fNameInput').value;
  var lastNameIn = document.getElementById('lNameInput').value;
  var phoneIn = document.getElementById('phoneNumInput').value;
  var stateIn = homeStateIn.value;
  var gendIn = genderIn.value;
  var hobIn1 = hobbyIn1.value;
  var hobIn2 = hobbyIn2.value;
  var hobIn3 = hobbyIn3.value;

  if (checkFields(firstNameIn, lastNameIn, phoneIn, stateIn, gendIn, hobIn1, hobIn2, hobIn3)) {
    if (user.emailVerified == true) {
      theUserRN.firstName = firstNameIn;
      theUserRN.lastName = lastNameIn;
      theUserRN.phone = phoneIn;
      theUserRN.homeState = stateIn;
      theUserRN.gender = gendIn;
      theUserRN.hobby1 = hobIn1;
      theUserRN.hobby2 = hobIn2;
      theUserRN.hobby3 = hobIn3;
      if (formState < 1){
        theUserRN.formState = 1;
      }
      localStorage.setItem("currUser", JSON.stringify(theUserRN));

      theCurrUser = databaseRef.child("mentorUsers").child(user.uid);
      theCurrUser.update(theUserRN).then(function() {
        //new code
        console.log("entered new data");
        window.location.href = "medtorMentorForm2.html";
        // var returnedPerson = firebase.functions().httpsCallable('findMatches');
        // returnedPerson( {text: " "}).then(function(result){
        //   theObject = result;
        //   console.log(theObject);
        //});

      });
    }
    else {
      window.alert("You're email has not been verified")
    }

  }
}


//checks all input fields to make sure they are of proper format and are filled in
function checkFields(first, last, phone, hState, gen, hob1, hob2, hob3) {
  var firstFormat = new RegExp(/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i);
  var lastFormat = new RegExp(/^[a-z ,.'-]+$/i);
  var phoneFormat = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
  if (first.match(lastFormat) && last.match(lastFormat) && phone.match(phoneFormat) && hState != "none" && gen != "none" && hob1 != "none" && hob2 != "none" && hob3 != "none") {
    return true;
  }
  else {
    window.alert("Incomplete: Fill in all fields with proper inputs");
    return false;
  }
}

function changeColor(e, obj, labeler) {
  e = e || window.event;
  e.preventDefault();
  //console.log("here");
  if (obj.value != "none") {
    // console.log(obj.value);
    obj.style.color = "black";
    obj.style.fontSize = "16px";
    labeler.style.display = "block";
    // console.log(obj.getElementsByClassName(label));
  }
  else {
    obj.style.color = "rgb(169, 169, 169, 80.0)"
    obj.style.fontSize = originalFontSize;
    labeler.style.display = "none";
  }
}

homeStateIn.addEventListener('change', e => {
  changeColor(e, homeStateIn, homeLabel);
})
genderIn.addEventListener('change', e => {
  changeColor(e, genderIn, genderLabel);
})
hobbyIn1.addEventListener('change', e => {
  changeColor(e, hobbyIn1, hob1Label);
})
hobbyIn2.addEventListener('change', e => {
  changeColor(e, hobbyIn2, hob2Label);
})
hobbyIn3.addEventListener('change', e => {
  changeColor(e, hobbyIn3, hob3Label);
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

  document.getElementById('fNameInput').value = theUserRN["firstName"];
  document.getElementById('lNameInput').value = theUserRN["lastName"];
  document.getElementById('phoneNumInput').value = theUserRN["phone"];
  homeStateIn.value = theUserRN["homeState"];
  genderIn.value = theUserRN["gender"];
  hobbyIn1.value = theUserRN["hobby1"];
  hobbyIn2.value = theUserRN["hobby2"];
  hobbyIn3.value = theUserRN["hobby3"];

  changeColor(eventer, homeStateIn, homeLabel);
  changeColor(eventer, genderIn, genderLabel);
  changeColor(eventer, hobbyIn1, hob1Label);
  changeColor(eventer, hobbyIn2, hob2Label);
  changeColor(eventer, hobbyIn3, hob3Label);
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

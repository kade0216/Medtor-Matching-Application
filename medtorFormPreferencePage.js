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

var pre1L = document.getElementById("pref1L");
var pre2L = document.getElementById("pref2L");
var pre3L = document.getElementById("pref3L");

var pref1 = document.getElementById('preference1');
var pref2 = document.getElementById("preference2");
var pref3 = document.getElementById("preference3");
var terms = document.getElementById("terms");
var originalFontSize = pref1.style.fontSize;

var theUserRN = null;
var formState = null;

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
      if (formState == 4){
        window.location.href = "medtorResults.html" //ADD IN because shouldn't be able to edit
        //fillFields(); //take out
      }
      else if (formState == 5){
        window.location.href = "medtorStudentCompletion.html";
      }
      else if (formState < 3) {
        window.location.href = "medtorStudentForm3.html";
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
    sortList("preference1");
    sortList("preference2");
    sortList("preference3");

    // theUserRN = JSON.parse(localStorage["currUser"]);
    // formState = theUserRN["formState"];
    // if (formState >= 4){
    //   //console.log("state here");
    //   fillFields();
    // }

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

  var p1 = pref1.value;
  var p2 = pref2.value;
  var p3 = pref3.value;

  if (checkFields()) {
    console.log("data passes");
    if (user.emailVerified == true) {
      theUserRN.pref1 = p1;
      theUserRN.pref2 = p2;
      theUserRN.pref3 = p3;
      theUserRN.terms = true;
      if (formState < 4){
        theUserRN.formState = 4;
      }
      localStorage.setItem("currUser", JSON.stringify(theUserRN));

      theCurrUser = databaseRef.child("studentUsers").child(user.uid);
      theCurrUser.update(theUserRN).then(function() {
        //new code
        console.log("entered new data");
        localStorage.removeItem("allPeople");
        localStorage.removeItem("accessedPerson");
        window.location.href = "medtorResults.html";
        // var returnedPerson = firebase.functions().httpsCallable('findMatches');
        // returnedPerson( {text: " "}).then(function(result){
        //   theObject = result;
        //   console.log(theObject);
        // });
        // window.location.href = "winndo"

      });
    }
    else {
      window.alert("You're email has not been verified")
    }

  }
}


//checks all input fields to make sure they are of proper format and are filled in
function checkFields() {
  // console.log(terms.checked);
  if (pref1.value != "none" && pref2.value != "none" && pref3.value != "none"){
    if(terms.checked == true){
      console.log("data passes standards");
      return true;
    }
    else {
      window.alert("Terms of Use: Please agree to terms of use and privacy policy");
      return false;
    }
  }
  else {
    window.alert("Incomplete: Fill in all fields with proper inputs");
    return false;
  }
}

function changeColor(e, obj, labeler) {
  e = e || window.event;
  e.preventDefault();
  console.log("here");
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

pref1.addEventListener('change', e => {
  changeColor(e, pref1, pref1L);
})
pref2.addEventListener('change', e => {
  changeColor(e, pref2, pref2L);
})
pref3.addEventListener('change', e => {
  changeColor(e, pref3, pref3L);
})

function goBack(e) {
  e = e || window.event;
  e.preventDefault();
  window.location.href = "medtorStudentForm3.html";
}


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

  pref1.value = theUserRN["pref1"];
  pref2.value = theUserRN["pref2"];
  pref3.value = theUserRN["pref3"];

  changeColor(eventer, pref1, pref1L);
  changeColor(eventer, pref2, pref2L);
  changeColor(eventer, pref3, pref3L);
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

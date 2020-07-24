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

var menteeLabel = document.getElementById('menteeL');

var studentCount = document.getElementById('studCountIn');
var addInfo = document.getElementById('additionalInfo');
var terms = document.getElementById("terms");

var originalFontSize = studentCount.style.fontSize;

var theUserRN = null;
var formState = null;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    if (user.emailVerified == false) {
      //console.log("userNotVerified");
      window.location.href = "medtorHome.html";
    }
    if (user.displayName == "Student") {
      window.location.href = "medtorAuthPass.html";
    }

    if (localStorage.getItem("currUser") === null){
      logOut(event);
    }
    else {
      theUserRN = JSON.parse(localStorage["currUser"]);
      formState = theUserRN["formState"];
      if (formState >= 4){
        //window.location.href = "medtorResults.html";
        fillFields();
      }
      else if (formState < 3) {
        window.location.href = "medtorMentorForm3.html";
      }
    }
    //user signed in
    //console.log("here");
    upperLogInBtn.innerHTML = "Log Out";
    upperLogInBtn.onclick = function(){
      logOut(event);
    };

    // theUserRN = JSON.parse(localStorage["currUser"]);
    // formState = theUserRN["formState"];
    // if (formState >= 3){
    //   fillFields();
    // }


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

  var studCount = studentCount.value

  if (checkFields()) {
    if (user.emailVerified == true) {
      theUserRN.studCount = studCount;
      theUserRN.addInfo = addInfo.value;
      theUserRN.terms = true;
      if (formState < 4){
        theUserRN.formState = 4;
      }
      localStorage.setItem("currUser", JSON.stringify(theUserRN));
      theCurrUser = databaseRef.child("mentorUsers").child(user.uid);
      theCurrUser.update(theUserRN).then(function() {
        //new code
        //console.log("entered new data")
        window.location.href = "medtorMentorCompletion.html"
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
  if (studentCount.value != 'none'){
    if(terms.checked == true){
      //console.log("fields are good");
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

function goBack(e) {
  e = e || window.event;
  e.preventDefault();
  window.location.href = "medtorMentorForm3.html";
}

function changeColor(e, obj, labeler) {
  e = e || window.event;
  e.preventDefault();
  // //console.log("here");
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

studentCount.addEventListener('change', e => {
  changeColor(e, studentCount, menteeL);
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

  studentCount.value = theUserRN["studCount"];
  if (theUserRN["addInfo"] != null) {
    addInfo.value = theUserRN["addInfo"];
  }
  terms.checked = theUserRN["terms"];

  changeColor(eventer, studentCount, menteeL);
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

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

//var myForm = document.getElementById("theForm");
var emailIn = document.getElementById("emailInput");
var feedbackIn = document.getElementById("feedbackInput");

const scriptURL = 'https://script.google.com/macros/s/AKfycbxffWQ_Z3Qik5knWmZJ9Ulr6zQeGvCM_T-tMGcswGInxjo0PUZr/exec';

var upperLogInBtn = document.getElementById("upperLogIn");

const form = document.forms['getFeedback'];

console.log("working");
//console.log(localStorage);

// --FUNCTIONS--------------------------------------------------------------------------------------------

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // if (user.emailVerified == false) {
    //   console.log("userNotVerified");
    //   window.location.href = "medtorHome.html";
    // }
    // if (user.displayName == "Mentor") {
    //   window.location.href = "medtorAuthPass.html";
    // }
    //user signed in
    console.log("here");
    upperLogInBtn.innerHTML = "Log Out";
    upperLogInBtn.onclick = function(){
      logOut(event);
    };

  } else {
    //user not signed in
    console.log("here2");
    // window.location.href = "medtorRegisterDec.html";
  }
});

//checks formatting of email
function checkFormatting(inputText){
  var mailformat = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  if(inputText.match(mailformat)){
    if (checkEdu(inputText)) {
      return true;
    }
    else {
      return false;
    }
  }
  else{
    window.alert("Error: You have entered an invalid email address");
    return false;
  }
}

//checks if email ends in edu
function checkEdu(inputText) {
  if ((inputText.slice(-4)) == ".edu") {
    return true;
  }
  else if ((inputText.slice(-4)) == ".com") {
    return true;
  }
  else {
    alert("Error: Please use edu/com email");
    return false;
  }
}

form.addEventListener('submit', e => {
  e.preventDefault();
  emailText = emailIn.value;
  if (checkFormatting(emailText)){
    fetch(scriptURL, {method: 'POST', body: new FormData(form)})
      .then(response => window.location.href = 'medtorHome.html')
      .catch(error => console.error('Error!', error.message))
  }
})

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

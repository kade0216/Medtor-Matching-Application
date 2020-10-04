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

var isFirefox = typeof InstallTrigger !== 'undefined';
var isIE = /*@cc_on!@*/false || !!document.documentMode;

document.getElementById("loggedIn").style.display = 'none';
var myForm = document.getElementById("theForm");
var regBtn = document.getElementById("registerBtn");
var logInBtn = document.getElementById("logInBtn");
var logBtn = document.getElementById("logOutBtn");
var switcherText = document.getElementById("switcher");
var onRegister = true;
var upperLogInBtn = document.getElementById("upperLogIn");

const form = document.forms['getEmail'];

//places enter key conditions on password and email input
document.getElementById("passwordInput").addEventListener('keypress', enterKey);
document.getElementById("emailInput").addEventListener('keypress', enterKey);

//console.log("working");

var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

if (iOS){
  var one = document.getElementById("labeler");
  one.style.left = "0px";
  one.style.bottom = "0px";
  var two = document.getElementById("labeler1");
  two.style.left = "0px";
  two.style.bottom = "0px";
}

// --FUNCTIONS--------------------------------------------------------------------------------------------

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    //changes upper button
    upperLogInBtn.innerHTML = "Log Out";
    upperLogInBtn.onclick = function(){
      logOut(event);
    };

    //checks to see if student or mentor
    if (user.displayName == "Mentor") {
      window.location.href = "medtorAuthPass.html"
    }
    // if (user.displayName == "student"){
    //   //console.log("student here");
    // }

    //takes away display of form and replaces it with loggedIn header
    //console.log("didHere")
    document.getElementById("needLogIn").style.display = 'none';
    document.getElementById("loggedIn").style.display = 'block';

    //shows Log out button
    logBtn.style.display = 'block';
    logBtn.style.float = 'right';
    logBtn.disable = false;

    //takes away register button
    regBtn.style.display = 'none';
    regBtn.disable = true;

    //takes away ability to switch register/logIn
    switcherText.style.display = 'none';
    switcherText.disable = true;

    //takes away log in button
    logInBtn.style.display = 'none';
    logInBtn.disable = true;

    //if user is not null user
    if (user != null) {

      //display use specific text
      var email_id = user.email;
      var email_verified = user.emailVerified;
      var userType = user.displayName;
      document.getElementById('loggedInText').innerHTML = "A verification email has been sent to " + email_id + ". <br/> <br/> Refresh the page once you have verified your email to create your profile.";
      //If email is verified, check to see if user has already been placed into database, if NOT then add to database and then move on to next page, if already done then move on to next page.
      if (user.emailVerified) {
        window.localStorage.setItem('userUID', user.uid); //unnecessary
        databaseRef.child("studentUsers").child(user.uid).once("value",snapshot => {
          if (snapshot.exists()){
            //go to next page
            //console.log("would go to next page");
            localStorage.setItem("currUser", JSON.stringify(snapshot.val()));
            if (snapshot.val().formState == 5) {
              window.location.href = "medtorStudentCompletion.html";
            }
            else if (snapshot.val().formState >= 4) {
              window.location.href = "medtorResults.html";
            }
            else {
              window.location.href = "medtorStudentForm1.html";
            }
          }
          else {
            //adds data to database
            var allUsers = databaseRef.child("studentUsers");
            var theCurrUser = allUsers.child(user.uid);
            var addingData = {
              email: user.email,
              emailVerified: user.emailVerified,
              formState: "0",
            }
            theCurrUser.set(addingData).then(function() {
              //go to next page;
              localStorage.setItem("currUser", JSON.stringify(addingData));
              //console.log("would go to next page because data just submitted");
              window.location.href = "medtorStudentForm1.html";
            });
            //console.log("not snapshot");
          }
        });
        // document.getElementById("nextBtn").style.display = 'block';
        // document.getElementById("nextBtn").disable = false;
      }
      else {
        //console.log("here loggre fjdkj");
        // document.getElementById("nextBtn").style.display = 'none';
        // document.getElementById("nextBtn").disable = true;
        console.log("here");
      }

    }

  } else {
    //displaying objects
    //console.log("didHere222")
    // //console.log(user.email);
    upperLogInBtn.innerHTML = "Register";
    upperLogInBtn.href = "medtorRegisterDec.html";
    upperLogInBtn.onclick = function(){
      null;
    };

    //TAKE OUT LATER WE DONNT NNEED THIS
    // document.getElementById("nextBtn").style.display = 'none';
    // document.getElementById("nextBtn").disable = true;

    //takes away display of loggedIn header and replaces it with form
    document.getElementById("needLogIn").style.display = 'block';
    document.getElementById("loggedIn").style.display = 'none';

    //takes away log out button
    logBtn.style.display = 'none';
    logBtn.disable = true;

    //places switcher button
    switcherText.style.display = 'block';
    switcherText.disable = false;

    //based on conditionn displays either log in button or register button
    if (onRegister) {
      regBtn.style.display = 'block';
      regBtn.disable = false;
      logInBtn.style.display = 'none';
      logInBtn.disable = true;
      document.getElementById('upperText').innerHTML = "Enter your email below to create your profile";
    }
    else {
      regBtn.style.display = 'none';
      regBtn.disable = true;
      logInBtn.style.display = 'block';
      regBtn.disable = false;
      document.getElementById('upperText').innerHTML = "Log in with your email and password";
    }
    switcherText.style.display = 'block';

    var disableStudent = false;

    if (isIE || isFirefox) {
      document.getElementById("unsupported").style.display = "block"
      document.getElementById("needLogIn").style.display = 'none';
      document.getElementById("loggedIn").style.display = 'none';
      regBtn.style.display = 'none';
      switcherText.style.display = 'none';
    }
    else if (disableStudent) {
      document.getElementById("noStudent").style.display = "block";
      document.getElementById("unsupported").style.display = "none"
      document.getElementById("needLogIn").style.display = 'none';
      document.getElementById("loggedIn").style.display = 'none';
      regBtn.style.display = 'none';
      switcherText.style.display = 'none';
    }
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
  if ((inputText.slice(-8)) == "duke.edu") {
    return true;
  }
  // else if ((inputText.slice(-4)) == ".com") {
  //   return true;
  // }
  else {
    alert("Error: Please use duke.edu email");
    return false;
  }
}

//creates account for user
function createAccount(e) {
  e = e || window.event;
  e.preventDefault();
  //console.log("creating...");
  var emailIn = document.getElementById("emailInput").value;
  var passwordIn = document.getElementById("passwordInput").value;
  ////console.log(passwordIn)
  if (checkFormatting(emailIn)) {
    firebase.auth().createUserWithEmailAndPassword(emailIn, passwordIn).then(function(){
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: "Student"
      })
      sendVerification();
      ////console.log("here creating");
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      //console.log("its not created")
      window.alert("Error: " + errorMessage);
    });

  }

}

//sends verification email to user email
function sendVerification () {
  //var emailIn = document.getElementById("emailInput").value;
  var user = firebase.auth().currentUser;
  var emailIn = document.getElementById("emailInput").value;
  user.sendEmailVerification().then(function() {
    //console.log("verification sent");
    // Email sent.
  }).catch(function(error) {
    var errorMessage = error.message;
    window.alert(errorMessage);
  });
}

//log in function
function logIn(e) {
  e = e || window.event;
  e.preventDefault();
  //console.log("woo");
  var emailIn = document.getElementById("emailInput").value;
  var passwordIn = document.getElementById("passwordInput").value;
  ////console.log(passwordIn)
  if (checkFormatting(emailIn)) {
     firebase.auth().signInWithEmailAndPassword(emailIn, passwordIn).catch(function(error) {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       //console.log("worked")
       window.alert("Error: " + errorMessage);
     });
  }
}

//switches button display from log in to register or vice versa
function switchTo(e) {
  e = e || window.event;
  e.preventDefault();
  //console.log("switching");
  if (onRegister) {
    document.getElementById('upperText').innerHTML = "Log in with your email and password";
    document.getElementById('switcher').innerHTML = "Don't have an account? Register";
    regBtn.style.display = 'none';
    regBtn.disable = true;
    logInBtn.style.display = 'block';
    logInBtn.disable = false;
    onRegister = false;
    //console.log(regBtn.disable);
  }
  else {
    document.getElementById('upperText').innerHTML = "Enter your email below to create your profile";
    document.getElementById('switcher').innerHTML = "Already have an account? Log in";
    regBtn.style.display = 'block';
    regBtn.disable = false;
    logInBtn.style.display = 'none';
    regBtn.disable = true;
    onRegister = true;
  }

}

function resetPassword(e){
  e = e || window.event;
  e.preventDefault();

  var auth = firebase.auth();
  var emailAddress = document.getElementById("emailInput").value;

  if (checkFormatting(emailAddress)){
    auth.sendPasswordResetEmail(emailAddress).then(function() {
      window.alert("An email has been sent to " + emailAddress + " with instructions to reset your password.");
    }).catch(function(error){
      window.alert(error);
    });
  }
}

//enter button usage dependent on condition of the form in log in or register
function enterKey(e) {
  e = e || window.event;
  if (e.keyCode == 13) {
    e.preventDefault();
    if (onRegister) {
      regBtn.click();
    }
    else {
      logInBtn.click()
    }
  }
}

//log out feature
function logOut(e) {
  //console.log("im logging out");
  e = e || window.event;
  e.preventDefault();
  localStorage.clear();
  firebase.auth().signOut().then(function() {
    window.location.href = "medtorHome.html";
  }).catch(function(error) {
    // An error happened.
  });
}

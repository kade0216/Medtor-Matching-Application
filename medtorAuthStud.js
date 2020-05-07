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

console.log("working");
//console.log(localStorage);

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

    //takes away display of form and replaces it with loggedIn header
    console.log("didHere")
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
      document.getElementById('loggedInText').innerHTML = "A verification email has been sent to " + email_id + ". <br/> <br/> Refresh the page once you have verified your email to create your profile. <br/><br/>Type: " + userType;
      document.getElementById('')

      //If email is verified, check to see if user has already been placed into database, if NOT then add to database and then move on to next page, if already done then move on to next page.
      if (user.emailVerified) {
        window.localStorage.setItem('userUID', user.uid); //unnecessary
        databaseRef.child("studentUsers").orderByChild("email").equalTo(email_id).once("value",snapshot => {
          if (snapshot.exists()){
            //go to next page
            console.log("would go to next page");
            //window.location.href = "medtorHome.html";
          }
          else {
            //adds data to database
            allUsers = databaseRef.child("studentUsers");
            theCurrUser = allUsers.child(user.uid);
            theCurrUser.set({
              email: user.email,
              emailVerified: user.emailVerified,
            }).then(function() {
              //go to next page;
              console.log("would go to next page because data just submitted");
              //window.location.href = "medtorHome.html";
            });
          }
        });
        document.getElementById("nextBtn").style.display = 'block';
        document.getElementById("nextBtn").disable = false;
      }
      else {
        document.getElementById("nextBtn").style.display = 'none';
        document.getElementById("nextBtn").disable = true;
      }

    }

  } else {
    //displaying objects
    console.log("didHere2")
    //changes upper button
    upperLogInBtn.innerHTML = "Register";
    upperLogInBtn.href = "medtorAuthPass.html";
    upperLogInBtn.onclick = function(){
      null;
    };

    //TAKE OUT LATER WE DONNT NNEED THIS
    document.getElementById("nextBtn").style.display = 'none';
    document.getElementById("nextBtn").disable = true;

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
    alert("Error: Please use .edu email");
    return false;
  }
}

//creates account for user
function createAccount(e) {
  e = e || window.event;
  e.preventDefault();
  console.log("creating...");
  var emailIn = document.getElementById("emailInput").value;
  var passwordIn = document.getElementById("passwordInput").value;
  console.log(passwordIn)
  if (checkFormatting(emailIn)) {
    firebase.auth().createUserWithEmailAndPassword(emailIn, passwordIn).then(function(){
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: "Student"
      })
      sendVerification();

    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("its not created")
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
    console.log("verification sent");
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
  console.log("woo");
  var emailIn = document.getElementById("emailInput").value;
  var passwordIn = document.getElementById("passwordInput").value;
  console.log(passwordIn)
  if (checkFormatting(emailIn)) {
     firebase.auth().signInWithEmailAndPassword(emailIn, passwordIn).catch(function(error) {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       console.log("worked")
       window.alert("Error: " + errorMessage);
     });
  }
}

//switches button display from log in to register or vice versa
function switchTo(e) {
  e = e || window.event;
  e.preventDefault();
  console.log("switching");
  if (onRegister) {
    document.getElementById('upperText').innerHTML = "Log in with your email and password";
    document.getElementById('switcher').innerHTML = "Don't have an account? Register";
    regBtn.style.display = 'none';
    regBtn.disable = true;
    logInBtn.style.display = 'block';
    logInBtn.disable = false;
    onRegister = false;
    console.log(regBtn.disable);
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

//log out feature
function logOut(e) {
  e = e || window.event;
  e.preventDefault();
  firebase.auth().signOut().then(function() {
    window.location.href = "medtorHome.html";
  }).catch(function(error) {
    // An error happened.
  });
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
// form.addEventListener('submit', e => {
//   e.preventDefault();
//   register();
// })

// form.addEventListener('submit', e => {
//   e.preventDefault();
//   emailText = emailIn.value;
//   if (checkFormatting(emailText)){
//     key = Math.floor(100000 + Math.random() * 900000);
//     document.getElementById("hiddenVal").value = key;
//     if (key != 0) {
//       localStorage.setItem("confCode", key);
//     }
//     // fetch(scriptURL, {method: 'POST', body: new FormData(form)})
//     //   .then(response => window.location.href = 'medtorCodeAuth.html')
//     //   .catch(error => console.error('Error!', error.message))
//
//     console.log(key);
//   }
// })

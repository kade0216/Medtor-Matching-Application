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

document.getElementById("loggedIn").style.display = 'none';
var myForm = document.getElementById("theForm");
var regBtn = document.getElementById("registerBtn");
var logInBtn = document.getElementById("logInBtn");
var logBtn = document.getElementById("logOutBtn");
var switcherText = document.getElementById("switcher");
var onRegister = true;
var key = 0;

const form = document.forms['getEmail'];

document.getElementById("passwordInput").addEventListener('keypress', enterKey);
document.getElementById("emailInput").addEventListener('keypress', enterKey);

console.log("working");
//console.log(localStorage);

// --FUNCTIONS--------------------------------------------------------------------------------------------

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    //user signed in
    console.log("didHere")
    document.getElementById("needLogIn").style.display = 'none';
    document.getElementById("loggedIn").style.display = 'block';

    logBtn.style.display = 'block';
    logBtn.style.float = 'right';
    logBtn.disable = false;

    regBtn.style.display = 'none';
    regBtn.disable = true;

    switcherText.style.display = 'none';
    switcherText.disable = true;

    logInBtn.style.display = 'none';
    logInBtn.disable = true;

    if (user != null) {

      var email_id = user.email;
      var email_verified = user.emailVerified;
      document.getElementById('loggedInText').innerHTML = "Welcome: " + email_id + "<br/>Verified: " + email_verified;

      if (user.emailVerified) {
        window.localStorage.setItem('userUID', user.uid);
        databaseRef.child("mentorUsers").orderByChild("email").equalTo(email_id).once("value",snapshot => {
          if (snapshot.exists()){
            //window.location.href = "medtorHome.html";
            console.log("would go to next page");
          }
          else {
            allUsers = databaseRef.child("mentorUsers");
            theCurrUser = allUsers.child(user.uid);
            theCurrUser.set({
              email: user.email,
              emailVerified: user.emailVerified,
            }).then(function() {
              //window.location.href = "medtorHome.html";
              console.log("would go to next page because data just submitted");
            });
          }
        });
      }

    }

  } else {
    //user not signed in
    console.log("didHere2")
    document.getElementById("needLogIn").style.display = 'block';
    document.getElementById("loggedIn").style.display = 'none';
    logBtn.style.display = 'none';
    logBtn.disable = true;
    switcherText.style.display = 'block';
    switcherText.disable = false;
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

function createAccount(e) {
  e = e || window.event;
  e.preventDefault();
  console.log("creating...");
  var emailIn = document.getElementById("emailInput").value;
  var passwordIn = document.getElementById("passwordInput").value;
  console.log(passwordIn)
  if (checkFormatting(emailIn)) {
    firebase.auth().createUserWithEmailAndPassword(emailIn, passwordIn).then(function(){
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


function logOut(e) {
  e = e || window.event;
  e.preventDefault();
  firebase.auth().signOut().then(function() {
  // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });

}

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

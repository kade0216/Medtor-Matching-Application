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

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    if (user.emailVerified == false) {
      console.log("userNotVerified");
      window.location.href = "medtorHome.html";
    }
    if (user.displayName == "Mentor") {
      window.location.href = "medtorAuthPass.html";
    }
    //user signed in
    console.log("here");
    upperLogInBtn.innerHTML = "Log Out";
    upperLogInBtn.onclick = function(){
      logOut(event);
    };

  } else {
    //user not signed in
    console.log("here2");
    window.location.href = "medtorHome.html";
  }
});

var rank1In = document.getElementById('rank1Input');
var rank2In = document.getElementById("rank2Input");
var rank3In = document.getElementById("rank3Input");

var originalFontSize = rank1In.style.fontSize;

function changeColor(e, obj) {
  e = e || window.event;
  e.preventDefault();
  console.log("here");
  if (obj.value != "none") {
    obj.style.color = "black";
    obj.style.fontSize = "14px";
  }
  else {
    obj.style.color = "rgb(169, 169, 169, 80.0)"
    obj.style.fontSize = originalFontSize;
  }
}

rank1In.addEventListener('change', e => {
  changeColor(e, rank1In);
})
rank2In.addEventListener('change', e => {
  changeColor(e, rank2In);
})
rank3In.addEventListener('change', e => {
  changeColor(e, rank3In);
})


function logOut(e) {
  e = e || window.event;
  e.preventDefault();
  firebase.auth().signOut().then(function() {
    window.location.href = "medtorHome.html";
  }).catch(function(error) {
    // An error happened.
  });
}

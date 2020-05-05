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

var homeStateIn = document.getElementById('homeStateInput');
var genderIn = document.getElementById("gend");
var hobbyIn1 = document.getElementById("hobby1");
var hobbyIn2 = document.getElementById("hobby2");
var hobbyIn3 = document.getElementById("hobby3");
var originalFontSize = homeStateIn.style.fontSize;

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
    console.log("data passes");
    if (user.emailVerified == true) {
      extraData = {
        firstName: firstNameIn,
        lastName: lastNameIn,
        phone: phoneIn,
        homeState: stateIn,
        gender: gendIn,
        hobby1: hobIn1,
        hobby2: hobIn2,
        hobby3: hobIn3,
      }
      theCurrUser = databaseRef.child("studentUsers").child(user.uid);
      theCurrUser.update(extraData).then(function() {
        //new code
        console.log("entered new data")
        var returnedPerson = firebase.functions().httpsCallable('findMatches');
        returnedPerson( {text: " "}).then(function(result){
          theObject = result;
          console.log(theObject);
        });

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

function changeColor(e, obj) {
  e = e || window.event;
  e.preventDefault();
  console.log("here");
  if (obj.value != "none") {
    obj.style.color = "black";
    obj.style.fontSize = "16px";
  }
  else {
    obj.style.color = "rgb(169, 169, 169, 80.0)"
    obj.style.fontSize = originalFontSize;
  }
}

homeStateIn.addEventListener('change', e => {
  changeColor(e, homeStateIn);
})
genderIn.addEventListener('change', e => {
  changeColor(e, genderIn);
})
hobbyIn1.addEventListener('change', e => {
  changeColor(e, hobbyIn1);
})
hobbyIn2.addEventListener('change', e => {
  changeColor(e, hobbyIn2);
})
hobbyIn3.addEventListener('change', e => {
  changeColor(e, hobbyIn3);
})


function sortList(id) {
  var list, i, switching, b, shouldSwitch;
  list = document.getElementById(id);
  switching = true;
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    b = list.getElementsByTagName("OPTION");
    // Loop through all list items:
    for (i = 0; i < (b.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Check if the next item should
      switch place with the current item: */
      if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
        /* If next item is alphabetically lower than current item,
        mark as a switch and break the loop: */
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark the switch as done: */
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
    }
  }
}



function logOut(e) {
  e = e || window.event;
  e.preventDefault();
  firebase.auth().signOut().then(function() {
    window.location.href = "medtorHome.html";
  }).catch(function(error) {
    // An error happened.
  });
}

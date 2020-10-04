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

var theData = firebase.functions().httpsCallable('giveData');
theData( {text: " "}).then(function(result){
  console.log(result);
  document.getElementById("totMentors").innerHTML = result['data']['totalMentors'];
  document.getElementById("totSpots").innerHTML = result['data']['totalSpots'];
  document.getElementById("totIncomplete").innerHTML = result['data']['incomplete'].length;
  document.getElementById("totSchools").innerHTML = result['data']['allSchools'].length;
  document.getElementById("zeroMent").innerHTML = result['data']['zeroSign'].length;
  document.getElementById("totSign").innerHTML = result['data']['totalSignups'];
  $('.num').each(function () {
      $(this).prop('Counter',0).animate({
          Counter: $(this).text()
      }, {
          duration: 2000,
          easing: 'swing',
          step: function(now) {
              $(this).text(Math.ceil(now));
          }
      });
  });
  for (var i = 1; i <= result['data']['allSchools'].length; i++) {
    name = "cell" + i;
    document.getElementById(name).style.display = "block";
    document.getElementById(name).childNodes[1].innerHTML = result['data']['allSchools'][i-1];
  }
});

document.getElementById("stats").style.display = "block";

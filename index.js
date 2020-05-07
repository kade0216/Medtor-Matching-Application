const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.findMatches = functions.https.onCall((data, context) => {
 const text = data.text;
 const uid = context.auth.uid;
 return giveMentors().then(function(allMentors){
   var data = allMentors;
   var mentorUIDs = Object.keys(data);
   return studResponse(uid).then(function(theStudent){
     var maxScore = 0
     var dataObj = null;
     for (var index = 0; index < mentorUIDs.length; index++) {
       var mentorData = data[mentorUIDs[index]];
       var score = getScore(mentorData, theStudent);
       if (score > maxScore){
         maxScore = score;
         dataObj = mentorData;
       }
     }
     return {theScore: maxScore, theObj: dataObj}
   });
 });
});


function giveMentors() {
  return admin.database().ref("/mentorUsers").once('value').then(snapshot => {
    var theMentors = snapshot.val();
    return theMentors;
  });
}

function studResponse(uid) {
  return admin.database().ref("/studentUsers/" + uid).once('value').then(snapshot => {

    var thePerson = snapshot.val();
    return thePerson;
  });
}

function getScore(mentorObj, studentObj) {
  var score = 0;

  if (mentorObj.homeState === studentObj.homeState){
    score += 1;
  }
  if (mentorObj.hobby1 === studentObj.hobby1 || mentorObj.hobby1 === studentObj.hobby2 || mentorObj.hobby1 === studentObj.hobby3){
    score += 1;
  }
  if (mentorObj.hobby2 === studentObj.hobby1 || mentorObj.hobby2 === studentObj.hobby2 || mentorObj.hobby2 === studentObj.hobby3){
    score += 1;
  }
  if (mentorObj.hobby3 === studentObj.hobby1 || mentorObj.hobby3 === studentObj.hobby2 || mentorObj.hobby3 === studentObj.hobby3){
    score += 1;
  }

  return score;

}

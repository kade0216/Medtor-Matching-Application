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
     var firstObj = {theObj: null, score: 0};
     var secondObj = {theObj: null, score: 0};
     var thirdObj = {theObj: null, score: 0};
     var fourthObj = {theObj: null, score: 0};
     var fifthObj = {theObj: null, score: 0};
     var allScore = [];
     for (var index = 0; index < mentorUIDs.length; index++) {
       var mentorData = data[mentorUIDs[index]];
       var score = getScore(mentorData, theStudent);
       allScore.push(score);
       var currMove = mentorData;
       var currScore = score;
       if (score > fifthObj["score"]){
         if (score > fourthObj["score"]){
           if (score > thirdObj["score"]){
             if (score > secondObj["score"]){
               if (score > firstObj["score"]){

                 mentorData = firstObj["theObj"];
                 score = firstObj["score"];
                 firstObj["theObj"] = currMove;
                 firstObj["score"] = currScore;
               }

               currMove = secondObj["theObj"];
               currScore = secondObj["score"];
               secondObj["theObj"] = mentorData;
               secondObj["score"] = score;
             }

             mentorData = thirdObj["theObj"];
             score = thirdObj["score"];
             thirdObj["theObj"] = currMove;
             thirdObj["score"] = currScore;
           }

           currMove = fourthObj["theObj"];
           currScore = fourthObj["score"];
           fourthObj["theObj"] = mentorData;
           fourthObj["score"] = score;
         }

         fifthObj["theObj"] = currMove;
         fifthObj["score"] = currScore;
       }
     }
     return {theScores: allScore,
       firstObj: firstObj,
       secondObj: secondObj,
       thirdObj: thirdObj,
       fourthObj: fourthObj,
       fifthObj: fifthObj,
     }
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
  var hobScore = 0;
  var locScore = 0;
  var majScore = 0;
  var reScore = 0;
  var volScore = 0;
  var gapScore = 0;
  var undgScore = 0;
  var profScore = 0;

  var hobMultiplier = 1;
  var locMultiplier = 1;
  var majMultiplier = 1;
  var reMultiplier = 1;
  var volMultiplier = 1;
  var gapMultiplier = 1;
  var undMultiplier = 1;
  var profMultiplier = 1;

  if (mentorObj.homeState === studentObj.homeState){
    locScore += 0.25;
  }
  if (mentorObj.homeState === studentObj.UndergradLoc){
    locScore += 0.25;
  }
  if (studentObj.homeState === mentorObj.UndergradLoc){
    locScore += 0.25;
  }
  if (studentObj.homeState === mentorObj.medSchoolLoc){
    locScore += 0.25;
  }
  if (studentObj.UndergradLoc === mentorObj.UndergradLoc){
    locScore += 0.25;
  }
  if (studentObj.UndergradLoc === mentorObj.medSchoolLoc){
    locScore += 0.25;
  }

  var hobMatchScore = 0;
  if (mentorObj.hobby1 === studentObj.hobby1 || mentorObj.hobby1 === studentObj.hobby2 || mentorObj.hobby1 === studentObj.hobby3){
    hobMatchScore += 1;
  }
  if (mentorObj.hobby2 === studentObj.hobby1 || mentorObj.hobby2 === studentObj.hobby2 || mentorObj.hobby2 === studentObj.hobby3){
    hobMatchScore += 1;
  }
  if (mentorObj.hobby3 === studentObj.hobby1 || mentorObj.hobby3 === studentObj.hobby2 || mentorObj.hobby3 === studentObj.hobby3){
    hobMatchScore += 1;
  }

  if (hobMatchScore === 1) {
    hobScore += 0.5;
  }
  if (hobMatchScore === 2) {
    hobScore += 1;
  }
  if (hobMatchScore === 3) {
    hobScore += 1.5;
  }


  if (mentorObj.Major === studentObj.Major){
    majScore += 1;
  }
  if (mentorObj.Major === studentObj.Minor || mentorObj.Minor === studentObj.Major){
    majScore += 0.5;
  }
  if (mentorObj.Minor === studentObj.Minor){
    majScore += 0.5;
  }

  var researchMatchScore = 0;
  if (mentorObj.research1 === studentObj.research1 || mentorObj.research1 === studentObj.research2){
    researchMatchScore += 1;
  }
  if (mentorObj.research2 === studentObj.research1 || mentorObj.research2 === studentObj.research2){
    researchMatchScore += 1;
  }

  if (researchMatchScore === 1){
    reScore = 1;
  }

  if (researchMatchScore === 2){
    reScore = 1.5;
  }

  var volMatchScore = 0;
  if (mentorObj.volunteer1 === studentObj.volunteer1 || mentorObj.volunteer1 === studentObj.volunteer2){
    volMatchScore += 1;
  }
  if (mentorObj.volunteer2 === studentObj.volunteer1 || mentorObj.volunteer2 === studentObj.volunteer2){
    volMatchScore += 1;
  }

  if (volMatchScore === 1){
    volScore = 0.75;
  }

  if (volMatchScore === 2){
    volScore = 1.25;
  }

  if(mentorObj.Undergrad === studentObj.Undergrad){
    undgScore = 1.5;
  }

  var profMatchScore = 0;
  if (mentorObj.profession1 === studentObj.profession1 || mentorObj.profession1 === studentObj.profession2){
    profMatchScore += 1;
  }
  if (mentorObj.profession2 === studentObj.profession1 || mentorObj.profession2 === studentObj.profession2){
    profMatchScore += 1;
  }

  if (profMatchScore === 1){
    profScore = 0.5;
  }

  if (profMatchScore === 2){
    profScore = 1;
  }

  var gapMatchScore = 0;
  if (mentorObj.gap1 === studentObj.gap1 || mentorObj.gap1 === studentObj.gap2){
    if(mentorObj.gap1 === "No Gap Year") {
      gapScore = 1.5;
    }
    else {
      gapMatchScore += 1;
    }
  }
  if (mentorObj.gap2 === studentObj.gap1 || mentorObj.gap2 === studentObj.gap2){
    if(mentorObj.gap2 === "No Gap Year") {
      gapScore = 1.5;
    }
    else {
      gapMatchScore += 1;
    }
  }

  if (gapMatchScore === 1){
    gapScore = 1;
  }

  if (gapMatchScore === 2){
    gapScore = 1.5;
  }

  var fmult = 2.75;
  var smult = 2;
  var tmult = 1.5;

  if(studentObj.pref3 === "Major(s)/Minor(s)"){
    majMultiplier = tmult;
  }
  if(studentObj.pref3 === "Hobbies/Passions"){
    hobMultiplier = tmult;
  }
  if(studentObj.pref3 === "Research Experiences"){
    reMultiplier = tmult;
  }
  if(studentObj.pref3 === "Volunteer Experiences"){
    volMultiplier = tmult;
  }
  if(studentObj.pref3 === "Gap Year Experiences"){
    gapMultiplier = tmult;
  }
  // if(studentObj.pref3 === "Undergraduate Institution"){
  //   undMultiplier = tmult;
  // }
  if(studentObj.pref3 === "Potential Profession"){
    profMultiplier = tmult;
  }
  if(studentObj.pref3 === "Location"){
    locMultiplier = tmult;
  }
  if(studentObj.pref2 === "Major(s)/Minor(s)"){
    majMultiplier = smult;
  }
  if(studentObj.pref2 === "Hobbies/Passions"){
    hobMultiplier = smult;
  }
  if(studentObj.pref2 === "Research Experiences"){
    reMultiplier = smult;
  }
  if(studentObj.pref2 === "Volunteer Experiences"){
    volMultiplier = smult;
  }
  if(studentObj.pref2 === "Gap Year Experiences"){
    gapMultiplier = smult;
  }
  // if(studentObj.pref2 === "Undergraduate Institution"){
  //   undMultiplier = smult;
  // }
  if(studentObj.pref2 === "Potential Profession"){
    profMultiplier = smult;
  }
  if(studentObj.pref2 === "Location"){
    locMultiplier = smult;
  }
  if(studentObj.pref1 === "Major(s)/Minor(s)"){
    majMultiplier = fmult;
  }
  if(studentObj.pref1 === "Hobbies/Passions"){
    hobMultiplier = fmult;
  }
  if(studentObj.pref1 === "Research Experiences"){
    reMultiplier = fmult;
  }
  if(studentObj.pref1 === "Volunteer Experiences"){
    volMultiplier = fmult;
  }
  if(studentObj.pref1 === "Gap Year Experiences"){
    gapMultiplier = fmult;
  }
  // if(studentObj.pref1 === "Undergraduate Institution"){
  //   undMultiplier = fmult;
  // }
  if(studentObj.pref1 === "Potential Profession"){
    profMultiplier = fmult;
  }
  if(studentObj.pref1 === "Location"){
    locMultiplier = fmult;
  }

  score = ((hobScore * hobMultiplier) + (locScore * locMultiplier) + (majScore * majMultiplier) + (reScore*reMultiplier) + (volScore * volMultiplier) + (gapScore * gapMultiplier) + (undgScore * undMultiplier) + (profScore * profMultiplier));

  return score;
}

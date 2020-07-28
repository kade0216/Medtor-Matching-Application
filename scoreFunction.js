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
  var mentorHob2 = "";
  var studentHob2 = "";
  var mentorHob3 = "";
  var studentHob3 = "";

  if (mentorObj.hobby2 === "Other") {
    mentorHob2 = mentorObj.hobby2other;
  }
  else {
    mentorHob2 = mentorObj.hobby2;
  }
  if (studentObj.hobby2 === "Other") {
    studentHob2 = studentObj.hobby2other;
  }
  else {
    studentHob2 = studentObj.hobby2;
  }

  if (mentorObj.hobby3 === "Other") {
    mentorHob3 = mentorObj.hobby3other;
  }
  else {
    mentorHob3 = mentorObj.hobby3;
  }
  if (studentObj.hobby3 === "Other") {
    studentHob3 = studentObj.hobby3other;
  }
  else {
    studentHob3 = studentObj.hobby3;
  }

  if (mentorObj.hobby1 === studentObj.hobby1 || mentorObj.hobby1 === studentHob2 || mentorObj.hobby1 === studentHob3){
    hobMatchScore += 1;
  }
  if (mentorHob2 === studentObj.hobby1 || mentorHob2 === studentHob2 || mentorHob2 === studentHob3){
    hobMatchScore += 1;
  }
  if (mentorHob3 === studentObj.hobby1 || mentorHob3 === studentHob2 || mentorHob3 === studentHob3){
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

  var mentorMaj = "";
  var studentMaj = "";

  if (mentorObj.Major === "Other") {
    mentorMaj = mentorObj.MajorOther;
  }
  else {
    mentorMaj = mentorObj.Major;
  }
  if (studentObj.Major === "Other") {
    studentMaj = studentObj.MajorOther;
  }
  else {
    studentMaj = studentObj.Major;
  }

  var mentorMin = "";
  var studentMin = "";

  if (mentorObj.Minor === "Other") {
    mentorMin = mentorObj.MinorOther;
  }
  else {
    mentorMin = mentorObj.Minor;
  }
  if (studentObj.Minor === "Other") {
    studentMin = studentObj.MinorOther;
  }
  else {
    studentMin = studentObj.Minor;
  }


  if (mentorMaj === studentMaj){
    if (mentorMin === "n/a" || studentMin === "n/a") {
      majScore += 1.25;
    }
    else {
      majScore += 1;
    }
  }

  if (mentorMaj === studentMin || mentorMin === studentMaj){
    majScore += 0.5;
  }

  if (mentorMin === studentMin){
    if (mentorMin === "n/a" || studentMin === "n/a") {
      majScore += 0;
    }
    else {
      majScore += 0.5;
    }
  }


  var mentorRes2 = "";
  var studentRes2 = "";

  if (mentorObj.research2 === "Other") {
    mentorRes2 = mentorObj.research2Other;
  }
  else if (mentorObj.research2 === "none") {
    mentorRes2 = 'na';
  }
  else {
    mentorRes2 = mentorObj.research2;
  }

  if (studentObj.research2 === "Other") {
    studentRes2 = studentObj.research2Other;
  }
  else if (studentObj.research2 === "none") {
    studentRes2 = 'na';
  }
  else {
    studentRes2 = studentObj.research2;
  }

  var researchMatchScore = 0;
  if (mentorObj.research1 === studentObj.research1 || mentorObj.research1 === studentRes2){
    researchMatchScore += 1;
  }
  if (mentorRes2  === studentObj.research1 || mentorRes2  === studentRes2){
    if (mentorRes2 === 'na' && studentRes2 === 'na') {
      researchMatchScore += 0;
    }
    else {
      researchMatchScore += 1;
    }
  }


  if (researchMatchScore === 1){
    if (mentorRes2 === 'na' || studentRes2 === 'na') {
      reScore = 1.25;
    }
    else {
      reScore = 1;
    }
  }

  if (researchMatchScore === 2){
    reScore = 1.5;
  }

  var mentorVol2 = "";
  var studentVol2 = "";
  if (mentorObj.volunteer2 === "Other") {
    mentorVol2 = mentorObj.volunteer2Other;
  }
  else if (mentorObj.volunteer2 === "none") {
    mentorVol2 = 'na';
  }
  else {
    mentorVol2 = mentorObj.volunteer2;
  }

  if (studentObj.volunteer2 === "Other") {
    studentVol2 = studentObj.volunteer2Other;
  }
  else if (studentObj.volunteer2 === "none") {
    studentVol2 = 'na';
  }
  else {
    studentVol2 = studentObj.volunteer2;
  }

  var volMatchScore = 0;
  if (mentorObj.volunteer1 === studentObj.volunteer1 || mentorObj.volunteer1 === studentVol2){
    volMatchScore += 1;
  }
  if (mentorVol2 === studentObj.volunteer1 || mentorVol2 === studentVol2){
    if (mentorVol2 === 'na' && studentVol2 === 'na') {
      volMatchScore += 0;
    }
    else {
      volMatchScore += 1;
    }
  }



  if (volMatchScore === 1){
    if (mentorVol2 === 'na' || studentVol2 === 'na') {
      volScore= 1;
    }
    else {
      reScore = 0.75;
    }
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
  if (mentorObj.profession2 === "Other" && studentObj.profession2 === "Other") {
    profMatchScore -= 1;
  }
  if (mentorObj.profession2 === "none" && studentObj.profession2 === "none") {
    profMatchScore -= 1;
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
      if (mentorObj.gap2 === "Other") {
        if (mentorObj.gap2Other === studentObj.gap2Other) {
          gapMatchScore += 1;
        }
        else {
          gapMatchScore += 0;
        }
      }
      else {
        gapMatchScore += 1;
      }
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

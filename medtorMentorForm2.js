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

var underLabel = document.getElementById("uLabel");
var uLocLabel = document.getElementById("underLocLabel")
var uYLabel = document.getElementById("uYearLabel");
var majLabel = document.getElementById("majorLabel");
var minLabel = document.getElementById("minorLabel")
var medLabel = document.getElementById("medSLabel");
var mLocLabel = document.getElementById("medLocLabel");
var mYLabel = document.getElementById("medYearLabel");

var gradyearIn = document.getElementById('gradyearInput');
var gradIn = document.getElementById("gradInput");
var univlocationIn = document.getElementById('univlocInput');
var undergradIn = document.getElementById('undergradInput');
var majIn = document.getElementById('majorInput');
var minIn = document.getElementById('minorInput');
var medlocIn = document.getElementById('medlocInput');
var medschoolIn = document.getElementById('medschoolInput');

var theUserRN = null;
var formState = null;

var originalFontSize = gradyearIn.style.fontSize;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    if (user.emailVerified == false) {
      console.log("userNotVerified");
      window.location.href = "medtorHome.html";
    }
    if (user.displayName == "Student") {
      window.location.href = "medtorAuthPass.html";
    }

    if (localStorage.getItem("currUser") === null){
      logOut(event);
    }
    else {
      theUserRN = JSON.parse(localStorage["currUser"]);
      formState = theUserRN["formState"];
      if (formState >= 2){
        fillFields();
      }
      else if (formState < 1) {
        window.location.href = "medtorMentorForm1.html";
      }
    }

    //user signed in
    console.log("here");
    upperLogInBtn.innerHTML = "Log Out";
    upperLogInBtn.onclick = function(){
      logOut(event);
    };

    sortList("medschoolInput");
    sortList("majorInput");
    sortList("minorInput");

  } else {
    //user not signed in
    console.log("here2");
    window.location.href = "medtorHome.html";
  }
});

function goNext(e) {
  e = e || window.event;
  e.preventDefault();

  var user = firebase.auth().currentUser;

  var gyInVal = gradyearIn.value
  var gradInVal = gradIn.value
  var univlocationInVal = univlocationIn.value
  var undergradInVal = undergradIn.value
  var majInVal = majIn.value
  var minInVal = minIn.value
  var medlocInVal = medlocIn.value
  var medschoolInVal = medschoolIn.value

  if (checkFields()) {
    if (user.emailVerified == true) {
      theUserRN.Undergrad = undergradInVal;
      theUserRN.UndergradLoc = univlocationInVal;
      theUserRN.UndergradYear = gyInVal;
      theUserRN.Major = majInVal;
      theUserRN.Minor = minInVal;
      theUserRN.MedSchool = medschoolInVal,
      theUserRN.MedSchoolLoc = medlocInVal;
      theUserRN.MedSchoolYear = gradInVal;
      if (formState < 2){
        theUserRN.formState = 2;
      }
      localStorage.setItem("currUser", JSON.stringify(theUserRN));
      //console.log("data passes");
      // extraData = {
      //   Undergrad: undergradInVal,
      //   UndergradLoc: univlocationInVal,
      //   UndergradYear: gyInVal,
      //   Major: majInVal,
      //   Minor: minInVal,
      //   MedSchool: medschoolInVal,
      //   MedSchoolLoc: medlocInVal,
      //   MedSchoolYear: gradInVal,
      // }
      theCurrUser = databaseRef.child("mentorUsers").child(user.uid);
      theCurrUser.update(theUserRN).then(function() {
        //new code
        console.log("entered new data")
        window.location.href = "medtorMentorForm3.html";
        // var returnedPerson = firebase.functions().httpsCallable('findMatches');
        // returnedPerson( {text: " "}).then(function(result){
        //   theObject = result;
        //   console.log(theObject);
        // });

      });
    }
    else {
      window.alert("You're email has not been verified")
    }
  }
}

function checkFields() {
  if (gradyearIn.value != 'none' && gradIn.value != 'none' && univlocationIn.value != 'none' && undergradIn.value != 'none' && majIn.value != 'none' && minIn.value != 'none' && medlocIn.value != 'none' && medschoolIn.value != 'none'){
    console.log('fields are good');
    return true;
  }
  else {
    window.alert("Incomplete: Fill in all fields with proper inputs");
    return false;
  }
}

function goBack(e) {
  e = e || window.event;
  e.preventDefault();
  window.location.href = "medtorMentorForm1.html";
}


function changeColor(e, obj, labeler) {
  e = e || window.event;
  e.preventDefault();
  // console.log("here");
  if (obj.value != "none") {
    obj.style.color = "black";
    obj.style.fontSize = "16px";
    labeler.style.display = "block";
  }
  else {
    obj.style.color = "rgb(169, 169, 169, 80.0)"
    obj.style.fontSize = originalFontSize;
    labeler.style.display = "none";
  }
}

gradyearIn.addEventListener('change', e => {
  changeColor(e, gradyearIn, uYLabel);
})
gradIn.addEventListener('change', e => {
  changeColor(e, gradIn, mYLabel);
})
$(".understate123").on('select2:select', e => {
  changeColor(e, univlocationIn, uLocLabel);
})
$(".under123").on('select2:select', e => {
  changeColor(e, undergradIn, underLabel);
})
$(".major123").on('select2:select', e => {
  changeColor(e, majIn, majLabel);
})
$(".minor123").on('select2:select', e => {
  changeColor(e, minIn, minLabel);
})
$(".medS123").on('select2:select', e => {
  changeColor(e, medschoolIn, medLabel);
})
$(".medLoc123").on('select2:select', e => {
  changeColor(e, medlocIn, mLocLabel);
})

// univlocationIn.addEventListener('change', e => {
//   changeColor(e, univlocationIn, uLocLabel);
// })
// undergradIn.addEventListener('change', e => {
//   changeColor(e, undergradIn, underLabel);
// })
// majIn.addEventListener('change', e => {
//   changeColor(e, majIn, majLabel);
// })
// minIn.addEventListener('change', e => {
//   changeColor(e, minIn, minLabel);
// })
// medlocIn.addEventListener('change', e => {
//   changeColor(e, medlocIn, mLocLabel);
// })
// medschoolIn.addEventListener('change', e => {
//   changeColor(e, medschoolIn, medLabel);
// })



//var select = document.getElementById("selectNumber");
//var options = ["1", "2", "3", "4", "5"];
//for(var i = 0; i < options.length; i++) {
//    var opt = options[i];
//    var el = document.createElement("option");
//    el.textContent = opt;
//    el.value = opt;
//    select.appendChild(el);
//}

var select = document.getElementById("majorInput");
var select3 = document.getElementById("minorInput");
var options = ["Accounting", "Actuarial Science", "Advertising", "Aerospace Engineering", "African Languages", "Literatures, and Linguistics", "African Studies", "African-American Studies", "Asian-American Studies", "Agricultural Engineering", "American Literature", "American Sign Language", "American Studies", "Anatomy", "Ancient Studies", "Animal Behavior and Ethology", "Animal Science", "Animation and Special Effects", "Anthropology", "Applied Mathematics", "Aquaculture", "Arabic", "Archeology", "Architectural Engineering", "Architectural History", "Architecture", "Art", "Art Education", "Art History", "Art Therapy", "Artificial Intelligence and Robotics", "Asian-American Studies", "Astronomy", "Astrophysics", "Athletic Training", "Atmospheric Science", "Automotive Engineering", "Aviation", "Biblical Studies", "Biochemistry", "Bioethics", "Biology", "Biomedical Engineering", "Biomedical Science", "Biopsychology", "Biotechnology", "Botany/Plant Biology", "Business Administration/Management", "Business Communications", "Business Education", "Canadian Studies", "Caribbean Studies", "Cell Biology", "Ceramic Engineering", "Ceramics", "Chemical Engineering", "Chemical Physics", "Chemistry", "Child Care", "Child Development", "Chiropractic", "Cinematography and Film/Video Production", "Civil Engineering", "Communications Studies", "Comparative Literature", "Computer Science", "Computer Engineering", "Computer Graphics", "Computer Systems Analysis", "Creative Writing", "Criminal Science", "Criminology", "Dance", "Data Science", "Digital Communications", "East Asian Studies", "East European Studies", "Ecology", "Economics", "Education", "Education Administration", "Educational Psychology", "Electrical Engineering", "Elementary Education", "Engineering Mechanics", "English", "English Composition", "English Literature", "Entomology", "Entrepreneurship", "Environmental Design/Architecture", "Environmental Science", "Environmental Health Engineering", "Epidemiology", "Ethnic Studies", "European History", "Film", "Finance", "Food Science", "Forensic Science", "French", "Game Design", "Genetics", "Geography", "Geological Engineering", "Geology", "German", "Graphic Design", "Health Administration", "Hebrew", "Hispanic-American", "History", "Hospitality", "Human Development", "Human Resources", "Industrial Design", "Industrial Engineering", "Industrial Management", "Information Technology", "Interior Architecture", "Interior Design", "International Business", "International Relations", "International Studies", "Islamic Studies", "Italian", "Japanese", "Jewish Studies", "Journalism", "Kinesiology", "Korean", "Latin American Studies", "Linguistics", "Management Information Systems", "Marine Biology", "Marine Science", "Marketing", "Massage Therapy", "Materials Science", "Mathematics", "Mechanical Engineering", "Medical Technology", "Mental Health Services", "Microbiology", "Middle Eastern Studies", "Military Science", "Molecular Biology", "Molecular Genetics", "Music", "Music Management", "Musical Theater", "Native American Studies", "Naval Architecture", "Neurobiology", "Neuroscience", "Nuclear Engineering", "Nursing", "Nutrition", "Occupational Therapy", "Oceanography", "Painting", "Paleontology", "Pharmacology", "Pharmacy", "Philosophy", "Photography", "Photojournalism", "Physical Education", "Physical Therapy", "Physician Assistant", "Physics", "Screenwriting", "Political Science", "Psychology", "Public Administration", "Public Health", "Public Policy", "Radiologic Technology", "Religious Studies", "Russian", "Sculpture", "Slavic Studies", "Social Psychology", "Sociology", "Sound Engineering", "South Asian Studies", "Southeast Asia Studies", "Spanish", "Special Education", "Speech Pathology", "Sports Management", "Statistics", "Teacher Education", "Textile Engineering", "Theatre", "Toxicology", "Visual Arts", "Visual Communication", "Web Design", "Web Management", "Wildlife Management", "Women's Studies", "Zoology"];

for(var i = 0; i < options.length; i++) {
    var opt = options[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select3.appendChild(el);
}

for(var i = 0; i < options.length; i++) {
    var opt = options[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
}

var select2 = document.getElementById("undergradInput");
var options2 = ["Abilene Christian University", "Adelphi University", "Agnes Scott College", "Air Force Institute of Technology", "Alabama A&M University", "Alabama State University", "Alaska Pacific University", "Albertson College of Idaho", "Albion College", "Alderson-Broaddus College", "Alfred University", "Allegheny College", "Allentown College of Saint Francis de Sales", "Alma College", "Alverno College", "Ambassador University", "American Coastline University", "American Graduate School of International Management", "American International College", "American University", "Amherst College", "Andrews University", "Angelo State University", "Antioch College", "Antioch New England", "Antioch University-Los Angeles", "Antioch University-Seattle", "Appalachian State University", "Aquinas College", "Arizona State University", "Arizona State University East", "Arizona State University West", "Arizona Western College", "Arkansas State University, Jonesboro", "Arkansas Tech University", "Armstrong State College", "Ashland University", "Assumption College", "Athens State College", "Auburn University", "Auburn University - Montgomery", "Augsburg College", "Augustana College (IL)", "Augustana College (SD)", "Aurora University", "Austin College", "Austin Peay State University", "Averett College", "Avila College", "Azusa Pacific University", "Babson College", "Baldwin-Wallace College", "Ball State University", "Baker University", "Baptist Bible College", "Bard College", "Barry University", "Bastyr University", "Bates College", "Baylor College of Medicine", "Baylor University", "Beaver College", "Belmont University", "Beloit College", "Bemidji State University", "Benedictine College", "Bennington College", "Bentley College", "Berea College", "Berklee College of Music", "Bethany College (CA)", "Bethany College (WV)", "Bethel College (KS)", "Bethel College and Seminary (MN)", "Biola University", "Birmingham-Southern College", "Black Hills State University", "Bloomsburg University of Pennsylvania", "Bluffton College", "Bob Jones University", "Boise State University", "Boston College", "Boston Graduate School of Psychoanalysis", "Boston University", "Bowdoin College", "Bowie State University", "Bowling Green State University", "Bradley University", "Brandeis University", "Brenau University", "Briar Cliff College", "Bridgewater College", "Brigham Young University", "Brigham Young University Hawaii", "Brown University", "Bryant College", "Bryn Mawr College", "Bucknell University", "Buena Vista University", "Butler University", "California Coast University", "California Institute of Technology", "California Lutheran University", "California Maritime Academy", "California National University", "California Pacific University", "California Polytechnic State University, San Luis Obispo", "California School of Professional Psychology", "California State Polytechnic University, Pomona", "California State University System", "California State University, Bakersfield", "California State University, Chico", "California State University, Dominguez Hills", "California State University, Fresno", "California State University, Fullerton", "California State University, Hayward", "California State University, Long Beach", "California State University, Los Angeles", "California State University, Monterey Bay", "California State University, Northridge", "California State University, Sacramento", "California State University, San Bernardino", "California State University, San Jose", "California State University, San Marcos", "California State University, Sacramento", "California State University, Stanislaus", "California University of Pennsylvania", "Calvin College", "Campbell University", "Campbellsville College", "Cameron University", "Canisius College", "Carleton College", "Carlow College", "Carnegie Mellon University", "Carroll College (MT)", "Carroll College (WI)", "Carson-Newman College", "Carthage College", "Case Western Reserve University", "Castleton State University", "The Catholic University of America", "Cedarville College", "Centenary College of Louisiana", "Central College", "Central Connecticut State University", "Central Methodist College", "Central Michigan University", "Central Missouri State University", "Central Washington University", "Centre College", "Chadron State College", "Champlain College", "Chapman University", "Chatham College", "Chesapeake College", "Cheyney University", "The Chicago School of Professional Psychology", "Christian Brothers University", "Christian Theological Seminary", "Christopher Newport University", "The Citadel", "City University", "City University of New York", "Claremont Graduate School", "Claremont McKenna College", "Clarion University of Pennsylvania", "Clark University", "Clarke College", "Clarkson University", "Clayton State College", "Clemson University", "Cleveland State University", "Clinch Valley College", "Coastal Carolina University", "Coe College", "Coker College", "Colby College", "Colgate University", "College of the Atlantic", "College of Charleston", "College of Eastern Utah", "College of the Holy Cross", "College of Saint Benedict", "College of Saint Catherine", "College of St. Francis", "College of Saint Rose", "College of St. Scholastica", "College of William and Mary", "The College of Wooster", "Colorado Christian University", "Colorado College", "Colorado School of Mines", "Colorado State University", "Columbia College Chicago", "Columbia Southern University", "Columbia Union College", "Columbia University", "Concordia College-Ann Arbor", "Concordia College-Moorhead", "Concordia College-St. Paul", "Concordia College-Seward", "Concordia University River Forest, Illinois", "Connecticut College", "The Cooper Union for the Advancement of Science and Art", "Coppin State College", "Cornell College", "Cornell University", "Cornerstone College", "Creighton University", "Curry College", "Daemen College", "Dakota State University", "Dakota Wesleyan University", "Dallas Baptist University", "Dana College", "Daniel Webster College", "Dartmouth College", "Davenport College Detroit College of Business", "Davidson College", "Davis & Elkins College", "Delaware State University", "Delta State University", "Denison University", "DePaul University", "DePauw University", "DeVry Institute of Technology", "DeVry Institute of Technology-Dallas", "DeVry Institute of Technology-Phoenix", "Dickinson College", "Dickinson State University", "Dillard University", "Dominican College", "Dordt College", "Dowling College", "Drake University", "Drew University", "Drexel University", "Drury College", "Duke University", "Duquesne University", "Earlham College", "East Carolina University", "East Central University", "East Stroudsburg State University of Pennsylvania", "East Tennessee State University", "East Texas State University", "Eastern Connecticut State University", "Eastern Illinois University", "Eastern Kentucky University", "Eastern Mennonite University", "Eastern Michigan University", "Eastern Nazarene College", "Eastern New Mexico University", "Eastern Oregon State College", "Eastern Washington University", "Edgewood College", "Edinboro University of Pennsylvania", "Elizabeth City State University", "Elizabethtown College", "Elmhurst College", "Elon College", "Embry-Riddle Aeronautical University, Arizona", "Embry-Riddle Aeronautical University, Florida", "Emerson College", "Emmanuel College", "Emmaus Bible College", "Emporia State University", "Emory & Henry College", "Emory University", "Evergreen State College", "Fairfield University", "Fairleigh Dickinson University", "Fairmont State College", "Fayetteville State University", "Ferris State University", "Fielding Institute", "Fisk University", "Fitchburg State College", "Florida Agricultural and Mechanical University", "Florida Atlantic University", "Florida Gulf Coast University", "Florida Institute of Technology", "Florida International University", "Florida State University", "Fontbonne College", "Fordham University", "Fort Hays State University", "Fort Lewis College", "Franciscan University", "Franklin and Marshall College", "Franklin Pierce Law Center", "Franklin University", "Fresno Pacific University", "Friends University", "Frostburg State University", "Fuller Theological Seminary", "Furman University", "Gallaudet University", "Gannon University", "Geneva College", "George Fox College", "George Mason University", "George Washington University", "Georgetown University", "Georgia College", "Georgia Institute of Technology", "Georgia Southern University", "Georgia Southwestern College", "Georgia State University", "Georgian Court College", "Gettysburg College", "GMI Engineering and Management Institute", "Golden Gate University", "Goldey-Beacom College", "Gonzaga University", "Goshen College", "Goucher College", "Governors State University", "Grace College", "Graceland College", "Grand Valley State University", "Greenleaf University", "Grinnell College", "Guilford College", "Gustavus Adolphus College", "Gutenberg College", "Hamilton College", "Hamline University", "Hampden-Sydney College", "Hampshire College", "Hampton University", "Hanover College", "Harding University", "Hartwick College", "Harvard University", "Harvey Mudd College", "Haskell Indian Nations University", "Hastings College", "Haverford College in Pennsylvania", "Hawaii Pacific University", "Heidelberg College", "Hendrix College", "Hesston College", "High Point University", "Hillsdale College", "Hiram College", "Hobart and William Smith Colleges", "Hofstra University", "Hollins College", "Holy Cross College", "Hood College", "Hope College", "Howard University", "Humboldt State University", "Hunter College", "Huntingdon College", "Huntington College", "ICI University", "Idaho State University", "Illinois Benedictine College", "Illinois Institute of Technology", "Illinois State University", "Incarnate Word College", "Indiana Institute of Technology", "Indiana State University", "Indiana University System", "Indiana University/Purdue University at Columbus", "Indiana University/Purdue University at Fort Wayne", "Indiana University/Purdue University at Indianapolis", "Indiana University at Bloomington", "Indiana University at South Bend", "Indiana University of Pennsylvania", "Indiana University Southeast at New Albany", "Indiana Wesleyan University, Marion", "Inter American University of Puerto Rico Metropolitan Campus", "Iona College", "Iowa State University", "Ithaca College", "Jackson State University", "Jacksonville University", "Jacksonville State University", "James Madison University", "Jamestown College", "The Jewish Theological Seminary", "John Brown University", "John F. Kennedy University", "Johns Hopkins University", "Johnson Bible College", "Johnson C. Smith University", "Johnson & Wales University", "Johnson & Wales University-Charleston", "Jones College", "Judson College", "Juniata College", "Kalamazoo College", "Kansas State University", "Kansas Wesleyan University", "Kean College", "Keene State College", "Kent State University", "Kenyon College", "King's College", "Knox College", "Kutztown University of Pennsylvania", "La Sierra University", "LaGrange College", "Lafayette College", "Lake Forest College", "Lake Superior State University", "Lamar University", "Langston University", "LaSalle University", "Lawrence University", "Lawrence Technological University", "Lebanon Valley College", "Lehigh Univervsity", "Le Moyne College", "Lenoir-Rhyne College", "LeTourneau University", "Lewis & Clark College", "Lewis-Clark State College", "Lewis University", "Liberty University", "Lincoln University", "Linfield College", "Lock Haven University of Pennsylvania", "Loma Linda University", "Long Island University", "Longwood College", "Loras College", "Louisiana College", "Louisiana State University", "Louisiana State University at Alexandria", "Louisiana State University at Shreveport", "Louisiana Tech University", "Loyola College", "Loyola Marymount University", "Loyola University Chicago", "Luther College", "Luther Seminary", "Lycoming College", "Lynchburg College", "Lyndon State College", "Lyon College", "Macalester College", "Maharishi University of Management", "Maine Maritime Academy", "Malone College", "Manhattan College", "Mankato State University", "Mansfield University of Pennsylvania", "Marietta College", "Marist College", "Marlboro College", "Marquette University", "Marshall University", "Mary Baldwin College", "Marymount College", "Marymount University", "Mary Washington College", "Massachusetts Institute of Technology", "McMurry University", "McNeese State University", "Medical College of Georgia", "Medical College of Wisconsin", "Mercer University", "Mercyhurst College", "Meredith College", "Messiah College", "Metropolitan State College of Denver", "Metropolitan State University", "Miami Christian University", "Michigan State University", "Michigan Technological University", "Mid-America Nazarene College", "Middlebury College", "Middle Georgia College", "Middle Tennessee State University", "Midwestern State University", "Millersville University of Pennsylvania", "Milligan College", "Millikin University", "Millsaps College", "Milwaukee School of Engineering", "Minot State University", "Minneapolis College of Art and Design", "Mississippi College", "Mississippi State University", "Mississippi University for Women", "Missouri Southern State College", "Missouri Western State College", "Molloy College", "Monmouth College", "Monmouth University", "Montana State University-Billings", "Montana State University-Bozeman", "Montana State University-Northern", "Montana Tech", "Montclair State University", "Montreat College", "Moravian College", "Moorhead State University", "Morehouse College", "Morgan State University", "Mount Senario College", "Mount Holyoke College", "Mount Saint Joseph College", "Mount Saint Mary College", "Mount Union College", "Murray State University", "Muskingum College", "National Defense University", "National-Louis University", "National Technological University", "National University", "Naval Postgraduate School", "Nazareth College", "Newberry College", "New England Institute of Technology", "New College of California", "New Hampshire College", "New Jersey Institute of Technology", "New Mexico Highlands University", "New Mexico Institute of Mining & Technology", "New Mexico State University", "New York Institute of Technology", "New York University", "Niagara University", "Nicholls State University", "Norfolk State University", "North Adams State College", "North Carolina Central University", "North Carolina A&T State University", "North Carolina State University", "North Carolina Wesleyan College", "North Central Bible College", "North Dakota State University", "Northland College", "North Park College and Theological Seminary", "Northeastern Illinois University", "Northeastern Louisiana University", "Northeastern State University", "Northeastern University", "Northern Arizona University", "Northern Illinois University", "Northern Kentucky University", "Northern Michigan University", "Northern State University", "Northwest Missouri State University", "Northwest Nazarene College", "Northwestern College of Iowa", "Northwestern State University", "Northwestern University", "Norwich University", "Nova Southeastern University", "Oakland University", "Oberlin College", "Occidental College", "Ohio Dominican College", "Ohio Northern University", "Ohio State University, Columbus", "Ohio State University, Marion", "Ohio Wesleyan University", "Ohio University, Athens", "Oklahoma Baptist University", "Oklahoma City University", "Oklahoma State University", "Old Dominion University", "Olivet Nazarene University", "Oral Roberts University", "Oregon Graduate Institute of Science and Technology", "Oregon Health Sciences University", "Oregon Institute of Technology", "Oregon State University", "Otterbein College", "Our Lady of the Lake University", "Pace University", "Pacific Lutheran University", "Pacific Union College", "Pacific University", "Pacific Western University", "Palm Beach Atlantic College", "Peace College", "Pembroke State University", "Pennsylvania State System of Higher Education", "Pennsylvania State University", "Pennsylvania State University-Schuylkill Campus", "Pensacola Christian College", "Pepperdine University", "Peru State College", "Philadelphia College of Textiles and Science", "Phillips University", "Pittsburg State University", "Pitzer College", "Platt College", "Plymouth State College", "Point Loma Nazarene College", "Polytechnic University of New York", "Polytechnic University of Puerto Rico", "Pomona College", "Portland State University", "Prairie View A&M University", "Pratt Institute", "Prescott College", "Princeton University", "Presbyterian College", "Providence College", "Purdue University", "Purdue University Calumet", "Purdue University North Central", "Quincy University", "Quinnipiac College", "Radford University", "Ramapo College", "Randolph-Macon College", "Randolph-Macon Woman's College", "Reed College", "Regent University", "Regis University", "Rensselaer Polytechnic Institute", "Rhode Island College", "Rhodes College", "Rice University", "Richard Stockton College of New Jersey", "Rider University", "Ripon College", "Rivier College", "Roanoke College", "Rochester Institute of Technology", "The Rockefeller University", "Rockford College", "Rockhurst College", "Rocky Mountain College", "Roger Williams University", "Rollins College", "Rosary College", "Rose-Hulman Institute of Technology", "Rowan College", "Rutgers University", "Rutgers University, Camden", "Rutgers University, Newark", "The Sage Colleges", "Sacred Heart University (CT)", "Sacred Heart University (PR)", "Saginaw Valley State University", "St. Ambrose University", "St. Andrews Presbyterian College", "Saint Anselm College", "St. Bonaventure University", "Saint Cloud State University", "Saint Edward's University", "Saint Francis College", "St. John's College-Annapolis", "St. John's College-Santa Fe", "Saint John's University (MN)", "Saint John's University (NY)", "St. Joseph College (CT)", "Saint Joseph's College (IN)", "St. Joseph's College (ME)", "Saint Joseph's University", "St. Lawrence University", "St. Louis College of Pharmacy", "Saint Louis University", "St. Martin's College", "Saint Mary College", "Saint Mary's College (IN)", "Saint Mary's College of California", "Saint Mary's University of Minnesota", "Saint Michael's College", "Saint Olaf College", "St. Thomas University (FL)", "Saint Vincent College", "Saint Xavier University", "Salisbury State University", "Salish Kootenai College", "Sam Houston State University", "Samford University", "San Diego State University", "San Francisco State University", "San Jose State University", "Santa Clara University", "Sarah Lawrence College", "School of the Art Institute of Chicago", "Seattle Pacific University", "Seattle University", "Seton Hall University", "Sewanee, University of the South", "Shawnee State University", "Shenandoah University", "Shippensburg University of Pennsylvania", "Shorter College", "Simmons College", "Simon's Rock College", "Simpson College", "Skidmore College", "Slippery Rock University of Pennsylvania", "Smith College", "Sonoma State University", "South Dakota School of Mines and Technology", "South Dakota State University", "Southeast Missouri State University", "Southeastern Louisiana University", "Southern College", "Southern College of Technology", "Southern Connecticut State University", "Southern Illinois University", "Southern Illinois University-Carbondale", "Southern Illinois University-Edwardsville", "Southern Methodist University", "Southern Nazarene University", "Southern Oregon State College", "Southern University", "Southern Utah University", "Southampton College", "South Texas College of Law", "Southwest Baptist University", "Southwest Missouri State University", "Southwest State University", "Southwest Texas State University", "Southwestern Adventist College", "Southwestern University", "Spelman College", "Spring Arbor College", "Spring Hill College", "Stanford University", "State University of New York System", "State University of New York at Albany", "State University of New York College of Technology at Alfred", "State University of New York at Binghamton", "State University of New York College at Brockport", "State University of New York at Buffalo", "State University of New York College at Buffalo (Buffalo State College)", "State University of New York College of Agriculture and Technology at Cobleskill", "State University of New York College at Cortland", "State University of New York College of Environmental Science and Forestry", "State University of New York at Farmingdale", "State University of New York at Fredonia", "State University of New York College at Geneseo", "State University of New York College at New Paltz", "State University of New York College at Oneonta", "State University of New York at Oswego", "State University of New York at Plattsburgh", "State University of New York College at Potsdam", "State University of New York at Stony Brook", "State University of New York Institute of Technology at Utica/Rome", "Stephen F. Austin State University", "Stephens College", "Stetson University", "Stevens Institute of Technology", "Strayer College", "Suffolk University", "Sul Ross State University", "Summit University of Louisiana", "Susquehanna University", "Swarthmore College", "Sweet Briar College", "Syracuse University", "Tabor College", "Tarleton State University", "Taylor University", "Teachers College, Columbia University", "Teikyo Marycrest University", "Temple University", "Tennessee State University", "Tennessee Technological University", "Texas A&M International University", "Texas A&M University-College Station", "Texas A&M University-Corpus Christi", "Texas A&M University-Kingsville", "Texas Christian University", "Texas Southern University", "Texas Tech University", "Texas Tech University-Health Sciences Center", "Texas Woman's University", "Thomas College", "Thomas Edison State College", "Thomas Jefferson University", "Thomas More College", "Towson State University", "Transylvania University", "Trenton State College", "Trinity College (CT)", "Trinity College (DC)", "Trinity University", "Troy State University", "Truman State University", "Tucson University", "Tufts University", "Tulane University", "Tuskegee University", "Union College", "The Union Institute", "Union University", "United States Air Force Academy", "United States International University", "United States Merchant Marine Academy", "United States Military Academy", "United States Naval Academy", "The Uniformed Services University of the Health Sciences", "Ursinus College", "Ursuline College", "University of Akron", "University of Alabama at Birmingham", "University of Alabama at Huntsville", "University of Alabama at Tuscaloosa", "University of Alaska", "University of Alaska-Anchorage", "University of Alaska-Fairbanks", "University of Alaska-Southeast", "University of Arizona", "University of Arkansas - Fayetteville", "University of Arkansas - Little Rock", "University of Arkansas for Medical Sciences", "University of Arkansas - Monticello", "University of Baltimore", "University of Bridgeport", "University of California, Berkeley", "University of California, Davis", "University of California, Irvine", "University of California, Los Angeles", "University of California, Riverside", "University of California, San Diego", "University of California, San Francisco", "University of California, Santa Barbara", "University of California, Santa Cruz", "University of Central Arkansas", "University of Central Florida", "University of Central Texas", "University of Charleston", "University of Chicago", "University of Cincinnati", "University of Colorado at Boulder", "University of Colorado at Colorado Springs", "University of Colorado at Denver", "University of Colorado Health Sciences Center", "University of Connecticut", "University of Dallas", "University of Dayton", "University of Delaware", "University of Denver", "University of the District of Columbia", "University of Detroit Mercy", "University of Dubuque", "University of Evansville", "University of Florida", "University of Georgia", "University of Great Falls", "University of Guam", "University of Hartford", "University of Hawaii at Hilo Physics and Astronomy", "University of Hawaii at Manoa", "University of Houston", "University of Idaho", "University of Illinois at Chicago", "University of Illinois at Springfield", "University of Ilinois at Urbana-Champaign", "University of Indianapolis", "University of Iowa", "University of Kansas", "University of Kansas School of Medicine", "University of Kentucky", "University of La Verne", "University of Louisville", "University of Maine System", "University of Maine", "University of Maine at Farmington", "University of Maine at Fort Kent", "University of Maine at Machias", "University of Maine at Presque Island", "University of Maryland at Baltimore", "University of Maryland at Baltimore County", "University of Maryland at College Park", "University of Maryland - University College", "University of Massachusetts System", "University of Massachusetts at Amherst", "University of Massachusetts at Dartmouth", "University of Massachusetts at Lowell", "University of Memphis", "University of Miami", "University of Michigan", "University of Michigan-Dearborn", "University of Minnesota", "University of Minnesota-Crookston", "University of Minnesota-Duluth", "University of Minnesota-Morris", "University of Minnesota-Twin Cities", "University of Mississippi", "University of Mississippi Medical Center", "University of Missouri System", "University of Missouri-Columbia", "University of Missouri-Kansas City", "University of Missouri-Rolla", "University of Missouri-Saint Louis", "University of Montana", "University of Nebraska, Kearney", "University of Nebraska, Lincoln", "University of Nebraska, Omaha", "University of Nevada, Las Vegas", "University of Nevada, Reno", "University of New England", "University of New Hampshire, Durham", "University of New Haven", "University of New Mexico", "University of New Orleans", "University of North Carolina at Asheville", "University of North Carolina", "University of North Carolina at Charlotte", "University of North Carolina at Greensboro", "University of North Carolina System", "University of North Carolina at Wilmington", "University of North Dakota", "University of North Florida", "University of North Texas", "University of North Texas Health Science Center", "University of Northern Colorado", "University of Northern Iowa", "University of Notre Dame", "University of Oklahoma", "University of Oregon", "University of the Ozarks", "University of the Pacific", "University of Pennsylvania", "University of Phoenix", "University of Pittsburgh", "University of Pittsburgh at Johnstown", "University of Portland", "University of Puerto Rico", "University of Puget Sound", "University of Redlands", "University of Rhode Island", "University of Richmond", "University of Rochester", "University of San Diego", "University of San Francisco", "University of Sarasota", "University of Science & Arts of Oklahoma", "University of Scranton", "University of Sioux Falls", "University of Southern California", "University of South Carolina", "University of South Carolina - Aiken", "University of South Dakota", "University of South Florida", "University of Southern Maine", "University of Southern Mississippi", "University of Southwestern Louisiana", "University of Saint Thomas", "University of Saint Thomas (MN)", "University of South Alabama", "University of Southern Colorado", "University of Southern Indiana", "University of Tampa", "University of Tennessee, Knoxville", "University of Tennessee, Martin", "University of Texas System", "University of Texas at Arlington", "University of Texas at Austin", "University of Texas at Brownsville", "University of Texas at Dallas", "University of Texas at El Paso", "University of Texas-Pan American", "University of Texas at San Antonio", "University of Texas Health Science Center at Houston", "University of Texas Health Science Center at San Antonio", "University of Texas at Tyler", "University of Texas Health Center at Tyler", "University of Texas M.D. Anderson Cancer Center", "University of Texas Medical Branch", "University of Texas Southwestern Medical Center at Dallas", "University of Toledo", "University of Tulsa", "University of Utah", "University of Vermont", "University of the Virgin Islands", "University of Virginia, Charlottesville", "University of Washington", "University of West Alabama", "University of West Florida", "University of Wisconsin System", "University of Wisconsin-Eau Claire", "University of Wisconsin-Green Bay", "University of Wisconsin-LaCrosse", "University of Wisconsin-Madison", "University of Wisconsin-Milwaukee", "University of Wisconsin-Oshkosh", "University of Wisconsin-Parkside", "University of Wisconsin-Platteville", "University of Wisconsin-River Falls", "University of Wisconsin-Stevens Point", "University of Wisconsin-Stout", "University of Wisconsin-Superior", "University of Wisconsin-Whitewater", "University of Wyoming", "Upper Iowa University", "Utah State University", "Utah Valley State College", "Valley City State University", "Valdosta State University", "Valparaiso University", "Vanderbilt University", "Vassar College", "Vermont Technical College", "Villa Julie College", "Villanova University", "Virginia Commonwealth University", "Virginia Intermont College", "Virginia Military Institute", "Virginia Polytechnic Institute and State University", "Virginia State University", "Virginia Wesleyan College", "Wabash College", "Wake Forest University", "Walden University", "Walla Walla College", "Warren Wilson College", "Wartburg College", "Washburn University", "Washington Bible College/Capital Bible Seminary", "Washington & Lee University", "Washington College", "Washington State University", "Washington State University at Tri-Cities", "Washington State University at Vancouver", "Washington University, Saint Louis", "Wayne State University", "Waynesburg College", "Webster University", "Wellesley College", "Wells College", "Wentworth Institute of Technology", "Wesley College", "Wesleyan University", "West Chester University of Pennsylvania", "West Coast University", "West Georgia College", "West Liberty State College", "West Texas A&M University", "West Virginia University", "West Virginia University at Parkersburg", "Western Carolina University", "Western Connecticut State University", "Western Illinois University", "Western Kentucky University", "Western Maryland College", "Western Michigan University", "Western Montana College", "Western New England College", "Western New Mexico University", "Western State College", "Western Washington University", "Westfield State College", "Westminster College", "Westminster College", "Westminster College of Salt Lake City", "Westminster Theological Seminary", "Westmont College", "Wheaton College", "Wheaton College, Norton MA", "Wheeling Jesuit College", "Whitman College", "Whittier College", "Whitworth College", "Wichita State University", "Widener University", "Wilberforce University", "Wilkes University", "Willamette University", "William Howard Taft University", "William Jewell College", "William Mitchell College of Law", "William Penn College", "William Paterson College", "William Woods University", "Williams College", "Wilmington College", "Winona State University", "Winthrop University", "Wittenberg University", "Wofford College", "Woodbury University", "Worcester Polytechnic Institute", "Wright State University", "Xavier University of Louisiana", "Yale University", "Yeshiva University", "York College of Pennsylvania", "Youngstown State University"];

for(var i = 0; i < options2.length; i++) {
    var opt = options2[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select2.appendChild(el);
}

var select4 = document.getElementById("medschoolInput");

var options3 = ["University of Alabama Med", "University of S. Alabama Med", "University of Arizona Med", "University of Arkansas Med", "California Northstate University Med", "California University of Science and Med", "Kaiser Permanente Med", "Keck Med of USC", "Loma Linda University Med", "Stanford University Med", "UCLA/Drew Med Program", "UC Davis Med", "UC Irvine Med", "UCLA David Geffen Med", "UC Riverside Med", "UC San Diego Med", "UC San Francisco Med", "University of Colorado Med", "Frank H. Netter MD at Quinnipiac University", "University of Connecticut Med", "Yale University Med", "George Washington University Med", "Georgetown University Med", "Howard University Med", "Charles E. Schmidt Med at Florida Atlantic University", "Florida International University Wertheim Med", "Florida State University Med", "Nova Southeastern University Dr. Kiran C. Patel College of Allopathic Med", "University of Central Florida Med", "University of Florida Med", "University of Miami Leonard M. Miller Med", "University of S. Florida Med Morsani Med", "Emory University Med", "Med of Georgia at Augusta University", "Mercer University Med", "Morehouse Med", "University of Hawaii, John A. Burns Med", "Carle Illinois Med", "Chicago Med at Rosalind Franklin University of Med & Science", "Loyola University Chicago Stritch Med", "N.W.ern University The Feinberg Med", "Rush Med of Rush University Medical Center", "Southern Illinois University Med", "University of Chicago Pritzker Med", "University of Illinois Med", "Indiana University Med", "University of Iowa Roy J. and Lucille A. Carver Med", "University of Kansas Med", "University of Kentucky Med", "University of Louisville Med", "Louisiana State University Med", "Tulane University Med", "Johns Hopkins University Med", "Uniformed Services Univ. of the Health Sciences F. Edward Herbert Med", "University of Maryland Med", "Boston University Med", "Harvard Med", "Tufts University Med", "University of Massachusetts Med", "Central Michigan University Med", "Michigan State University Med", "Oakland University William Beaumont Med", "University of Michigan Med", "Wayne State University Med", "Western Michigan University Homer Stryker M.D. Med", "Mayo Clinic Alix Med", "University of Minnesota Med", "University of Mississippi Med", "Saint Louis University Med", "University of Missouri Med", "Washington University in St. Louis Med", "Creighton University Med", "University of Nebraska Med", "University of Nevada, Las Vegas Med", "University of Nevada, Reno Med", "Geisel Med at Dartmouth", "Cooper Med of Rowan University", "Rutgers New Jersey Med", "Rutgers, Robert Wood Johnson Med", "Seton Hall - Hackensack Meridian", "University of New Mexico Med", "Albany Med", "Albert Einstein Med of Yeshiva University", "Columbia University Med", "CUNY Med", "Donald and Barbara Zucker Med at Hofstra/Northwell", "Icahn Med at Mount Sinai", "Jacobs Med at the University at Buffalo", "New York Med", "New York University Med", "New York University Long Island Med", "Renaissance Med at Stony Brook University", "State University of New York Downstate Medical Center", "State University of New York Upstate Medical Univ.", "University of Rochester Med and Dentistry", "Weill Cornell Med", "Brody Med at E. Carolina University", "Duke University Med", "Univ. of North Carolina Med", "Wake Forest University Med", "Univ. of N. Dakota Med", "Case Western Reserve University Med", "Cleveland Clinic Lerner Med", "Northeast Ohio Medical University", "Ohio State University Med", "The University of Toledo Med", "University of Cincinnati Med", "Wright State University Boonshoft Med", "University of Oklahoma Med", "Oregon Health & Science University Med", "Geisinger Commonwealth Med", "Drexel University Med", "Lewis Katz Med at Temple University", "Pennsylvania State University Med", "Perelman Med at the University of Pennsylvania", "Sidney Kimmel Med at Thomas Jefferson University", "University of Pittsburgh Med", "Universidad Central del Caribe Med", "Ponce Med", "San Juan Bautista Med", "University of Puerto Rico Med", "Warren Alpert Med of Brown Univ.", "Medical University of S. Carolina", "University of S. Carolina Med", "University of S. Carolina Med Greenville", "Sanford Med The University of S. Dakota", "E. Tennessee State University Med", "Meharry Med", "University of Tennessee Med", "Vanderbilt University Med", "Baylor Med", "TCU and University of N. Texas Med", "Texas A&M Med", "Texas Tech University Paul L. Foster Med", "University of Texas Med at Galveston", "University of Texas Med at Houston", "University of Texas Med at San Antonio", "University of Texas Rio Grande Valley Med", "University of Texas Southwestern Med at Dallas", "Dell Med at University of Texas", "University of Utah Med", "Robert Larner, M.D., Med at the University of Vermont", "Eastern Virginia Med", "University of Virginia Med", "VCU Med, Med of Virginia Health Sciences Division", "Virginia Tech Carilion Med", "University of Washington Med", "Washington State University Med", "Joan C. Edwards Med at Marshall University", "West Virginia University Med", "Medical College of Wisconsin", "University of Wisconsin Med"];

for(var i = 0; i < options3.length; i++) {
    var opt = options3[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select4.appendChild(el);
}

function sortList(id) {
  var list, i, switching, b, shouldSwitch;
  list = document.getElementById(id);
  switching = true;
  while (switching) {
    switching = false;
    b = list.getElementsByTagName("OPTION");
    for (i = 1; i < (b.length - 1); i++) {
      shouldSwitch = false;
      if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
    }
  }
}

function fillFields() {
  var eventer = new Event('change');

  gradyearIn.value = theUserRN["UndergradYear"];
  gradIn.value = theUserRN["MedSchoolYear"];
  univlocationIn.value = theUserRN["UndergradLoc"];
  undergradIn.value = theUserRN["Undergrad"];
  majIn.value = theUserRN["Major"];
  minIn.value = theUserRN["Minor"];
  medlocIn.value = theUserRN["MedSchoolLoc"];
  medschoolIn.value = theUserRN["MedSchool"];

  changeColor(eventer, gradyearIn, uYLabel);
  changeColor(eventer, gradIn, mYLabel);
  changeColor(eventer, univlocationIn, uLocLabel);
  changeColor(eventer, undergradIn, underLabel);
  changeColor(eventer, majIn, majLabel);
  changeColor(eventer, minIn, minLabel);
  changeColor(eventer, medlocIn, mLocLabel);
  changeColor(eventer, medschoolIn, medLabel);

  $('.under123').select2({
    placeholder: {
      id: "none",
      text: undergradIn.value
    }
  });
  $('.major123').select2({
    placeholder: {
      id: "none",
      text: majIn.value
    }
  });
  $('.minor123').select2({
    placeholder: {
      id: "none",
      text: majIn.value
    }
  });
  $('.understate123').select2({
    placeholder: {
      id: "none",
      text: univlocationIn.value
    }
  });
  $('.medS123').select2({
    placeholder: {
      id: "none",
      text: medschoolIn.value
    }
  });
  $('.medLoc123').select2({
    placeholder: {
      id: "none",
      text: medlocIn.value
    }
  });
}


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

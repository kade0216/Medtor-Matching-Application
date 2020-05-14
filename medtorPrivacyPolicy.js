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

var theUserRN = null;
var formState = null;
console.log("here");

document.getElementById("section1").innerHTML = "Personal information you disclose to us. <br><br><i>In Short:  We collect personal information that you provide to us.</i><br><br>We collect personal information that you voluntarily provide to us when registering at the Services expressing an interest in obtaining information about us or our products and services, when participating in activities on the Services (such as posting messages in our online forums or entering competitions, contests or giveaways) or otherwise contacting us.<br><br>The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make and the products and features you use. The personal information we collect can include the following:<br><br>Publicly Available Personal Information. We collect first name, maiden name, last name, and nickname; email addresses; business email; current and former address; and other similar data.<br><br>All personal information that you provide to us must be true, complete and accurate, and you must notify us of any changes to such personal information.";

document.getElementById("section2").innerHTML = "<i>In Short:  We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent.</i><br><br>We use personal information collected via our Services for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations. We indicate the specific processing grounds we rely on next to each purpose listed below.<br><br>We use the information we collect or receive:<br>  - To facilitate account creation and logon process. If you choose to link your account with us to a third party account (such as your Google or Facebook account), we use the information you allowed us to collect from those third parties to facilitate account creation and logon process for the performance of the contract.<br>  - To enable user-to-user communications. We may use your information in order to enable user-to-user communications with each user's consent.<br>  - To manage user accounts. We may use your information for the purposes of managing our account and keeping it in working order.";

document.getElementById("section3").innerHTML = "<i>In Short:  We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</i><br><br>We may process or share data based on the following legal basis:<br>  - Consent: We may process your data if you have given us specific consent to use your personal information in a specific purpose.<br>  - Legitimate Interests: We may process your data when it is reasonably necessary to achieve our legitimate business interests.<br>  - Performance of a Contract: Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.<br>  - Legal Obligations: We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena (including in response to public authorities to meet national security or law enforcement requirements).<br>  - Vital Interests: We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.<br><br>More specifically, we may need to process your data or share your personal information in the following situations:<br>  - Vendors, Consultants and Other Third-Party Service Providers. We may share your data with third party vendors, service providers, contractors or agents who perform services for us or on our behalf and require access to such information to do that work. Examples include: payment processing, data analysis, email delivery, hosting services, customer service and marketing efforts. We may allow selected third parties to use tracking technology on the Services, which will enable them to collect data about how you interact with the Services over time. This information may be used to, among other things, analyze and track data, determine the popularity of certain content and better understand online activity. Unless described in this Policy, we do not share, sell, rent or trade any of your information with third parties for their promotional purposes.<br>  - Business Transfers. We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.<br>  - Third-Party Advertisers. We may use third-party advertising companies to serve ads when you visit the Services. These companies may use information about your visits to our Website(s) and other websites that are contained in web cookies and other tracking technologies in order to provide advertisements about goods and services of interest to you.<br>  - Other Users. When you share personal information or otherwise interact with public areas of the Services, such personal information may be viewed by all users and may be publicly distributed outside the Services in perpetuity. Similarly, other users will be able to view descriptions of your activity, communicate with you within our Services, and view your profile.";

document.getElementById("section4").innerHTML = "<i>In Short:  We keep your information for as long as necessary to fulfill the purposes outlined in this privacy policy unless otherwise required by law.</i><br><br>We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements). No purpose in this policy will require us keeping your personal information for longer than the period of time in which users have an account with us.<br><br>When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize it, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.";

document.getElementById("section5").innerHTML = "<i>In Short:  We aim to protect your personal information through a system of organizational and technical security measures.</i><br><br>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the services within a secure environment.";

document.getElementById("section6").innerHTML = "<i>In Short:  We do not knowingly collect data from or market to children under 18 years of age.</i><br><br>We do not knowingly solicit data from or market to children under 18 years of age. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we have collected from children under age 18, please contact us at medtor.noreply@gmail.com.";

document.getElementById("section7").innerHTML = "<i>In Short:  You may review, change, or terminate your account at any time.</i><br><br>If you are resident in the European Economic Area and you believe we are unlawfully processing your personal information, you also have the right to complain to your local data protection supervisory authority. You can find their contact details here: http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm.<br><br>If you have questions or comments about your privacy rights, you may email us at medtor.noreply@gmail.com.<br><br>Account Information<br><br>If you would at any time like to review or change the information in your account or terminate your account, you can:<br>  - Log into your account settings and update your user account.<br>  - Contact us using the contact information provided.<br><br>Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, some information may be retained in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms of Use and/or comply with legal requirements.<br><br>Opting out of email marketing: You can unsubscribe from our marketing email list at any time by clicking on the unsubscribe link in the emails that we send or by contacting us using the details provided below. You will then be removed from the marketing email list – however, we will still need to send you service-related emails that are necessary for the administration and use of your account. To otherwise opt-out, you may:<br>  - Contact us using the contact information provided.";

document.getElementById("section8").innerHTML = "Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track (“DNT”) feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. No uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy policy.";

document.getElementById("section9").innerHTML = "<i>In Short:  Yes, if you are a resident of California, you are granted specific rights regarding access to your personal information.</i><br><br>California Civil Code Section 1798.83, also known as the “Shine The Light” law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us using the contact information provided below.<br><br>If you are under 18 years of age, reside in California, and have a registered account with the Services, you have the right to request removal of unwanted data that you publicly post on the Services. To request removal of such data, please contact us using the contact information provided below, and include the email address associated with your account and a statement that you reside in California. We will make sure the data is not publicly displayed on the Services, but please be aware that the data may not be completely or comprehensively removed from our systems.";

document.getElementById("section10").innerHTML = "<i>In Short:  Yes, we will update this policy as necessary to stay compliant with relevant laws.</i><br><br>We may update this privacy policy from time to time. The updated version will be indicated by an updated “Revised” date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy policy, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy policy frequently to be informed of how we are protecting your information.";

document.getElementById("section11").innerHTML = "If you have questions or comments about this policy, you may email us at medtor.noreply@gmail.com.";

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

    upperLogInBtn.innerHTML = "Log Out";
    //upperLogInBtn.href = "medtorHome.html";
    upperLogInBtn.onclick = function(){
      logOut(event);
    };

    //user signed in
    console.log("here");
    upperLogInBtn.innerHTML = "Log Out";
    upperLogInBtn.href = "#";
    upperLogInBtn.onclick = function(){
      console.log("trying to log out");
      logOut(event);
    };



  } else {
    //user not signed in
    console.log("here2");
    upperLogInBtn.innerHTML = "Register";
    //upperLogInBtn.href = "medtorHome.html";
    upperLogInBtn.href = "medtorRegisterDec.html";
    upperLogInBtn.onclick = function(){
      null;
    };
    //window.location.href = "medtorHome.html";
  }
});


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

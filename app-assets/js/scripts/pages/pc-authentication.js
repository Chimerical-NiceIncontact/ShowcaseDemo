/*=========================================================================================
    File Name: pc-authentication.js
    Description: Authentication page for dealing with logged in versus logged out
    --------------------------------------------------------------------------------------
    Item Name: Chimerical V2
    Author: Josh Gibson, Ryan Hof
    Author URL: https://gibson90.github.io/Personal-Chimerical-Site/
==========================================================================================*/

// Format Phone Number
let formatPhoneNumber = (str) => {
    //Filter only numbers from the input
    let cleaned = ('' + str).replace(/\D/g, '');

    //Check if the input is of correct length
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    };

    return null
};

// Firebase Collections
var user = firebase.auth().currentUser;
var db = firebase.firestore();

// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        //console.log('user logged in: ', user);
        
        // If we are viewing the User Details Page
        if (document.URL.includes("pc-app-user-view.html")) {
            db.collection("users").doc(user.uid).get().then(function (doc) {
                if (doc.exists) {
                    //console.log("Data: ", doc.data());
                    document.getElementById("FSusername").innerHTML = doc.data().Username;
                    document.getElementById("FSname").innerHTML = doc.data().Name;
                    document.getElementById("FSemail").innerHTML = doc.data().Email;
                    document.getElementById("FSphone").innerHTML = formatPhoneNumber(doc.data().Phone);
                    document.getElementById("FSrole").innerHTML = doc.data().Role;
                    document.getElementById("loggedInUser").innerHTML = doc.data().Name;
                    document.getElementById("user-role").innerHTML = doc.data().Role;
                    document.getElementById("c35ID").innerHTML = doc.data().AgentID.C35;
                    document.getElementById("c32ID").innerHTML = doc.data().AgentID.C32;
                    document.getElementById("b32ID").innerHTML = doc.data().AgentID.B32;
                    document.getElementById("b2ID").innerHTML = doc.data().AgentID.B2;
                };
            });
            // If we are viewing the Edit Page
        } else if (document.URL.includes("pc-app-user-edit.html")) {
            db.collection("users").doc(user.uid).get().then(function (doc) {
                if (doc.exists) {
                    //console.log(doc.data().Role);
                    // Fill in the name at the top
                    document.getElementById("FSnameHeader").innerHTML = doc.data().Name;
                    // Fill in the fields
                    document.getElementById("FSusername").value = doc.data().Username;
                    document.getElementById("FSnameInput").value = doc.data().Name;
                    document.getElementById("FSemail").value = doc.data().Email;
                    document.getElementById("FSphone").value = formatPhoneNumber(doc.data().Phone);
                    // Fill in role
                    var rOptions = document.getElementById("roleOptions").childElementCount;
                    var select = document.getElementById("roleOptions");
                    for (i=0; i< rOptions; i++){
                       var optionChoice = document.getElementById("roleOptions").options[i].value;
                        if (optionChoice.localeCompare(doc.data().Role) === 0){
                            document.getElementById("roleOptions").options[i].selected = true;
                        } else {
                            //console.log("Non-matched");
                        }
                    }
                    // Name plate
                    document.getElementById("FSname").innerHTML = doc.data().Name;
                    document.getElementById("user-role").innerHTML = doc.data().Role;
                };
            });
        } else {
            // If we are viewing all other pages
            db.collection("users").doc(user.uid).get().then(function (doc) {
                if (doc.exists) {
                    //console.log("Data: ", doc.data());
                    
                    // Name Plate
                    document.getElementById("FSname").innerHTML = doc.data().Name;
                    document.getElementById("user-role").innerHTML = doc.data().Role;
                };
            });
        }
    } else {
	    window.stop();
	    window.location.href = "/ShowcaseDemo/pc-auth-login.html";
        
    }
});

// Logout option
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log("This user has logged out");
        window.location.href = "/ShowcaseDemo/pc-auth-login.html";
    });
});

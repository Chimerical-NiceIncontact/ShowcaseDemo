// Firebase Collections
var user = firebase.auth().currentUser;
var db = firebase.firestore();

// Firestore Collections Info
var fellas = db.collection("users").doc(user.uid);
fellas.get().then(function (doc) {
    if (doc.exists) {
        // Check for Number of AgentId's
        
        // Launch Scripting If There Is Data
        const phoneLaunchFella = document.querySelector('#launchPhoneForm');
        phoneLaunchFella.addEventListener('submit', (e) => {
            e.preventDefault();
            // Var from input form
            var pName = $("input#first-name-icon").val();
            var pPhone = $("input#contact-info-icon").val();
            
            var pSwitchKey = $("input#select2-icons").val();
            var pEmbedded = $("input#emailCC").val();
            // Var for URL to spawn click to call
            var url = "https://home-c32.nice-incontact.com/inContact/Manage/Scripts/Spawn.aspx?scriptName=ChimericalCorporation\ChimericalClickToCall&bus_no=4596619&scriptId=84251132&skill_no=4020410&p1=" + & p2 = & p3 = & p4 = & p5 = & Guid = 06 b1144c - fdc3 - 48 ab - 9064 - a71a8b87bc8c " 
        });


    } else {
        // There is no data
    }
})

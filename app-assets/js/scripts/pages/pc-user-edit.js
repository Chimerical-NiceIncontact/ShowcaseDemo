// Firebase Collections
var user = firebase.auth().currentUser;
var db = firebase.firestore();
const userDocRef = db.collection('users');

// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        // Other way around
        db.collection("users").doc(user.uid).get().then(function (doc) {
            var c32 = doc.data().AgentID.C32;
            var c35 = doc.data().AgentID.C35;
            var b32 = doc.data().AgentID.B32;
            var b2 = doc.data().AgentID.B2;

            document.getElementById("c35ID").value = c35;
            document.getElementById("c32ID").value = c32;
            document.getElementById("b32ID").value = b32;
            document.getElementById("b2ID").value = b2;
            
            getDoc(user.uid);
        })
    }
})

async function getDoc(id) {
    const snapshot = await db.collection('users').doc(id).get();
    const data = snapshot.data();

    // Check for data change ** AGENT ID **    
    var changeName,
        changeEmail,
        changePhone,
        changeRole,
        changeUsername,
        changeName = (changeEmail = changePhone = changeRole = changeUsername = false);
    var customStatus = "";
    var changeAgentC35,
        changeAgentC32,
        changeAgentB32,
        changeAgentB2 = (changeAgentC35 = changeAgentC32 = changeAgentB32 = changeAgentB2 = false);

    $("form#checkerForm").on("change", ":input", function (e) {
        //':input' selector get all form fields even textarea, input, or select
        window[$(this).attr("name")] = true;
        console.log($(this).attr("name"));
    });

    // Upload stuff to db
    $("#change-acceptance").click(function () {
        e.preventDefault()
        console.log("Button pressed");
        // User Info
        var changedName = $('#FSnameInput').val();
        var changedEmail = $('#FSemail').val();
        var changedPhone = $('#FSphone').val();
        var changedRole = $('#roleOptions').val();
        var changedUsername = $('#FSusername').val();
        var changedStatus = $('#form-status').val();

        // Agent ID
        var changedAgentC35 = $('#c35ID').val();
        var changedAgentC32 = $('#c32ID').val();
        var changedAgentB32 = $('#b32ID').val();
        var changedAgentB2 = $('#b2ID').val();

        // POST
        var postData = {
            Name: changedName ? changedName : null,
            Email: changedEmail ? changedEmail : null,
            Phone: changedPhone ? changedPhone : null,
            Role: changedRole ? changedRole : null,
            Status: changedStatus ? changedStatus : data.Status,
            Username: changedUsername ? changedUsername : null,
            AgentID: {
                C35: changedAgentC35 ? changedAgentC35 : null,
                C32: changedAgentC32 ? changedAgentC32 : null,
                B32: changedAgentB32 ? changedAgentB32 : null,
                B2: changedAgentB2 ? changedAgentB2 : null
            }
        };
        console.log(id);
        userDocRef.doc(id).update(postData);

    });

}


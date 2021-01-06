// Firebase Collections
var user = firebase.auth().currentUser;
var db = firebase.firestore();

// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        // Other way around
        db.collection("users").doc(user.uid).get().then(function (doc) {
            var c32 = doc.data().AgentId.C32;
            var c35 = doc.data().AgentId.C35;
            var b32 = doc.data().AgentId.B32;
            var b2 = doc.data().AgentId.B2;
            
            document.getElementById("c35ID").value = c35;
            document.getElementById("c32ID").value = c32;
            document.getElementById("b32ID").value = b32;
            document.getElementById("b2ID").value = b2;
        })
    }
})
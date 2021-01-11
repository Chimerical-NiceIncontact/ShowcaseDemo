// Variable declaration
var signupForm = document.querySelector('#signup-form'),
    db = firebase.firestore(),
    user = firebase.auth().currentUser;

// Listen for singup
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    var userId = "User03"; 
    const formName = signupForm['inputName'].value;
    const formEmail = signupForm['inputEmail'].value;
    const formPassword = signupForm['inputPassword'].value;
    
    // sign up the user
    auth.createUserWithEmailAndPassword(formEmail,formPassword).then(cred => {
        console.log(cred.user);
        // Create user in firestore
        db.collection('users').doc(cred.user.uid).set({
            Name: formName,
            Email: formEmail,
            Role: "Signup",
            Username: "Signup",
            Phone: "0000000000",
            Status: "Inactive",
            AgentID: {
                "C35": "123456",
                "C32": "123456",
                "B32": "123456",
                "B2": "123456"
            }  
        })
        var userRef = db.collection('users').doc(user.uid).get().then(function (event) {
            var data = doc.data();
            console.log("if here and no error: "+ data);
        })
        
        
        //window.location.href = "../../../index.html";
    })    
});
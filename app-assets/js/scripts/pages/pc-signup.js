var signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    var userId = "User03"; 
    const formName = signupForm['inputName'].value;
    const formEmail = signupForm['inputEmail'].value;
    const formPassword = signupForm['inputPassword'].value;
    
    // sign up the user
    auth.createUserWithEmailAndPassword(formEmail,formPassword).then(cred => {
        console.log(cred.user);
        
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
        console.log("if here and no error, you fucked.");
        
        window.location.href = "../../../index.html";
    })    
});
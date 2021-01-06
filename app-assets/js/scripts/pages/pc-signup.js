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
        window.location.href = "../../../index.html";
    })    
});
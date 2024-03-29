//login
const loginForm = document.querySelector('#auth-login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get user info
    const username = loginForm['user-name'].value;
    const password = loginForm['user-password'].value;
    
    auth.signInWithEmailAndPassword(username, password).then(cred => {
        console.log(cred.user);
        //window.location.href = "/ShowcaseDemo"
        //window.location.href = "index.html";
        window.location.href = "html/ltr/vertical-menu-template-dark/pc-app-launch.html"
    })
})

/* listen for auth status changes
auth.onAuthStateChanged(user => {
    if(user) {
        console.log('user logged in: ', user);
    } else {      
        console.log('user logged out');
    }
});
*/
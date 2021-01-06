// Logout option
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log("This user has logged out");
    });
});

// listen for auth status changes
auth.onAuthStateChanged(user => {
    if(user) {
        console.log('user logged in: ', user);
        
    } else {
        window.stop();
        window.location.href = "html/ltr/vertical-menu-template-dark/pc-auth-login.html";
        console.log('user logged out');
    }
});
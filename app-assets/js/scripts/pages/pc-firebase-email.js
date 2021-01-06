// Rename to PC-Notification.js
//=================================

// Notification searching
var notifRef = firebaseRef.child("Notifications");
notifRef.once("value").then(function (snapshot) {
    var data = snapshot.val();
    for (let i in data) {
        console.log(data[i]);
        document.getElementById("notificationList").innerHTML += '<a class="d-flex justify-content-between" href="javascript:void(0)"><div class="media d-flex align-items-start"><div class="media-left"><i class="feather ' + data[i].notification_icon + ' font-medium-5 ' + data[i].notification_type + '"></i></div><div class="media-body"><h6 class="' + data[i].notification_type + ' media-heading">' + data[i].heading + '</h6><small class="notification-text">' + data[i].text + '</small></div><small><time class="media-meta" datetime="' + data[i].date + '">9 hours ago</time></small></div></a>';
    }
    // Notification Var Setup
    var numOfNotif = snapshot.numChildren();

    // Console Testing
    console.log("Number of Notifications: " + numOfNotif);


    //Notification: Basic Dynamic Data Distribution
    document.getElementById("numberOfNotif").innerHTML = numOfNotif + " New";
    document.getElementById("numNotifTag").innerHTML = numOfNotif;

});
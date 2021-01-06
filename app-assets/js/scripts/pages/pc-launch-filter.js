// Filter Phone
document.getElementById("phone-label").addEventListener("click", function (event) {
    //if()
    var list = document.getElementsByClassName('phone-call-tag');
    for (var i = 0; i < list.length; i++) {
        list[i].style.display = 'none';
    }
});

// Filter Phone
document.getElementById("phone-label").addEventListener("click", function (event) {
    //if()
    $("li.phone-call-tag").not("")
});

// Filter Chat
document.getElementById("chat-label").addEventListener("click", function (event) {
    //if()
    var list = document.getElementsByClassName('chat-tag');
    for (var i = 0; i < list.length; i++) {
        list[i].style.display = 'none';
    }
});

// Filter Email
document.getElementById("email-label").addEventListener("click", function (event) {
    //if()
    var list = document.getElementsByClassName('email-tag');
    for (var i = 0; i < list.length; i++) {
        list[i].style.display = 'none';
    }
});

// Filter SMS
document.getElementById("sms-label").addEventListener("click", function (event) {
    //if()
    var list = document.getElementsByClassName('sms-tag');
    for (var i = 0; i < list.length; i++) {
        list[i].style.display = 'none';
    }
});

// Filter DFO
document.getElementById("dfo-label").addEventListener("click", function (event) {
    //if()
    var list = document.getElementsByClassName('dfo-tag');
    for (var i = 0; i < list.length; i++) {
        list[i].style.display = 'none';
    }
});

// Sidebar Reporting View
$('#Reporting-View').on('click', function (e) {
    if ($("div#launch-chats").closest(".email-app-details").hasClass('show')) {
        $("div#launch-chats").closest(".email-app-details").toggleClass('show');
    } else if ($("div#launch-emails").closest(".email-app-details").hasClass('show')) {
        $("div#launch-emails").closest(".email-app-details").toggleClass('show');
    } else if ($("div#launch-sms").closest(".email-app-details").hasClass('show')) {
        $("div#launch-sms").closest(".email-app-details").toggleClass('show');
    } else if ($("div#launch-dfo").closest(".email-app-details").hasClass('show')) {
        $("div#launch-dfo").closest(".email-app-details").toggleClass('show');
    } else if ($("div#launch-phone-call").closest(".email-app-details").hasClass('show')) {
        $("div#launch-phone-call").closest(".email-app-details").toggleClass('show');
    }else {
        
    }
    
});

// Sidebar Phone
$('#phone-launch-btn').on('click', function (e) {
    if ($("div#launch-chats").closest(".email-app-details").hasClass('show')) {
        $("div#launch-chats").closest(".email-app-details").toggleClass('show');
    } else if ($("div#launch-emails").closest(".email-app-details").hasClass('show')) {
        $("div#launch-emails").closest(".email-app-details").toggleClass('show');
    } else if ($("div#launch-sms").closest(".email-app-details").hasClass('show')) {
        $("div#launch-sms").closest(".email-app-details").toggleClass('show');
    } else if ($("div#launch-dfo").closest(".email-app-details").hasClass('show')) {
        $("div#launch-dfo").closest(".email-app-details").toggleClass('show');
    } else {
    $("div#launch-phone-call").closest(".email-app-details").toggleClass('show');
    }
});

// Sidebar Chat
$('#chat-launch-btn').on('click', function (e) {
    if ($("div#launch-phone-call").closest(".email-app-details").hasClass('show')) {
        $("div#launch-phone-call").closest(".email-app-details").toggleClass('show');
    } else if ($("div#launch-emails").closest(".email-app-details").hasClass('show')) {
        $("div#launch-emails").closest(".email-app-details").toggleClass('show');
    } else if ($("div#launch-sms").closest(".email-app-details").hasClass('show')) {
        $("div#launch-sms").closest(".email-app-details").toggleClass('show');
    } else if ($("div#launch-dfo").closest(".email-app-details").hasClass('show')) {
        $("div#launch-dfo").closest(".email-app-details").toggleClass('show');
    }
    $("div#launch-chats").closest(".email-app-details").toggleClass('show');
});

// Sidebar Email
$('#email-launch-btn').on('click', function (e) {
    if ($("div#launch-phone-call").closest(".email-app-details").hasClass('show')) {
        $("div#launch-phone-call").closest(".email-app-details").toggleClass('show');
    } else if ($("div#launch-chats").closest(".email-app-details").hasClass('show')) {
        $("div#launch-chats").closest(".email-app-details").toggleClass('show');
    } else if ($("div#launch-chats").closest(".email-app-details").hasClass('show')) {
        $("div#launch-chats").closest(".email-app-details").toggleClass('show');
    } else if ($("div#launch-sms").closest(".email-app-details").hasClass('show')) {
        $("div#launch-sms").closest(".email-app-details").toggleClass('show');
    } else if ($("div#launch-dfo").closest(".email-app-details").hasClass('show')) {
        $("div#launch-dfo").closest(".email-app-details").toggleClass('show');
    }
    $("div#launch-emails").closest(".email-app-details").toggleClass('show');
});

// Sidebar SMS
$('#sms-launch-btn').on('click', function (e) {
    if ($("div#launch-phone-call").closest(".email-app-details").hasClass('show')) {
        $("div#launch-phone-call").closest(".email-app-details").toggleClass('show');
    } else if ($("div#launch-chats").closest(".email-app-details").hasClass('show')) {
        $("div#launch-chats").closest(".email-app-details").toggleClass('show');
    } else if ($("div#launch-chats").closest(".email-app-details").hasClass('show')) {
        $("div#launch-chats").closest(".email-app-details").toggleClass('show');
    } else if ($("div#launch-emails").closest(".email-app-details").hasClass('show')) {
        $("div#launch-emails").closest(".email-app-details").toggleClass('show');
    } else if ($("div#launch-dfo").closest(".email-app-details").hasClass('show')) {
        $("div#launch-dfo").closest(".email-app-details").toggleClass('show');
    }
    $("div#launch-sms").closest(".email-app-details").toggleClass('show');
});

// Sidebar DFO
$('#dfo-launch-btn').on('click', function (e) {
    if ($("div#launch-phone-call").closest(".email-app-details").hasClass('show')) {
        $("div#launch-phone-call").closest(".email-app-details").toggleClass('show');
    } else if ($("div#launch-chats").closest(".email-app-details").hasClass('show')) {
        $("div#launch-chats").closest(".email-app-details").toggleClass('show');
    } else if ($("div#launch-chats").closest(".email-app-details").hasClass('show')) {
        $("div#launch-chats").closest(".email-app-details").toggleClass('show');
    } else if ($("div#launch-emails").closest(".email-app-details").hasClass('show')) {
        $("div#launch-emails").closest(".email-app-details").toggleClass('show');
    } else if ($("div#launch-sms").closest(".email-app-details").hasClass('show')) {
        $("div#launch-sms").closest(".email-app-details").toggleClass('show');
    }
    $("div#launch-dfo").closest(".email-app-details").toggleClass('show');
    // Math for current time
    var d = new Date();
    var ampm = d.getHours >= 12 ? 'am' : 'pm';
    var b12 = d.getHours();
    var a12 = d.getHours() - 12;
    var hours = d.getHours >= 12 ? b12 : a12;
    // Math for current date
    var currentDay = d.getDate();
    var currentMonth = d.toLocaleString('default', {
        month: 'long'
    });
    var currentYear = d.getFullYear();
    // Display current time
    document.getElementById("currentTime").innerHTML = hours + ":" + d.getMinutes() + " " + ampm;
    document.getElementById("currentDate").innerHTML = currentDay + " " + currentMonth + " " + currentYear;

});

// MailTo Email
$("button#email-submit").on("click", function() {
    var toAddress = $("input#emailTo").val();
    var eSubject = $("input#emailSubject").val();
    var eCC = $("input#emailCC").val();
    var eBody = $("div#emailBody").val();
    $(".email-submit").attr("onClick", "mailTo:" + toAddress + "?cc=" + eCC + "&" + eSubject);
    console.log("did this work?");
});


$("button#refreshButton").on("click", function(){
    window.location.reload();
});


// Firebase Collections
var user = firebase.auth().currentUser;
var db = firebase.firestore();

// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        // Other way around
        db.collection("users").doc(user.uid).get().then(function (doc) {
            console.log(doc.data().AgentID.C35);
            var c32 = doc.data().AgentID.C32;
            var b32 = doc.data().AgentID.B32;
            var c35 = doc.data().AgentID.C35;
            var b2 = doc.data().AgentID.B2;

            var idBU = '';
            for (x = 0; x < 2; x++) {
                for (let i in doc.data().AgentID) {
                    idBU = doc.data().AgentID[i];
                    //console.log();
                    //document.getElementById("cxoneOpt").innerHTML += '<option value="' + doc.data().AgentID[i] + '"class="buID" data-icon="feather icon-folder">' + idBU + '</option>';
                    document.getElementsByClassName('cxoneOpt')[x].innerHTML += '<option value="' + doc.data().AgentID[i] + '"class="buID" data-icon="feather icon-folder">' + idBU + '</option>';

                }
            }

            // Phone Submit Actions
            $("button#phone-submit").on("click", function (e) {
                console.log("button clicked");
                var phoneNum = $("input.phoneNum").val();
                var firstName = $("input.firstName").val();
                var contactReason = $("input.contactReason").val();
                var agentId = $("#select2-icons option:selected").val();
                // Get Right URL
                if (c32.localeCompare(agentId) === 0) {
                    $(function () {
                        $('#hiddenpagec32').load("https://home-c32.nice-incontact.com/inContact/Manage/Scripts/Spawn.aspx?scriptName=ChimericalCorporation%5cChimericalClickToCall&bus_no=4596619&scriptId=84257682&skill_no=4020410&p1=" + firstName + "&p2=" + phoneNum + "&p3=" + agentId + "&p4=now&p5=&Guid=06b1144c-fdc3-48ab-9064-a71a8b87bc8c");
                    });
                    //window.open("https://home-c32.nice-incontact.com/inContact/Manage/Scripts/Spawn.aspx?scriptName=ChimericalCorporation%5cChimericalClickToCall&bus_no=4596619&scriptId=84257682&skill_no=4020410&p1=" + firstName + "&p2=" + phoneNum + "&p3=" + agentId + "&p4=&p5=&Guid=06b1144c-fdc3-48ab-9064-a71a8b87bc8c");
                } else if (b32.localeCompare(agentId) === 0) {
                    window.open("https://home-b32.nice-incontact.com/inContact/Manage/Scripts/Spawn.aspx?scriptName=ChimericalCorporation%5cChimericalClickToCall&bus_no=4597359&scriptId=84182749&skill_no=4134464&p1=" + firstName + "&p2=" + phoneNum + "&p3=" + agentId + "&p4=&p5=&Guid=b59f7304-949d-4f2f-bb86-359e7e24380e");

                } else if (c35.localeCompare(agentId) === 0) {
                    $(function () {
                        $('#hiddenpagec32').load("https://home-c35.nice-incontact.com/inContact/Manage/Scripts/Spawn.aspx?scriptName=ChimericalCorporation%5cChimericalClickToCall&bus_no=4600195&scriptId=83860392&skill_no=10558412&p1=" + firstName + "&p2=" + phoneNum + "&p3=" + agentId + "&p4=now&p5=&Guid=b59f7304-949d-4f2f-bb86-359e7e24380e");
                    });
                }

                console.log("Chosen Option: " + agentId);

            });
            // Chat Submit Actions
            $("button#chat-submit").on("click", function (e) {
                console.log("button clicked");
                var emailAdd = $("input.emailAdd").val();
                var firstName = $("input.firstName").val();
                var contactReason = $("input.contactReason").val();
                var agentId = $("#select2-icons2 option:selected").val();
                // Get Right URL
                if (c32.localeCompare(agentId) === 0) {
                    window.open("https://home-c32.nice-incontact.com/inContact/Manage/Scripts/Spawn.aspx?scriptName=ChimericalCorporation%5cChimericalClickToCall&bus_no=4596619&scriptId=84257682&skill_no=4020410&p1=" + firstName + "&p2=" + emailAdd + "&p3=" + agentId + "&p4=&p5=&Guid=06b1144c-fdc3-48ab-9064-a71a8b87bc8c");
                } else if (c35.localeCompare(agentId) === 0) {
                    window.open("https://home-c35.nice-incontact.com/incontact/chatclient/chatclient.aspx?poc=2c28d967-872c-4940-9fa4-89b3c6d181dd&bu=4600195&p1=" + firstName + "&p2=" + emailAdd + "&p3=" + agentId + "&p4=&p5=&Guid=06b1144c-fdc3-48ab-9064-a71a8b87bc8c");
                }
                console.log("Chosen Option: " + agentId);


            });
        });


    } else {

    }
});

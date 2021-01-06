
/****** inContact Business Unit Configuration Settings ********
This section to be completed by inContact Professional Services
**************************************************************/

// Partner Name - this will be used in the
var partnerName = 'CXone'

// This is the inbound POC that uses the Inbound_IVR script
var phonePOC = 8449281394

// This is the Chat POC URL that uses the Inbound_Chat script
var chatURL = 'https://home-c32.nice-incontact.com/incontact/chatclient/chatclient.aspx?poc=4e36a2ac-253e-4c2d-bda4-d506a7c3e3bc&bu=4596619'

// This is the Email POC that uses the Inbound_Email script
var emailPOC = 'chimericalcorporation0@gmail.com'

// **Important** Make sure your URL is using encryption (https) This is the Spawn Script URL for the Inbound_IVR script
var phoneURL = 'https://home-b32.nice-incontact.com/inContact/Manage/Scripts/Spawn.aspx?scriptName=Demo%20Portal\Inbound_IVR&bus_no=4598817&scriptId=26888234&skill_no=4136556&p1=&p2=&p3=&p4=&p5=&Guid=a425c182-db20-4e0c-a99a-4b374f97ad1e'

/************* Do not modify anything below *******************
     Doing so will cause the page to function incorrectly
**************************************************************/
var userValid;
var displayPOC;
var phoneValid;
var finalResult = '';
var bodyVar = 'I need some support please.';
var subject;

function loadFunction() {
   if (agentID > 0 ) {
	document.getElementById("agentField").defaultValue= +agentID;
	document.getElementById("agentField").type='hidden';

	}
	if (phoneNum > 999999999 ) {
	document.getElementById("phoneField").defaultValue= +phoneNum;
	}
	result.textContent = finalResult;
	document.title = partnerName + ' Demo Portal';
}
window.onload = loadFunction


function buildURL(theAction) {
var userValid = 0;
var phoneValid = 0;
var finalResult = '';

var agentField = document.getElementById('agentField').value;
var result = document.getElementById('result');

if (agentField.length < 1) {
finalResult = 'AgentID must be entered.';
}
else {
	if (agentField.length < 6) {
	finalResult = 'AgentID will be 6-7 digits';
	}

	else if (isNaN(agentField) == true){
		finalResult = 'AgentID must be numerical.';
	}
	else {
		agentID = document.getElementById('agentField').value;
		subject = 'Help with case ' + document.getElementById('agentField').value;
		userValid = 1;
	}
}
if (userValid == 1) {

  //Phone logic
     if (theAction == 'phone') {

		phoneNum = document.getElementById('phoneField').value;

		if (phoneNum.length > 9)  {
		phoneValid = 1;



					//var theURL = location.href;
			var actionURL = 'https://home-b32.nice-incontact.com/inContact/Manage/Scripts/Spawn.aspx?scriptName=Demo%20Portal%5CInbound_IVR&bus_no=4598817&scriptId=26888234&skill_no=4136556&p1=&p2=&p3=&p4=&p5=&Guid=a425c182-db20-4e0c-a99a-4b374f97ad1e'

			ctdURL = actionURL;
			ctdURL += '&p1='
			ctdURL += agentID
			ctdURL += '&p2='
			ctdURL += phonePOC
			ctdURL += '&p3='
			ctdURL += phoneNum
			ctdURL += '&p4='
			ctdURL += partnerName

			//Build form
			var myform = document.createElement("form");
            myform.action = ctdURL;
			myform.target = "_blank";
            myform.method = "post";
            document.body.appendChild(myform);
			//myform.submit();


			ChatWindow = window.open(ctdURL,"Chat","location=0,menu=0,resize=0,status=0,scrollbars=0,width=1,height=1,left=111000,top=111000");
			setTimeout(function() {ChatWindow.close();},1250);

		//document.getElementById('phoneLink').click();

		finalResult =  'Dialing ' + phoneNum;

		}
		else {
			finalResult = 'Please enter a valid phone number';
		}

	}

	//Email logic
   else if (theAction == 'email') {
	document.getElementById('emailLink').click();
	finalResult =  'Creating Email...';
}

	//Chat logic
	else if (theAction == 'chat') {

	openURL = chatURL;
	openURL += '&p1=' + agentID

	document.getElementById('chatLink').click();

	finalResult =  'Opening Chat session...';

	}

	//Advanced Chat logic
	else if (theAction == 'advancedChat') {

	openURL = bankURL;
	openURL += '&p1=' + agentID
	document.getElementById('bankLink').click();

	openURL = spawnURL;
	openURL += '&p1=' + agentID
	document.getElementById('spawnLink').click();



	finalResult =  'Opening Chat session...';

	}

}
result.textContent = finalResult;

}

function sendFeedback() {
	document.getElementById('feedbackLink').click();
	finalResult =  'Creating Feedback Email...';
	result.textContent = finalResult;
}

function showInboundPOC() {
	var POC = phonePOC.toString();
	if (POC.length == 10) {
	var p1 = POC.substring(0, 3);
	var p2 = POC.substring(3, 6);
	var p3 = POC.substring(6, 10);
	displayPOC = '(' + p1 + ') ' + p2 + '-' + p3;
	}
	else {
		displayPOC = POC;
	}
	finalResult =  'Call ' + displayPOC + ' to test inbound IVR';
	result.textContent = finalResult;
}

function clearContext() {
	finalResult =  '';
	result.textContent = finalResult;
}

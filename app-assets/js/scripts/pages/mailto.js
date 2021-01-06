// Mailto Function
function mailto() {
    var toAddress = $("input#emailTo").val();
    var eSubject = $("input#emailSubject").val();
    var eCC = $("input#emailCC").val();
    var eBody = $("textarea#emailBody").val();
    window.location.href = "mailto:" + toAddress + "?cc=" + eCC + "&subject=" + eSubject + "&body=" + eBody;
};

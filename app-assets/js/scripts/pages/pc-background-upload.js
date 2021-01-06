/*****************************************************
 *               ReadURL Function for Background      *
 *****************************************************/
document.getElementById('getval').addEventListener('change', readURL, true);

function readURL() {
    var file = document.getElementById("getval").files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        document.getElementById('background').style.backgroundImage = "url(" + reader.result + ")";
        var x1 = document.getElementById('contentCustom');
        if (x1.style.display === "none") {
            x1.style.display = "block";
        } else {
            x1.style.display = "none";
        }
    }
    if (file) {
        reader.readAsDataURL(file);
    } else {}
}

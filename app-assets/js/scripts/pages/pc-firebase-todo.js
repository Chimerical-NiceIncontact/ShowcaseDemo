// Renaming to Task.js
//==============================
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
console.log(uuidv4());

// Task Updating
var todoRef = firebaseRef.child("Todo");
todoRef.once("value").then(function (snapshot) {
    var data = snapshot.val();
    for (let i in data) {
        console.log(data[i]);
        console.log(data[i].TaskLabels);
        document.getElementById("todoList").innerHTML += '<li class="todo-item" data-toggle="modal" data-target="#editTaskModal"><div class="todo-title-wrapper d-flex justify-content-between mb-50" >       <div class="todo-title-area d-flex align-items-center" ><div class="title-wrapper d-flex" ><div class="vs-checkbox-con" ><input type="checkbox" ><span class="vs-checkbox vs-checkbox-sm"><span class="vs-checkbox--check"><i class = "vs-icon feather icon-check"></i></span></span></div><h6 class="todo-title mt-50 mx-50">' + data[i].TaskTitle + '</h6></div><div class="chip-wrapper" id="addChips' + i + '">';
        for (let k in data[i].TaskLabels) {
            document.getElementById("addChips" + i).innerHTML += '<div class="chip mb-0"><div class="chip-body"><span class="chip-text" data-value="' + data[i].TaskLabels[k] + '"><span class="bullet bullet-primary bullet-xs"></span>' + data[i].TaskLabels[k] + '</span></div></div>';
            console.log(k);
        };
        document.getElementById("todoList").lastElementChild.innerHTML += '<div class="float-right todo-item-action d-flex"><a class="todo-item-info success"><i class="feather icon-info"></i></a><a class="todo-item-favorite warning"><i class="feather icon-star"></i></a><a class="todo-item-delete"><i class="feather icon-trash"></i></a></div></div><p class="todo-desc truncate mb-0">' + data[i].TaskBody + '</p></li>';
    }
});

var title, text;

document.getElementById("taskUpload").addEventListener("click", function (event) {
    title = document.getElementById("TitleStuff").value;
    text = document.getElementById("textStuff").value;
    firebase.database().ref('Todo/' + uuidv4()).update({
        TaskTitle: title,
        TaskBody: text
    });
    console.log("This either worked or it didn't")
});

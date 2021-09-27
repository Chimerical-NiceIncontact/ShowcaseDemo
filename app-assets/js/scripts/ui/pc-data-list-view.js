/*=========================================================================================
    File Name: data-list-view.js
    Description: List View
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
$.holdReady(true);
// Firestore Variables
var db = firebase.firestore();
const userDocRef = db.collection('users');

userDocRef.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
        //console.log(doc.id, " => ", doc.data())
        if (doc.data().Status == "Active") {
            var chipColor = "success";
        } else if (doc.data().Status == "Inactive") {
            var chipColor = "warning";
        } else if (doc.data().Status == "Test") {
            var chipColor = "cxone";
        }
        document.getElementById("user-list-view").innerHTML += '<tr class="' + doc.id + '"><td></td><td class="user-name">' + doc.data().Name + '</td><td class="user-username">' + doc.data().Username + '</td><td class="user-category">' + doc.data().Role + '</td><td><div class="chip chip-' + chipColor + '"><div class="chip-body"><div class="chip-text">' + doc.data().Status + '</div></div></div></td><td class="product-action"><span class="action-edit"><i class="feather icon-edit"></i></span><span class="action-delete"><i class="feather icon-trash"></i></span></td></tr>'
    })
    $.holdReady(false);
})

$(document).ready(function () {
    "use strict"
    // init list view datatable
    var dataListView = $(".data-list-view").DataTable({
        responsive: false,
        columnDefs: [
            {
                orderable: true,
                targets: 0,
                checkboxes: {
                    selectRow: true
                }
      }
    ],
        dom: '<"top"<"actions action-btns"B><"action-filters"lf>><"clear">rt<"bottom"<"actions">p>',
        oLanguage: {
            sLengthMenu: "_MENU_",
            sSearch: ""
        },
        aLengthMenu: [[4, 10, 15, 20], [4, 10, 15, 20]],
        select: {
            style: "multi"
        },
        order: [[1, "asc"]],
        bInfo: false,
        pageLength: 4,
        buttons: [
            {
                text: "<i class='feather icon-plus'></i> Add New",
                action: function () {
                    $(this).removeClass("btn-secondary")
                    $(".add-new-data").addClass("show")
                    $(".overlay-bg").addClass("show")
                    $("#data-name, #data-price").val("")
                    $("#data-category, #data-status").prop("selectedIndex", 0)
                },
                className: "btn-outline-cxone user-new"
      }
    ],
        initComplete: function (settings, json) {
            $(".dt-buttons .btn").removeClass("btn-secondary")
        }
    });

    dataListView.on('draw.dt', function () {
        setTimeout(function () {
            if (navigator.userAgent.indexOf("Mac OS X") != -1) {
                $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
            }
        }, 50);
    });

    // init thumb view datatable
    var dataThumbView = $(".data-thumb-view").DataTable({
        responsive: false,
        columnDefs: [
            {
                orderable: true,
                targets: 0,
                checkboxes: {
                    selectRow: true
                }
      }
    ],
        dom: '<"top"<"actions action-btns"B><"action-filters"lf>><"clear">rt<"bottom"<"actions">p>',
        oLanguage: {
            sLengthMenu: "_MENU_",
            sSearch: ""
        },
        aLengthMenu: [[4, 10, 15, 20], [4, 10, 15, 20]],
        select: {
            style: "multi"
        },
        order: [[1, "asc"]],
        bInfo: false,
        pageLength: 4,
        buttons: [
            {
                text: "<i class='feather icon-plus'></i> Add New",
                action: function () {
                    $(this).removeClass("btn-secondary")
                    $(".add-new-data").addClass("show")
                    $(".overlay-bg").addClass("show")
                },
                className: "btn-outline-cxone user-new"
      }
    ],
        initComplete: function (settings, json) {
            $(".dt-buttons .btn").removeClass("btn-secondary")
        }
    })

    dataThumbView.on('draw.dt', function () {
        setTimeout(function () {
            if (navigator.userAgent.indexOf("Mac OS X") != -1) {
                $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
            }
        }, 50);
    });

    // To append actions dropdown before add new button
    var actionDropdown = $(".actions-dropodown")
    actionDropdown.insertBefore($(".top .actions .dt-buttons"))


    // Scrollbar
    if ($(".data-items").length > 0) {
        new PerfectScrollbar(".data-items", {
            wheelPropagation: false
        })
    }

    // Close sidebar
    $(".hide-data-sidebar, .cancel-data-btn, .overlay-bg").on("click", function () {
        $(".add-new-data").removeClass("show")
        $(".overlay-bg").removeClass("show")
        $("#data-name, #data-email, #data-phone, #data-c35, #data-c32, #data-b32, #data-b2").val("")
        $("#data-role").prop("selectedIndex", 0)
        location.reload();
    })



    // Print Action
    $('#list-print').on("click", function (e) {
        // Actions on page as whole
        var printContents = document.getElementById('DataTables_Table_0').innerHTML;
        var beginningAddon = '<div class="table-responsive"><table class="table data-list-view">';
        var endingAddon = '</table></div>';
        var originalContents = document.body.innerHTML;

        //console.log(printContents);
        document.body.innerHTML = beginningAddon + printContents + endingAddon;
        window.print();
        document.body.innerHTML = originalContents;
    });

    // Var Declarations for Edit and Delete
    var deleteReq = "false";

    // On Delete
    $('.action-delete').on("click", function (e) {
        e.preventDefault();
        deleteReq = true;
        $('#default').modal('toggle');
        var locationDelete = $(this).closest('td').parent('tr');

        // Check if we want to do this or not Modal
        $("#change-acceptance").click(function () {
            locationDelete.fadeOut();
        });
    });

    // On Edit
    $('.action-edit').on("click", function (e) {
        e.stopPropagation();

        // Grab UID from class of tabled info
        var className = $(this).closest('td').parent('tr').attr("class");
        console.log(className);

        //var classID = className.substr(className.indexOf(' ') + 1 );
        var classID = className.split(" ");
        var userDocRef = db.collection("users");
        async function getDoc(id) {
            const snapshot = await db.collection('users').doc(id).get();
            const data = snapshot.data();
            var switchChange = false;
            var switchRef = document.getElementById("customSwitch100").hasAttribute("checked");
            console.log(data.AgentID.C35);

            // Use UID to grab relevant information

            $('#data-name').val(data.Name);
            $('#data-email').val(data.Email);
            $('#data-phone').val(data.Phone);
            $('#data-username').val(data.Username);
            $('#data-c35').val(data.AgentID.C35);
            $('#data-c32').val(data.AgentID.C32);
            $('#data-b32').val(data.AgentID.B32);
            $('#data-b2').val(data.AgentID.B2);
            $(".add-new-data").addClass("show");
            $(".overlay-bg").addClass("show");

            // Check status for switch
            if (data.Status == "Active") {
                console.log(data.Status);
                $('#customSwitch100').attr('checked', 'checked');
            } else if (data.Status == "Inactive") {
                console.log(data.Status);
                $('#customSwitch100').removeAttr('checked');
            }

            // Check for data change ** AGENT ID **    
            var changeName,
                changeEmail,
                changePhone,
                changeRole,
                changeUsername,
                changeName = (changeEmail = changePhone = changeRole = changeUsername = false);
            var customStatus = "";
            var changeAgentC35,
                changeAgentC32,
                changeAgentB32,
                changeAgentB2 = (changeAgentC35 = changeAgentC32 = changeAgentB32 = changeAgentB2 = false);

            // Changed checked att when switch is pressed
            $('#customSwitch100').click(function () {
                var switchRefCheck = document.getElementById("customSwitch100").hasAttribute("checked");
                if (switchRefCheck == true) {
                    $('#customSwitch100').removeAttr('checked');
                    customStatus = "Inactive";
                } else if (switchRefCheck == false) {
                    $('#customSwitch100').attr('checked', 'checked');
                    customStatus = "Active";
                }
            });

            // Create New User
            $(".user-new").click(function () {
                console.log("Button clicked");
                // Add data validation
                $("#data-name").addClass("is-invalid");

                /* Add User to Auth Database
                auth.createUserWithEmailAndPassword(formEmail, formPassword).then(cred => {
                    console.log(cred.user);
                    window.location.href = "../../../index.html";
                })
                */

            });

            $("form#checkerForm").on("change", ":input", function (e) {
                //':input' selector get all form fields even textarea, input, or select
                window[$(this).attr("name")] = true;
                console.log($(this).attr("name"));
            });

            // Upload stuff to db
            $("#change-acceptance").click(function () {
                if (deleteReq === true) {
                    $('#default').modal('toggle');
                    $(this).closest('td').parent('tr').fadeOut();
                }
                // User Info
                var changedName = $('#data-name').val();
                var changedEmail = $('#data-email').val();
                var changedPhone = $('#data-phone').val();
                var changedRole = $('#data-role').val();
                var changedUsername = $('#data-username').val();
                var changedStatus = customStatus;

                // Agent ID
                var changedAgentC35 = $('#data-c35').val();
                var changedAgentC32 = $('#data-c32').val();
                var changedAgentB32 = $('#data-b32').val();
                var changedAgentB2 = $('#data-b2').val();

                // POST
                var postData = {
                    Name: changedName ? changedName : null,
                    Email: changedEmail ? changedEmail : null,
                    Phone: changedPhone ? changedPhone : null,
                    Role: changedRole ? changedRole : null,
                    Status: changedStatus ? changedStatus : data.Status,
                    Username: changedUsername ? changedUsername : null,
                    AgentID: {
                        C35: changedAgentC35 ? changedAgentC35 : null,
                        C32: changedAgentC32 ? changedAgentC32 : null,
                        B32: changedAgentB32 ? changedAgentB32 : null,
                        B2: changedAgentB2 ? changedAgentB2 : null
                    }
                };
                userDocRef.doc(id).update(postData).then(function () {
                    console.log("Document successfully updated!");
                    //console.log(postData);
                    location.reload();
                }).catch(function (error) {
                    // The document probably doesnt exists
                    console.error("Error updating document: ", error);
                });


            });

            // Testing Logs
            console.log(data.Name);
        }
        // Call Data Function
        getDoc(classID[0]);

        // Testing Logs
        console.log(classID[0]);

    });

    // mac chrome checkbox fix
    if (navigator.userAgent.indexOf("Mac OS X") != -1) {
        $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
    }
})

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
        console.log(doc.id, " => ", doc.data())
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

            // Changed checked att when switch is pressed
            $('#customSwitch100').click(function () {
                var switchRefCheck = document.getElementById("customSwitch100").hasAttribute("checked");
                if (switchRefCheck == true) {
                    $('#customSwitch100').removeAttr('checked');
                    switchChange = true;
                } else if (switchRefCheck == false) {
                    $('#customSwitch100').attr('checked', 'checked');
                    switchChange = true;
                }
            });



            // Check for data change ** AGENT ID **    
            var changeC35 = false,
                changeC32 = false,
                changeB32 = false;
            var changedC35 = "",
                changedC32 = "",
                changedB32 = "";
            $("#data-c35").on("input", function () {
                console.log("Change to " + this.value);
                changeC35 = true;
                console.log(changeC35 + ":" + changeC32 + ":" + changeB32);
                changedC35 = this.value;
            });
            $("#data-c32").on("input", function () {
                console.log("Change to " + this.value);
                changeC32 = true;
                console.log(changeC35 + ":" + changeC32 + ":" + changeB32);
                changedC32 = this.value;
            });
            $("#data-b32").on("input", function () {
                console.log("Change to " + this.value);
                changeB32 = true;
                console.log(changeC35 + ":" + changeC32 + ":" + changeB32);
                changedB32 = this.value;
            });

            // Check for data change ** USER INFO **    
            var changeName = false,
                changeEmail = false,
                changePhone = false,
                changeRole = false,
                changeUsername = false;
            var changedName = "",
                changedEmail = "",
                changedPhone = "",
                changedRole = "",
                changedUsername = "";


            $("#data-name").on("input", function () {
                console.log("Change to " + this.value);
                changeName = true;
                console.log(changeName + ":" + changeEmail + ":" + changePhone);
                changedName = this.value;
            });
            $("#data-email").on("input", function () {
                console.log("Change to " + this.value);
                changeEmail = true;
                console.log(changeName + ":" + changeEmail + ":" + changePhone);
                changedEmail = this.value;
            });
            $("#data-phone").on("input", function () {
                console.log("Change to " + this.value);
                changePhone = true;
                console.log(changeName + ":" + changeEmail + ":" + changePhone);
                changedPhone = this.value;
            });
            $("#data-username").on("input", function () {
                console.log("Change to " + this.value);
                changeUsername = true;
                console.log(changeName + ":" + changeEmail + ":" + changePhone + ":" + changeRole);
                changedUsername = this.value;
            });
            $("#data-role").on("input", function () {
                console.log("Change to " + this.value);
                changeRole = true;
                console.log(changeName + ":" + changeEmail + ":" + changePhone + ":" + changeRole);
                changedRole = this.value;
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


            // Upload stuff to db
            $("#change-acceptance").click(function () {
                if (deleteReq == true) {
                    console.log("It has been deleted");
                    //userDocRef.doc(classID[0]).delete();
                }
                // If statement for user changes
                // Goes in visual order of action sub-menu 
                if (changeName == true) {
                    if (changeEmail == true) {
                        if (changePhone == true) {
                            if (changeUsername == true) {
                                if (changeRole == true) {
                                    // If all fields have been changed
                                    userDocRef.doc(classID[0]).update({
                                        "Name": changedName,
                                        "Email": changedEmail,
                                        "Phone": changedPhone,
                                        "Role": changedRole,
                                        "Username": changedUsername
                                    });
                                    // Reset All Vars
                                    changeName = false;
                                    changeEmail = false;
                                    changePhone = false;
                                    changeRole = false;
                                    changeUsername = false;

                                    // Reset Changed Values
                                    changedName = "";
                                    changedEmail = "";
                                    changedPhone = "";
                                    changedRole = "";
                                    changedUsername = "";
                                } else {
                                    // If all fields but role have been changed
                                    userDocRef.doc(classID[0]).update({
                                        "Name": changedName,
                                        "Email": changedEmail,
                                        "Phone": changedPhone,
                                        "Username": changedUsername
                                    });
                                    changeName = false;
                                    changeEmail = false;
                                    changePhone = false;
                                    changeUsername = false;
                                }
                            } else {
                                // If all fields but role and username have been changed
                                userDocRef.doc(classID[0]).update({
                                    "Name": changedName,
                                    "Email": changedEmail,
                                    "Phone": changedPhone
                                });
                                changeName = false;
                                changeEmail = false;
                                changePhone = false;
                            }
                        } else {
                            // If all fields but role, username and phone have been changed
                            userDocRef.doc(classID[0]).update({
                                "Name": changedName,
                                "Email": changedEmail
                            });
                            changeName = false;
                            changeEmail = false;
                        }
                    } else {
                        // If all fields but phone and role have been changed
                        userDocRef.doc(classID[0]).update({
                            "Name": changedName

                        });
                        changeName = false;

                    }
                    // If name hasnt been changed
                } else if (changeEmail == true) {
                    if (changePhone == true) {
                        if (changeUsername == true) {
                            if (changeRole == true) {
                                // If all but name have been changed
                                userDocRef.doc(classID[0]).update({
                                    "Email": changedEmail,
                                    "Phone": changedPhone,
                                    "Role": changedRole,
                                    "Username": changedUsername
                                });
                                changeEmail = false;
                                changePhone = false;
                                changeRole = false;
                                changeUsername = false;
                            } else {
                                // If all but name and role have been changed
                                userDocRef.doc(classID[0]).update({
                                    "Email": changedEmail,
                                    "Phone": changedPhone,
                                    "Username": changedUsername
                                });
                                changeEmail = false;
                                changePhone = false;
                                changeUsername = false;
                            }
                        } else {
                            // If only email has been changed
                            userDocRef.doc(classID[0]).update({
                                "Email": changedEmail,
                                "Phone": changedPhone
                            });
                            changeEmail = false;
                            changePhone = false;

                        }
                    } else {
                        // If only email has been changed
                        userDocRef.doc(classID[0]).update({
                            "Email": changedEmail
                        });
                        changeEmail = false;
                    }

                    // If phone, username, role changed
                } else if (changePhone == true) {
                    if (changeUsername == true) {
                        if (changeRole == true) {
                            // If only Phone and role have been changed
                            userDocRef.doc(classID[0]).update({
                                "Phone": changedPhone,
                                "Username": changedUsername,
                                "Role": changedRole
                            });
                            changePhone = false;
                            changeRole = false;
                            changeUsername = false;

                        } else {
                            // If only phone has been changed
                            userDocRef.doc(classID[0]).update({
                                "Phone": changedPhone,
                                "Username": changedUsername
                            });
                            changePhone = false;
                            changeUsername = false;

                        }
                    } else {
                        // If only phone has been changed
                        userDocRef.doc(classID[0]).update({
                            "Phone": changedPhone
                        });
                        changePhone = false;
                    }
                } else if (changeUsername == true) {
                    if (changeRole == true) {
                        // If only phone has been changed
                        userDocRef.doc(classID[0]).update({
                            "Username": changedUsername,
                            "Role": changedRole
                        });
                        changeUsername = false;
                        changeRole = false;
                    } else {
                        // If only phone has been changed
                        userDocRef.doc(classID[0]).update({
                            "Username": changedUsername
                        });
                        changeUsername = false;
                    }
                } else if (changeRole == true) {
                    // If only role has been changed
                    userDocRef.doc(classID[0]).update({
                        "Role": changedRole
                    });
                    changeRole = false;

                }
                // If statement for agent id changes
                if (changeC35 == true) {
                    //console.log(changedC35);
                    if (changeC32 == true) {
                        //console.log(changedC32);
                        if (changeB32 == true) {
                            //console.log(changedB32);
                            userDocRef.doc(classID[0]).update({
                                "AgentID.C35": changedC35,
                                "AgentID.C32": changedC32,
                                "AgentID.B32": changedB32
                            });
                            // Change Reset
                            changeC35 = false;
                            changeC32 = false;
                            changeB32 = false;
                            // Var Reset
                            changedC35 = "";
                            changedC32 = "";
                            changedB32 = "";

                        } else {
                            //console.log(changedC35 + ":" + changedC32);
                            userDocRef.doc(classID[0]).update({
                                "AgentID.C35": changedC35,
                                "AgentID.C32": changedC32
                            });
                            changeC35 = false;
                            changeC32 = false;
                            // Var Reset
                            changedC35 = "";
                            changedC32 = "";


                        }
                    } else {
                        userDocRef.doc(classID[0]).update({
                            "AgentID.C35": changedC35
                        });
                        changeC35 = false;
                        // Var Reset
                        changedC35 = "";


                    }
                } else if (changeC32 == true) {
                    //console.log(changedC32);
                    if (changeB32 == true) {
                        //console.log(changedC32 + ":" + changedB32);
                        userDocRef.doc(classID[0]).update({
                            "AgentID.C32": changedC32,
                            "AgentID.B32": changedB32
                        });
                        changeC32 = false;
                        changeB32 = false;
                        // Var Reset
                        changedC32 = "";
                        changedB32 = "";


                    } else {
                        userDocRef.doc(classID[0]).update({
                            "AgentID.C32": changedC32
                        });
                        changeC32 = false;
                        // Var Reset
                        changedC32 = "";


                    }
                } else if (changeB32 == true) {
                    //console.log(changedB32);
                    userDocRef.doc(classID[0]).update({
                        "AgentID.B32": changedB32
                    });
                    changeB32 = false;
                    // Var Reset
                    changedB32 = "";


                }

                if (switchChange == true) {
                    //console.log(switchChange);
                    var tempCheck = document.getElementById("customSwitch100").hasAttribute("checked");
                    if (tempCheck == true) {
                        //console.log(tempCheck);
                        userDocRef.doc(classID[0]).update({
                            Status: "Active"
                        });

                    } else {
                        //console.log(tempCheck);
                        userDocRef.doc(classID[0]).update({
                            Status: "Inactive"
                        });

                    }
                }

                console.log(deleteReq);
            });


            // Testing Logs
            console.log(data.Name);
        }
        // Call Data Function
        getDoc(classID[0]);

        // Testing Logs
        console.log(classID[0]);

    });


    // On Delete
    $('.action-delete').on("click", function (e) {
        e.stopPropagation();
        deleteReq = true;
        $('#default').modal('toggle');
        console.log(deleteReq);
        //$(this).closest('td').parent('tr').fadeOut();
    });

    // mac chrome checkbox fix
    if (navigator.userAgent.indexOf("Mac OS X") != -1) {
        $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
    }
})

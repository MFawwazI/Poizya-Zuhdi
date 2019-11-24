$('document').ready(function ($) {
    var username = sessionStorage.getItem('username');
    $('#username').val(username);

    if (username != '') {
        $.ajax({
            type: 'POST',
            url: '../../php/profile.php',
            data: { username: username },
            success: function (result) {
                console.log(result);
                $.each(result, function (i, field) {
                    if (field.name === null) {
                        nameprofile = field.username;
                    } else {
                        nameprofile = field.name;
                    }
                    $('#nameprofile').html(nameprofile);

                    if (field.bio === null) {
                        bio = "-";
                    } else {
                        bio = field.bio;
                    }
                    $('#bioprofile').html(bio);
                    document.getElementById("id").value = field.id;
                    document.getElementById("name").value = field.name;
                    document.getElementById("username").value = field.username;
                    document.getElementById("bio").value = field.bio;
                    document.getElementById("gender").value = field.gender;
                    document.getElementById("birthday").value = field.birthday;
                    document.getElementById("phone_number").value = field.phone_number;
                    document.getElementById("email").value = field.email;
                    document.getElementById("address").value = field.address;
                    document.getElementById("portal_code").value = field.portal_code;
                });
            }
        });
    } else {
        alert("Data not found");
    }


    $("#profile-form").validate({
        rules: {
            name: {
                required: true
            },
            username: {
                required: true
            },
            bio: {
                required: true
            },
            gender: {
                required: true
            },
            birthday: {
                required: true
            },
            phone: {
                required: true
            },
            email: {
                required: true
            },
            address: {
                required: true
            },
            portal_code: {
                required: true
            }
        },
        messages: {
            name: {
                required: "Name is required"
            },
            username: {
                required: "Username is required"
            },
            bio: {
                required: "Bio is required"
            },
            gender: {
                required: "Gender is required"
            },
            birthday: {
                required: "Birthday is required"
            },
            phone: {
                required: "Phone Number is required"
            },
            email: {
                required: "Email is required"
            },
            address: {
                required: "Address is required"
            },
            portal_code: {
                required: "Portal Code is required"
            }
        },
        errorPlacement: function (error, element) {
            $(element).closest('.form-group').find('.help-block').html(error.html());
        },
        highlight: function (element) {
            $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).closest('.form-group').removeClass('has-error');
            $(element).closest('.form-group').find('.help-block').html('');
        },
        submitHandler: submitFor
    });
});

function submitFor() {
    console.log($('#profile-form').serialize())
    $.ajax({
        type: 'POST',
        url: '../../php/edit-profile.php',
        data: $('#profile-form').serialize(),
        async: false,
        success: function (a) {
            $('#btn-changeprofile').html('&nbsp; Change Profile...').prop('disabled', true);
            $('input[type=text],input[type=email],input[type=number],input[type=date]').prop('disabled', true);
            if (a == 0) {
                $("#profile-form").trigger('reset');
                alert('An unknown error occurred, please try again later...');
            } else {
                var result = $.parseJSON(a);
                if (result.status === 'success') {
                    $('#errorDiv').slideDown('fast', function () {
                        $('#errorDiv').append('<div class="alert alert-info">' + result.message + '</div>');
                        $("#profile-form").trigger('reset');
                        $('input[type=text],input[type=email],input[type=number],input[type=date]').prop('disabled', false);
                        $('#btn-changeprofile').html('<span class="fa fa-info-circle"></span> &nbsp; Change Profile').prop('disabled', false);
                    }).delay(2000).slideUp('fast');
                    setTimeout(function () {
                        window.location.href = '../../profile.html'
                    }, 3000)
                } else {
                    $('#errorDiv').slideDown('fast', function () {
                        $('#errorDiv').append('<div class="alert alert-danger">' + result.message + '</div>');
                        $("#profile-form").trigger('reset');
                        $('input[type=text],input[type=email],input[type=number],input[type=date]').prop('disabled', false);
                        $('#btn-changeprofile').html('<span class="fa fa-info-circle"></span> &nbsp; Change Profile').prop('disabled', false);
                    }).delay(2000).slideUp('fast');
                    setTimeout(function () {
                        window.location.href = 'myProfile.html'
                    }, 3000)
                }
            }
        }
    });
}
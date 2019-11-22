$(document).ready(function ($) {
    var username = sessionStorage.getItem('username');
    $('#username').val(username);

    $("#password-form").validate({
        rules: {
            old_password: {
                required: true
            },
            new_password: {
                required: true,
                minlength: 6,
                maxlength: 20
            },
            confirm_password: {
                required: true,
                equalTo: '#new_password'
            }
        },
        messages: {
            old_password: {
                required: "Password is required"
            },
            new_password: {
                required: "New password is required",
                minlength: "Password at least have 6 characters",
                maxlength: "Password have a maximum of 20 characters"
            },
            confirm_password: {
                required: "Retype your password",
                equalTo: "Password did not match !"
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
    console.log($('#password-form').serialize())
    $.ajax({
        type: 'POST',
        url: '../../php/password.php',
        data: $('#password-form').serialize(),
        async: false,
        success: function (a) {
            $('#btn-changepwd').html('&nbsp; Change Password...').prop('disabled', true);
            $('input[type=password]').prop('disabled', true);
            if (a == 0) {
                $("#password-form").trigger('reset');
                alert('An unknown error occurred, please try again later...');
            } else {
                var result = $.parseJSON(a);
                if (result.status === 'success') {
                    $('#errorDiv').slideDown('fast', function () {
                        $('#errorDiv').append('<div class="alert alert-info">' + result.message + '</div>');
                        $("#password-form").trigger('reset');
                        $('input[type=password]').prop('disabled', false);
                        $('#btn-changepwd').html('<span class="fa fa-info-circle"></span> &nbsp; Change Password').prop('disabled', false);
                    }).delay(2000).slideUp('fast');
                    setTimeout(function () {
                        window.location.href = '../../profile.html'
                    }, 3000)
                } else {
                    $('#errorDiv').slideDown('fast', function () {
                        $('#errorDiv').append('<div class="alert alert-danger">' + result.message + '</div>');
                        $("#password-form").trigger('reset');
                        $('input[type=password]').prop('disabled', false);
                        $('#btn-changepwd').html('<span class="fa fa-info-circle"></span> &nbsp; Change Password').prop('disabled', false);
                    }).delay(2000).slideUp('fast');
                    setTimeout(function () {
                        window.location.href = 'password.html'
                    }, 3000)
                }
            }
        }
    });
}
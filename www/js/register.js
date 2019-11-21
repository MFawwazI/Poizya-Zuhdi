$(document).ready(function ($) {

    $("#register-form").validate({
        rules: {
            username: {
                required: true,
                minlength: 4
            },
            email: {
                required: true,
                remote: {
                    url: "php/check-email.php",
                    type: 'POST',
                    data: {
                        email: function () {
                            return $("#email").val();
                        }
                    }
                }
            },
            phone_number: {
                required: true,
                minlength: 8,
                maxlength: 15
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 20
            },
            cpassword: {
                required: true,
                equalTo: '#password'
            }
        },
        messages: {
            username: {
                required: "Username is required",
                minlength: "Your username is too short"
            },
            email: {
                required: "Email is required",
                remote: "Email already exists"
            },
            phone_number: {
                required: "Phone number is required",
                minlength: "Phone number at least have 8 number",
                maxlength: "Phone numbers have a maximum of 8 numbers"
            },
            password: {
                required: "Password is required",
                minlength: "Password at least have 6 characters",
                maxlength: "Password have a maximum of 20 characters"
            },
            cpassword: {
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
    var temp = $('#register-form').serialize();
    console.log($('#register-form').serialize())
    $.ajax({
        type: 'POST',
        url: 'php/register.php',
        data: $('#register-form').serialize(),
        async: false,
        success: function (a) {
            $('#btn-signup').html('&nbsp; signing up...').prop('disabled', true);
            $('input[type=text],input[type=email],input[type=number],input[type=password]').prop('disabled', true);
            if (a == 0) {
                $("#register-form").trigger('reset');
                alert('An unknown error occurred, please try again later...');
            } else {
                var result = $.parseJSON(a);
                if (result.status === 'success') {
                    $('#errorDiv').slideDown('fast', function () {
                        $('#errorDiv').append('<div class="alert alert-info">' + result.message + '</div>');
                        $("#register-form").trigger('reset');
                        $('input[type=text],input[type=email],input[type=password]').prop('disabled', false);
                        $('#btn-signup').html('<span class="fa fa-info-circle"></span> &nbsp; Sign Me Up').prop('disabled', false);
                    }).delay(2000).slideUp('fast');
                    $.ajax({
                        type: 'POST',
                        url: 'php/register-email.php',
                        data: temp,
                        error: function (xhr, status, error) {
                            console.log(xhr);
                            console.log('error');
                            var result = $.parseJSON(xhr.responseText);
                            console.log(result);
                        },
                        success: function (b) {
                            console.log(b);
                        }
                    });
                    setTimeout(function () {
                        window.location.href = 'login.html'
                    }, 3000)
                } else {
                    $('#errorDiv').slideDown('fast', function () {
                        $('#errorDiv').append('<div class="alert alert-danger">' + result.message + '</div>');
                        $("#register-form").trigger('reset');
                        $('input[type=text],input[type=email],input[type=number],input[type=password]').prop('disabled', false);
                        $('#btn-signup').html('<span class="fa fa-info-circle"></span> &nbsp; Sign Me Up').prop('disabled', false);
                    }).delay(2000).slideUp('fast');
                }
            }
        }
    });
}
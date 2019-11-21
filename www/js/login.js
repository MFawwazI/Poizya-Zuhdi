$(document).ready(function ($) {

    $("#login-form").validate({
        rules:
        {
            id: {
                required: true
                // validemail: true
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 15
            },
        },
        messages:
        {
            id: {
                required: "Username or email is required"
                // validemail: "Please enter valid username or email address"
            },
            password: {
                required: "Password is required",
                minlength: "Password at least have 6 characters"
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
        submitHandler: submitForm
    });
});

function submitForm() {
    $.ajax({
        type: 'POST',
        url: 'php/login.php',
        data: $('#login-form').serialize(),
        async: false,
        cache: false,
        error: function (xhr, status, error) {
            var result = $.parseJSON(xhr.responseText);
            console.log(result);
            $('#errorDiv').slideDown('fast', function () {
                $('#errorDiv').append('<div class="alert alert-danger">' + result.error + '</div>');
                $("#login-form").trigger('reset');
            }).delay(3000).slideUp('fast');
            setTimeout(function () {
                window.location.href = 'login.html'
            }, 3000)
        },
        success: function (result) {
            console.log(result);
            $.each(result, function (i, field) {
                if (field.status === '0') {
                    $('#errorDiv').slideDown('fast', function () {
                        $('#errorDiv').append('<div class="alert alert-info"><span class="fa fa-info-circle"></span> &nbsp; Akun anda belum di verifikasi, Silakan cek email anda </div>');
                        $("#login-form").trigger('reset');
                    }).delay(2000).slideUp('fast');
                    setTimeout(function () {
                        window.location.href = 'login.html'
                    }, 3000)
                } else {
                    sessionStorage.setItem('username', field.username);
                    window.location.href = 'dashboard.html';
                }
            });
        }
    });
}

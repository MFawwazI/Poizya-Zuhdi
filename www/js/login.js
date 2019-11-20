$('document').ready(function () {
    var eregex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    $.validator.addMethod("validemail", function (value, element) {
        return this.optional(element) || eregex.test(value);
    });

    $("#login-form").validate({
        rules:
        {
            id: {
                required: true,
                validemail: true
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 15
            },
        },
        messages:
        {
            email: {
                required: "Username or email is required",
                validemail: "Please enter valid username or email address"
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
        url: 'http://dennyfebrygo.com/poizya/www/php/login.php',
        data: $('#login-form').serialize(),
        async: false,
        cache: false,
        error: function (xhr, status, error) {
            var result = $.parseJSON(xhr.responseText);
            console.log(result);
            $('#errorDiv').slideDown('fast', function () {
                $('#errorDiv').append('<div class="alert alert-danger">' + result.error + '</div>');
                $("#login-form").trigger('reset');
            }).delay(2000).slideUp('fast');
            setTimeout(function () {
                window.location.href = 'login.html'
            }, 2000)
        },
        success: function (result) {
            console.log(result);
            $.each(result, function (i, field) {
                if (field.aktif === '0') {
                    $('#errorDiv').slideDown('fast', function () {
                        $('#errorDiv').append('<div class="alert alert-info"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Akun anda belum di verifikasi, Silakan cek email anda </div>');
                        $("#login-form").trigger('reset');
                    }).delay(2000).slideUp('fast');
                    setTimeout(function () {
                        window.location.href = 'login.html'
                    }, 2000)
                } else {
                    window.location.href = 'dashboard.html';
                    // if (field.akses === 'user') {
                    //     sessionStorage.setItem('userID', field.id.toString());
                    //     sessionStorage.setItem('userNama', field.nama);
                    //     sessionStorage.setItem('email', field.email);
                    //     sessionStorage.setItem('hakAkses', field.akses);
                    //     sessionStorage.setItem('alamat', field.alamat);
                    //     sessionStorage.setItem('no_hp', field.no_hp);
                    //     sessionStorage.setItem('merk_mobil', field.merk_mobil);
                    //     sessionStorage.setItem('model_mobil', field.model_mobil);
                    //     sessionStorage.setItem('no_kendaraan', field.no_kendaraan);
                    //     if (field.no_kendaraan != null) {
                    //         sessionStorage.setItem('a_plat', field.no_kendaraan.slice(0, -7));
                    //         sessionStorage.setItem('b_plat', field.no_kendaraan.slice(1, -3));
                    //         sessionStorage.setItem('c_plat', field.no_kendaraan.slice(-3));
                    //     }
                    //     window.location.href = 'profil.html';
                    // } else if (field.akses === 'montir') {
                    //     sessionStorage.setItem('userID', field.id.toString());
                    //     sessionStorage.setItem('userNama', field.nama);
                    //     sessionStorage.setItem('email', field.email);
                    //     sessionStorage.setItem('hakAkses', field.akses);
                    //     sessionStorage.setItem('alamat', field.alamat);
                    //     sessionStorage.setItem('no_hp', field.no_hp);
                    //     window.location.href = 'antrian.html';
                    // } else {
                    //     sessionStorage.setItem('userID', field.id.toString());
                    //     sessionStorage.setItem('userNama', field.nama);
                    //     sessionStorage.setItem('email', field.email);
                    //     sessionStorage.setItem('hakAkses', field.akses);
                    //     sessionStorage.setItem('alamat', field.alamat);
                    //     sessionStorage.setItem('no_hp', field.no_hp);
                    //     window.location.href = 'beranda.html';
                    // }
                }
            });
        }
    });
}

$('document').ready(function () {
    $('#deletecart-form').on('submit', function (e) {
        e.preventDefault();
        console.log($('#deletecart-form').serialize())
        $.ajax({
            type: 'POST',
            url: '../php/deletecart.php',
            data: $('#addcart-form').serialize(),
            async: false,
            success: function (a) {
                if (a == 0) {
                    $("#deletecart-form").trigger('reset');
                    alert('An unknown error occurred, please try again later...');
                } else {
                    var result = $.parseJSON(a);
                    if (result.status === 'success') {
                        window.location.href = '../cart/cart.html'
                    }
                }
            }
        });
    });
});
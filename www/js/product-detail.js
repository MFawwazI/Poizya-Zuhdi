$('document').ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    console.log('ID product =', urlParams.get('productID'));

    $.ajax({
        type: 'POST',
        url: 'php/product-detail.php',
        data: { ID: urlParams.get('productID') },
        error: function (xhr, status, error) {
            // console.log(xhr);
            var result = $.parseJSON(xhr.responseText);
            console.log(result);
            alert('There is an error ' + result.error);
        },
        success: function (data) {
            console.log(data);
            detail = "<div class='col-12'><img src='img/Product/" + data[0].name + ".jpg' class='product-image' alt='Product Image' /></div>";
            detail += "<div class='col-12 product-image-thumbs'>";
            detail += "<div class='product-image-thumb active'><img src='img/Product/" + data[0].name + ".jpg' alt='Product Image' /></div>";
            detail += "<div class='product-image-thumb'><img src='img/Product/" + data[0].name + ".jpg' alt='Product Image' /></div>";
            detail += "<div class='product-image-thumb'><img src='img/Product/" + data[0].name + ".jpg' alt='Product Image' /></div>";
            detail += "<div class='product-image-thumb'><img src='img/Product/" + data[0].name + ".jpg' alt='Product Image' /></div>";
            detail += "</div>";
            detail += "<h3 class='d-inline-block d-sm-none' style='padding-top: 0.5em;'>" + data[0].name + "</h3>";
            $('#detail').html(detail);

            description = data[0].description;
            $('#description').html(description);
        }
    });
});
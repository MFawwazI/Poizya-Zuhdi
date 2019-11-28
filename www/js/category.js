$('document').ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    console.log('Category Name =', urlParams.get('categoryName'));
    category = urlParams.get('categoryName');
    $('#category').html(category);
    $.ajax({
        type: 'POST',
        url: 'php/category.php',
        data: { Name: urlParams.get('categoryName') },
        error: function (xhr, status, error) {
            // console.log(xhr);
            var result = $.parseJSON(xhr.responseText);
            console.log(result);
            alert('There is an error ' + result.error);
        },
        success: function (data) {
            console.log(data);
            product = "";
            for (var i = 0; i < data.length; i++) {
                product += "<div class='card'>";
                product += "<div class='card-header border-0'>";
                product += "<a href='product/product.html?productID=" + data[i].id + "'><img class='card-img-top' src='img/Product/" + data[i].name + ".jpg' alt='product-" + data[i].name + "' /></a>";
                product += "<a class='btn btn-app favorite'>";
                product += "<i class='fas fa-heart' style='-webkit-text-stroke-color: black; color: transparent; -webkit-text-stroke-width: 1px;'></i></a></div>";
                product += "<a class='card-body' href='product/product.html?productID=" + data[i].id + "'>"
                product += "<span style='font-weight: bold; color: black;'>" + data[i].name + "</span><br>";
                var harga = parseFloat(data[i].price);
                var bil = harga;
                var number_string = bil.toString(),
                    sisanya = number_string.length % 3,
                    rupiahnya = number_string.substr(0, sisanya),
                    ribu = number_string.substr(sisanya).match(/\d{3}/g);

                if (ribu) {
                    separatornya = sisanya ? '.' : '';
                    rupiahnya += separatornya + ribu.join('.');
                }
                product += "<span style='color: black;'>Rp." + rupiahnya + "</span>";
                product += "</a>";
                product += "</div>";
            }
            $('#product_category').html(product);
        }
    });
});
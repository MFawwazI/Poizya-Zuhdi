$('document').ready(function () {
    var id = sessionStorage.getItem('id');
    $.ajax({
        type: 'POST',
        url: 'php/fav.php',
        data: { id: id },
        success: function (data) {
            console.log(data);
            if (data == null) {
                product = " There are no favorites yet";
                $('#favorite').html(product);
            } else {
                product = "";
                for (var i = 0; i < data.length; i++) {
                    product += "<div class='card'>";
                    product += "<div class='card-header border-0'>";
                    product += "<a href='product.html?productID=" + data[i].id + "'><img class='card-img-top' src='img/Product/" + data[i].name + ".jpg' alt='product-" + data[i].name + "' /></a>";
                    product += "<a href='parsing/removefavorite.html?productID=" + data[i].id + "' class='btn btn-app favorite'>";
                    product += "<i class='fas fa-heart'></i>";
                    product += "</a></div><a class='card-body' href='product.html?productID=" + data[i].id + "'>"
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
                $('#favorite').html(product);

            }

        }
    });
});
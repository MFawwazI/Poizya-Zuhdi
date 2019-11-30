$('document').ready(function () {
    var id = sessionStorage.getItem('id');
    $.ajax({
        type: 'POST',
        url: '../php/cart.php',
        data: { id: id },
        success: function (data) {
            console.log(data);
            if (data == null) {
                product = " There are no cart yet";
                $('#cart').html(product);
            } else {
                total = 1;
                product = "";
                for (var i = 0; i < data.length; i++) {
                    product += "<div class='callout callout-info' style='height: 15vh;'>";
                    product += "<div class='row'>";
                    product += "<div class='column' style='flex: 1;'>";
                    product += "<img style='height: -webkit-fill-available;' src='../img/Product/" + data[i].name + ".jpg' alt='product-" + data[i].name + "' /></div>";
                    product += "<div class='column' style='flex: 2;'>";
                    product += "<div class='row'><h5>" + data[i].name + "</h5></div>";
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
                    product += "<div class='row'><span style='opacity: 0.7;'>Rp." + rupiahnya + "</span></div></div>";
                    product += "<div class='column' style='flex: 1;'>";
                    product += "<div class='row'>Total : " + total + "</div>";
                    product += "<div class='row'>";
                    product += "<a href='../parsing/removecart.html?cartID=" + data[i].id + "'><i class='fa fa-trash'></i></a>";
                    product += "</div>";
                    product += "</div></div></div>";
                }
                $('#cart').html(product);
            }

        }
    });
});
$('document').ready(function () {
    $.ajax({
        type: 'GET',
        url: 'php/store.php',
        error: function (xhr, status, error) {
            // console.log(xhr);
            var result = $.parseJSON(xhr.responseText);
            console.log(result);
            alert('Terjadi kesalahan ' + result.error);
        },
        success: function (data) {
            console.log(data);
            product = "";
            for (var i = 0; i < data.length; i++){
                product += "<div class='card'>";
                
        product += "<div class='card-header border-0'>";
          product += "<img class='card-img-top' src='img/Product/"+ data[i].name +".jpg' alt='product-"+ data[i].name +"' />";
          product += "<a class='btn btn-app favorite'>";
            product += "<i class='fas fa-heart' style='-webkit-text-stroke-color: black; color: transparent; -webkit-text-stroke-width: 1px;'></i></a></div>";
        product += "<div class='card-body'>"
          product += "<span style='font-weight: bold;'>" + data[i].name + "</span><br>";
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
          product += "<span>Rp." + rupiahnya + "</span>";
        product += "</div>";
      product += "</div>";
            }
            $('#store').html(product);
        }
    });
});
$("document").ready(function() {
  var id = sessionStorage.getItem("id");

  $.ajax({
    type: "GET",
    url: "php/store.php",
    error: function(xhr, status, error) {
      // console.log(xhr);
      var result = $.parseJSON(xhr.responseText);
      console.log(result);
      alert("There is an error " + result.error);
    },
    success: function(data) {
      console.log(data);
      product = "";
      for (var i = 0; i < data.length; i++) {
        product += "<div class='card'>";
        product += "<div class='card-header border-0'>";
        product +=
          "<a href='product/product.html?productID=" +
          data[i].id +
          "'><img class='card-img-top' src='img/Product/" +
          data[i].name +
          ".jpg' alt='product-" +
          data[i].name +
          "' /></a>";
        product += "<a class='btn btn-app favorite'>";
        $.ajax({
          type: "POST",
          url: "php/favorite.php",
          data: { id_account: id, id_product: data[i].id },
          error: function(xhr, status, error) {
            console.log(xhr);
            console.log("error");
            var result = $.parseJSON(xhr.responseText);
            console.log(result);
            alert("There is an error " + result.error);
          },
          success: function(data) {
            console.log(data);
            for (var j = 0; j < data.length; j++) {
              $.ajax({
                type: "POST",
                url: "php/favorite.php",
                data: { id_account: id, id_product: data[j].id },
                async: false,
                success: function(b) {
                  // console.log(b);
                  if (b == true) {
                    var favorite =
                      "<i class='fas fa-heart' style='color:red;'></i>";
                  } else {
                    var favorite =
                      "<i class='fas fa-heart' style='-webkit-text-stroke-color: black; color: transparent; -webkit-text-stroke-width: 1px;'></i>";
                  }
                  // console.log("j=" + j);
                  localStorage.setItem(j, favorite);
                }
              });
            }
            product = "";
            for (var i = 0; i < data.length; i++) {
              product += "<div class='card'>";
              product += "<div class='card-header border-0'>";
              product +=
                "<a href='product/product.html?productID=" +
                data[i].id +
                "'><img class='card-img-top' src='img/Product/" +
                data[i].name +
                ".jpg' alt='product-" +
                data[i].name +
                "' /></a>";
              product += "<a class='btn btn-app favorite'>";
              // console.log("i=" + i);
              // console.log(localStorage.getItem(i));
              product += localStorage.getItem(i);
              product +=
                "</a></div><a class='card-body' href='product/product.html?productID=" +
                data[i].id +
                "'>";
              product +=
                "<span style='font-weight: bold; color: black;'>" +
                data[i].name +
                "</span><br>";
              var harga = parseFloat(data[i].price);
              var bil = harga;
              var number_string = bil.toString(),
                sisanya = number_string.length % 3,
                rupiahnya = number_string.substr(0, sisanya),
                ribu = number_string.substr(sisanya).match(/\d{3}/g);

              if (ribu) {
                separatornya = sisanya ? "." : "";
                rupiahnya += separatornya + ribu.join(".");
              }
              product +=
                "<span style='color: black;'>Rp." + rupiahnya + "</span>";
              product += "</a>";
              product += "</div>";
            }
            // $('#store').html(favorite);
          }
        });
        function favorite(param) {
          product += param;
          console.log(data[i].name);
        }
        product +=
          "</a></div><a class='card-body' href='product/product.html?productID=" +
          data[i].id +
          "'>";
        product +=
          "<span style='font-weight: bold; color: black;'>" +
          data[i].name +
          "</span><br>";
        var harga = parseFloat(data[i].price);
        var bil = harga;
        var number_string = bil.toString(),
          sisanya = number_string.length % 3,
          rupiahnya = number_string.substr(0, sisanya),
          ribu = number_string.substr(sisanya).match(/\d{3}/g);

        if (ribu) {
          separatornya = sisanya ? "." : "";
          rupiahnya += separatornya + ribu.join(".");
        }
        product += "<span style='color: black;'>Rp." + rupiahnya + "</span>";
        product += "</a>";
        product += "</div>";
      }
      $("#store").html(product);
    }
  });
});

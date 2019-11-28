$('document').ready(function () {
    $.ajax({
        type: 'GET',
        url: 'php/store.php',
        error: function (xhr, status, error) {
            // console.log(xhr);
            var result = $.parseJSON(xhr.responseText);
            console.log(result);
            alert('There is an error ' + result.error);
        },
        success: function (data) {
            console.log(data);
            var x = 3;
            var y = data.length;
            y -= x
            slide = "";
            slide += "<div class='carousel-item active'>";
                slide += "<img class='d-block w-100' src='img/Product/" + data[y].name + ".jpg'>";
                slide += "</div>";
                y += 1;
            for (var i = y; i < data.length; i++) {
                slide += "<div class='carousel-item '>";
                slide += "<img class='d-block w-100' src='img/Product/" + data[i].name + ".jpg'>";
                slide += "</div>";
            }
            $('#slide').html(slide);
        }
    });
});
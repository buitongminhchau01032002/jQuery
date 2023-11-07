$(document).ready(function () {
    $('#dialog').hide();
    getAllPhoto();
});

$('#choose-avatar-btn').click(function () {
    $('#dialog').fadeIn(300);
    $('#dialog-container').slideDown(300);
});

$('#close-dialog-btn').click(function () {
    $('#dialog-container').slideUp(300);
    $('#dialog').fadeOut(300);
});

$('#search-input').on('input', function (e) {
    if (e.target.value) {
        searchPhoto(e.target.value);
    } else {
        getAllPhoto(e.target.value);
    }
});

$('#form').validate({
    rules: {
        'full-name': {
            required: true,
        },
        email: {
            required: true,
            email: true,
        },
    },
    messages: {
        'full-name': {
            required: 'Full name is required!',
        },
        email: {
            required: 'Email is required!',
            email: 'Email is invalid!',
        },
    },
});

function getAllPhoto() {
    $.ajax({
        url: `https://api.unsplash.com/photos?per_page=20`,
        dataType: 'json',
        beforeSend: function (request) {
            request.setRequestHeader('Accept-Version', 'v1');
            request.setRequestHeader(
                'Authorization',
                'Client-ID BmNrQ17IZWPJV3MvCx4iCAfDl4wZlPpETYU3BP1JoWw'
            );
        },
        success: function (data) {
            var htmlString = data
                .map(function (photo) {
                    return `<img class="choose-img-card" src="${photo.urls.regular}" />`;
                })
                .join('');
            $('#photo-grid').html(htmlString);

            $('.choose-img-card').click(function () {
                $('#img-preview').attr('src', this.src).show();
                $('#avatar-input').val(this.src);
                $('#dialog-container').slideUp(300);
                $('#dialog').fadeOut(300);
            });
        },
    });
}

function searchPhoto(query) {
    $.ajax({
        url: `https://api.unsplash.com/search/photos?query=${query}&per_page=20`,
        dataType: 'json',
        beforeSend: function (request) {
            request.setRequestHeader('Accept-Version', 'v1');
            request.setRequestHeader(
                'Authorization',
                'Client-ID BmNrQ17IZWPJV3MvCx4iCAfDl4wZlPpETYU3BP1JoWw'
            );
        },
        success: function (data) {
            var htmlString = data.results
                .map(function (photo) {
                    return `<img class="choose-img-card" src="${photo.urls.regular}" />`;
                })
                .join('');
            $('#photo-grid').html(htmlString);

            $('.choose-img-card').click(function () {
                $('#img-preview').attr('src', this.src).show();
                $('#avatar-input').val(this.src);
                $('#dialog-container').slideUp(300);
                $('#dialog').fadeOut(300);
            });
        },
    });
}

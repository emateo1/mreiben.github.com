$(document).ready(function() {
    var search_array = [];
    var api_array = [];
    var url_array = [];
    var dfd = $.Deferred();
    $('#submit_button').on('click', function(){
        event.preventDefault();
        search_array = [];
        api_array = [];
        url_array = [];
        $('#status_holder').css("display", "inline");
        $('#image_canvas').html("");
        var search_term = $('#user_input').val().toLowerCase();
        var array = search_term.split(" ");
        for (var i = 0; i < array.length; i++) {
            var term = array[i];
            if (term != "i" && term != "he" && term != "she" && term != "it" && term != "you" && term != "is" && term != "was" && term != "am" && term != "are" && term != "were" && term != "a" && term != "an" && term != "if" && term != "when" && term != "where" && term != "the") {
                search_array.push(array[i]);
            }
        }
        for (var k = 0; k < search_array.length; k++) {
            var flickr_url = "http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=bdfe5cec66a44b4617d2b096f5770cb0&text="+search_array[k]+"&format=json&jsoncallback=?";
            api_array.push(flickr_url);
        }
        console.log(api_array);
        for (var j = 0; j < api_array.length; j++) {
            console.log(j);
            var photo_url = 0;
            getJSON.done(function(){
                if (url_array.length == search_array.length) {
                    console.log(url_array);
                    for (var z = 0; z < url_array.length; z++) {
                    console.log(z);
                    $('#image_canvas').append("<img class='photo' src='"+url_array[z]+"' id='image"+z+"' alt='image' />")
                    $('#status_holder').css("display", "none");
                    }
                }
            })
        }
    });
    var getJSON = function(){
        $.getJSON(api_array[j], function(json){
            var x = Math.floor((Math.random()*10)+1);
            var photo = json.photos.photo[x];
            var photo_farm = photo.farm;
            var photo_server = photo.server;
            var photo_id = photo.id;
            var photo_secret = photo.secret;
            photo_url = "http://farm"+photo_farm+".staticflickr.com/"+photo_server+"/"+photo_id+"_"+photo_secret+".jpg";
            console.log(photo_url);
            url_array.push(photo_url);
        })
    }
});

/*flickr api information:
 *Key:
bdfe5cec66a44b4617d2b096f5770cb0

http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

Secret:
bb6f6272254226ea
*/
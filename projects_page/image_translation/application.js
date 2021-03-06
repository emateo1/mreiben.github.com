$(document).ready(function(){
	function ui_sort() {
		$("#image_canvas").sortable({placeholder: "ui-sortable-placeholder"})
	}
	ui_sort();
	var url_array = [];
	var imgCollect = [];
	$('#submit_button').on('click', function(){
		event.preventDefault();
		url_array = [];
		imgCollect = [];
		$('#image_canvas').fadeOut(750);
		$('#progress').fadeIn(750);
		$('#image_canvas').html("");
		$.when(inputSort()).done(function(){
			fetchImage(0, url_array);
		});
		
	})

function inputSort() {
	//parse user input and ommit common pronouns
	var search_term = $('#user_input').val().toLowerCase();
	var array = search_term.split(" ");
	for (var i = 0; i < array.length; i++) {
        var flickr_url;
		var term = array[i];
		if (term != "and" && term != "i" && term != "he" && term != "she" && term != "it" && term != "you" && term != "is" && term != "was" && term != "am" && term != "are" && term != "were" && term != "a" && term != "an" && term != "if" && term != "when" && term != "where" && term != "the") {
			flickr_url = "http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=bdfe5cec66a44b4617d2b096f5770cb0&text="+term+"&safe_search=1&format=json&jsoncallback=?";
			url_array.push(flickr_url);
		}
	}
}

function fetchImage(imgIndex, imgArr) {
	var imgId, photo_url;
	getJSON(imgIndex);
	
	function getJSON(itemIndex) {
		imgId = imgArr[imgIndex];
		// fetch JSON for specific image
		$.when($.getJSON(imgId, function(json){
		var x = Math.floor((Math.random()*20)+1);
		var photo = json.photos.photo[x];
		var photo_farm = photo.farm;
		var photo_server = photo.server;
		var photo_id = photo.id;
		var photo_secret = photo.secret;
		photo_url = "http://farm"+photo_farm+".staticflickr.com/"+photo_server+"/"+photo_id+"_"+photo_secret+"_m.jpg";
        })).done(function(){
        	// flash loading graphic
        	$('#image_canvas').delay(3000).fadeIn(750);
        	// push image to collection of photo urls
        	imgCollect.push(photo_url);
        	if (imgIndex+1 !== imgArr.length) {
        		// if there are more images fetch next one
        		fetchImage(imgIndex+1, url_array);
        	} else {
        		// fade out loading graphic
        		$('#progress').delay(250).fadeOut(500);
        		// if not, append all images to page
        		appendToPage(imgCollect);
        	}
        })
    }
}

function appendToPage(imgArray) {
	//append each image to page
	for (var k = 0; k < imgArray.length; k++) {
		$('#image_canvas').append("<img class='photo' src='"+imgArray[k]+"' id='photo-"+k+"' alt='image' />"); 
	}
}
})

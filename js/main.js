

var amzMovie = {};


amzMovie.database = [];
amzMovie.loadAssets = function() {
  $.getJSON("https://api.myjson.com/bins/1gez0f", function(data){
  amzMovie.database = data;
  amzMovie.init();
  });
};

amzMovie.init = function() {
	amzMovie.filterSlider();
  amzMovie.getTypes();
  amzMovie.getDirectors();
  amzMovie.generateMarkup();
};
/* This is a slide-down function */
amzMovie.filterSlider = function() {
/* This triggers a slide-down function after a click */
	$('.filter.open').on('click',function() {
		$('.filter_container').slideToggle(300, function(){
			var btn = $(this).prev();
			if(btn.hasClass('active')) {
				$('.filter.open').find('.btn_title').text('Filter by');
				btn.removeClass('active');
			}else {
			 	$('.filter.open').find('.btn_title').text('Close');
				btn.addClass('active');
			}

		});
	});
};

amzMovie.getTypes = function(){
  var types = [];
  $.each(amzMovie.database, function(index,elem){
    if($.inArray(amzMovie.database[index].type,types)){
       var typeValue = amzMovie.database[index].type;
    types.push(typeValue);
    $('#categories').append('<option value="'+typeValue+'">'+typeValue+'</option')
         }
    });
};
amzMovie.getDirectors = function() {
  var db = amzMovie.database;
  var directors = [];
  
  $.each(db,function(index,elem){
    if($.inArray(db[index].director,directors)){
       var directorValue = db[index].director;
    directors.push(directorValue);
    $('#directors').append('<option value="'+directorValue+'">'+directorValue+'</option')
         }
    });
};
amzMovie.generateMarkup = function(){
  var template = '';
  
  $.each(amzMovie.database, function (index){
  var db=amzMovie.database; 
    
  template += '<div class="movie_item" data-id="'+ db[index].id +'">';
  template +=     '<div class="header">';
  template +=     '<div class="left">';
  template +=       '<img src="images/'+ db[index].img +'">';
  template +=      '</div>';
  template +=       '<div class="right">';
  template +=     '<h3>'+ db[index].title +'</h3>';
  template +=		'<div class="node">';
  template +=		'<span>Year:</span> ' + db[index].year;
  template +=		'</div>';
  template +=		'<div class="node">';
  template +=		'<span>Director:</span> ' + db[index].director;
  template +=		'</div>';
  template +=		'<div class="node">';
  template +=		'<span>Type:</span> ' + db[index].type;
  template +=		'</div>';
  template +=		'<div class="show_desc">See description</div>';
  template +=	'</div>';
	template +='</div>';
  template +='<div class="description">';
  template +='<strong>Description:</strong> ' + db[index].desc;
  template +='</div>';
	template +='</div>';

  
  });
  
  $('.movies_content').append(template);
  amzMovie.showDescription(); 
  
};
amzMovie.showDescription = function() {
  $('.show_desc').on("click", function() {
  var $this = $(this);
  var parent = $(this).parents().eq(2);
  var element = parent.find('.description');
  
  element.slideToggle(300,function(){
    
    if($this.hasClass('active')) {
       $this.text('See Description').removeClass('active')
       }
    else {
       $this.text('Hide Description').addClass('active');
       }   
  });
  });  
 };
amzMovie.startFilter = function() {
	$('select').on("change", function() {
   var db = amzMovie.database;
   var type = $('#categories').val();
   var director = $('#directors').val();
   var results = [];
   
   $.each(db, function(index) { 
    if(db[index].type === type) {
      results.push(db[index].id);
    }
     if(db[index].director === director){
      results.push(db[index].id);
    }
  });  
   if(results.length < 1) {
      $('.movie_item').show();
      }
   else {
        var uniqueArray = [];
     
        $.each(results, function(i,e){
          if($.inArray(e,uniqueArray) == -1) uniqueArray.push(e);
        });
     
        $('.movie_item').hide();
        $.each(uniqueArray,function (i,e) {
          $('div[data-id="'+ e +'"]').show();
        })
      }
    
  });
  
};


amzMovie.loadAssets();

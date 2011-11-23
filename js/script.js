$(document).ready(function(){
	// necessary for DB syncing
	initializeModel();
	
	// Test conditions
	var tests = new Array();
	
	tests.push (
		{
			"summary": "UC Davis police officers used pepper spray and batons against a group of students participating in the non-violent Occupy UCD protest.",
			"image1": "img/occupy-f.png",
			"image2": "img/occupy-t.png",
			"subject": "students"
		}	
	);
	
	tests.push (
		{
			"summary": "Prisoners in the US are charged $5 to make a phone call, while earning only $1 per day. The prison that charges this amount of money is a for-profit entity.",
			"image1": "img/prison-f.png",
			"image2": "img/prison-t.png",
			"subject": "prisoners"
		}
	);
	
	// After the model is initialized, create a random test
	var condition = randomTest (tests);
	// Now, place the images
	placeImages(tests[condition]);

	$('a').click(function() {
		if ($(this).attr('data-action') == 'nextPage')
		{
			nextPage();
		}
	});
	
	function nextPage()
	{
		var elem = $('body div.active');
		elem.fadeOut(150, function() {
			elem.removeClass('active');
			elem.next().fadeIn(150, function() { elem.next().addClass('active') });
		});
		
		updatePageNumbers ();
	}
	
	// Select many
	$('div .many answer').click(function(){
		$(this).toggleClass('selected');
	});
	
	// Select one
	$('div .one answer').click(function(){
		$(this).addClass('selected');
		$.each($(this).siblings(), function(k,v) {
			$(v).removeClass('selected');
		});
	});
	
	// Update the model each time a question is updated
	$('questions question').click(function(){
		updatePageNumbers();
		//console.log("Updating model?");
		updateModel(this);
	});
	
	
	//$('questionpage img').click(goNext);
	
	$('#page-inc a').click(function(){
		console.log($(this).text());
		if ($(this).text().indexOf('Prev') >= 0)
		{
			if(canPrev())
			{
				$('questionpage.current').removeClass('current').fadeOut(100, function(){
					$(this).prev('questionpage').fadeIn(100, updatePageNumbers).addClass('current');
				});			
			}
		}
		else 
		{
			if(canNext())
			{
				$('questionpage.current').removeClass('current').fadeOut(100, function(){
					$(this).next('questionpage').fadeIn(100, updatePageNumbers).addClass('current');
				});
			}
		}
	});
	
	
	// Update page number / count
	
	function updateNextPrevLinks ()
	{
	   var next = $('#next');
	   var prev = $('#prev');
	   if (canNext())
	   {
			next.attr('href', '#');
	   }
	   else
	   {
	   		next.removeAttr('href');
	   }
	   
	   if(canPrev())
	   {
	   		prev.attr('href', '#');
	   }
	   else
	   {
	   		prev.removeAttr('href');
	   }
	}
	
	function goNext ()
	{			
			if(canNext())
			{
				$('questionpage.current').removeClass('current').fadeOut(100, function(){
					$(this).next('questionpage').fadeIn(100, updatePageNumbers).addClass('current');
				});
			}
	}
	
	function canNext ()
	{
		if($('questionpage.current').index() == ($('questionpage').length - 1))
			return false;
		return true;
	}
	
	function canPrev ()
	{
		if($('questionpage.current').index() == 0)
			return false;
		return true;
	}
	
	function updatePageNumbers ()
	{
		var currPage = $('questionPage.current').index() + 1;
		var totalPages = $('questionPage').length;
		$('#curr-page').text(currPage);
		$('#total-pages').text(totalPages);
		updateNextPrevLinks();
		
		var currElem = $('questionpage.current');
		$(document).unbind('scroll'); // remove previous scroll tracking
		if(currElem.hasClass('trackscroll'))
		{
			Survey.sensors.scroll[currElem.attr('id')] = 0;
			$(document).scroll(function(){
				Survey.sensors.scroll[currElem.attr('id')]++;
			});
		}
	}
	
	// submit final responses!
	$('#submit').click(function() {
		Survey.completed = 'true';
		
		var elem = $('#age')[0];
		// Hack - manually get value of age
		Survey.responses[$(elem).attr('id')] = {'time': Date.now(), 'value': $(elem).find('input').attr('value') };

		
		$.post (
			'http://www.konspence.com/470research/surveyListener.php',
			Survey,
			function(response)
			{
				$('questionpage.current introtext').html("Your responses have been saved. <br />Thank you for your time!");
			}	
		);
		$('paginator').fadeOut();
	});
});
// 
$(document).ready(function(){
	// necessary for DB syncing
	initializeModel();

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
	$('#page2 questions question').click(function(){
		updatePageNumbers();
		console.log("Updating model?");
		updateModel(this);
	});
	
	
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
	}
});
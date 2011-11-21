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

	// Select sum
	$('div .scale answer').hover(function(){
		$(this).prevAll().attr("class", "highlight");
		$(this).nextAll().attr("class", "");
		$(this).attr("class", "active");
	});
	
	// Update the model each time a question is updated
	$('#page2 questions question').click(function(){
		console.log("Updating model?");
		updateModel(this);
	});
});
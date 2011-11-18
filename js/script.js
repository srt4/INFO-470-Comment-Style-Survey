// 
$(document).ready(function(){
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
	$('div selectMany').click(function(){
		$(this).toggleClass('selected');
	});
	
	// Select one
	$('div selectOne').click(function(){
		$(this).addClass('selected');
		$.each($(this).siblings(), function(k,v) {
			$(v).removeClass('selected');
		});
	});

	// Select sum
	$('div selectSum').hover(function(){
		$(this).prevAll().attr("class", "highlight");
		$(this).nextAll().attr("class", "");
		$(this).attr("class", "active");
	});
});
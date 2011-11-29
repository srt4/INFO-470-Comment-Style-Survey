// Random experiment
// Create an array of different test conditions.

// Select a random test. 
function /* int */ randomTest (/* Array */ testConditions)
{
	// Number of possible test conditions
	var length = testConditions.length;
	
	// Pick a random int between 0 and length of array.
	var condition = Math.floor(Math.random() * length);
	
	// Assumes "Survey" is instantiated. 
	Survey.condition = condition;
	
	// return it
	return condition;
}

function /* boolean */ placeImages (/* Array */ images, /* int */ condition)
{	
	var article1 = images.splice(condition, 1)[0];
	var article2 = images.splice(0, 1)[0];

	$('#img1').attr('src', article1.flat);
	$('#img2').attr('src', article2.threaded);
	
	$('#image1 span').text(article1.summary);
	$('.article-subject').text(article1.subject);
	
	$('#image2 span').text(article2.summary);
	$('.article2-subject').text(article2.subject);
	
	return true;
}
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

function /* boolean */ placeImages (/* Array */ images)
{	
	$('#img1').attr('src', images.image1);
	$('#img2').attr('src', images.image2);
	$('#image1 span').text(images.summary);
	return true;
}
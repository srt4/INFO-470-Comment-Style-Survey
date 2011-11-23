// Initialize the namespace
var Survey = {};
Survey.responses = {};
Survey.sensors = {};
Survey.sensors.scroll = {};
/**
 * initializeModel ()
 * Populates the survey model with default (-1) values. 
 */
function initializeModel()
{
	$('question').each(function(key, elem){
		if ($(elem).hasClass('one'))
		{
			Survey.responses[$(elem).attr('id')] = -1;
		}
		
		if ($(elem).hasClass('many'))
		{
			var responses = new Array();
			$(elem).find('answer').each(function(key, value){
				responses[$(value).index()] = -1;
			});
			Survey.responses[$(elem).attr('id')] = responses;
		}
		
		if($(elem).hasClass('free-response'))
		{
			Survey.responses[$(elem).attr('id')] = -1;
		}
	});
}

/**
 * updateModel(elem)
 * @elem AnswersElement 
 **/
function updateModel (elem) 
{
	// Cases: selectOne, selectMany, freeResponse
	if ($(elem).hasClass('one'))
	{
		Survey.responses[$(elem).attr('id')] = {'time': Date.now(), 'value': $(elem).find('.selected').index()};
	}
	
	// 
	if ($(elem).hasClass('many'))
	{
		$.each($(elem).find('answer'), function(key, value) {
			Survey.responses[$(elem).attr('id')][$(value).index()] = $(value).hasClass('selected') ? 1 : 0;
			Survey.responses[$(elem).attr('id')].time = Date.now();
		});
	}
	
	if($(elem).hasClass('free-response'))
	{
		Survey.responses[$(elem).attr('id')] = {'time': Date.now(), 'value': $(elem).find('input').attr('value') };
	}
	
	pushAnswers ();
}

function pushAnswers ()
{
	$.post (
		'http://www.konspence.com/470research/surveyListener.php',
		Survey,
		function(response)
		{
			//console.log(response);
		}	
	);
}
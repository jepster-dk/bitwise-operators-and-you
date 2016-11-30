var answer = 0,
	response = 0,
	points = 0,
	questionCount = 0;

var isAnswered = false;

var firstBit = 0;
var secondBit = 0;
var maxBit = 15;

var operators = ['<<', '>>', '>>>', '~', '&', '|', '^'];

$(document).ready(function() {
	$('.points-count').text(points);
	$('.level-count').text(Math.floor(points / 5) + 1);
	setQuestion();

	$('.answer-form').on('submit', function(e) {
		e.preventDefault();
		if(!isAnswered && $('.response').val() !== '') {
			checkAnswer();
		}
	});

	$('.toggle-bits').click(function(e) {
		e.preventDefault();

		$('.bit-one, .bit-two').slideToggle(300);
		if($(this).text() === 'Show as bits') {
			$(this).text('Hide bits');
		}
		else {
			$(this).text('Show numbers as bits');
		}
	});
});

function setQuestion() {
	$('.response').val('');
	$('.answer').text('');
	$('.timer').text('');
	$('.question-title').text('Question ' + (questionCount+1));
	$('.question-count').text(questionCount);

	var thisOperator = operators[Math.round(Math.random() * (operators.length-1))];
	firstBit = Math.round(Math.random() * maxBit);
	if(thisOperator !== '<<' && thisOperator !== '>>' && thisOperator !== '>>>') {
		secondBit = Math.round(Math.random() * maxBit);
	}
	else {
		secondBit = Math.round(Math.random() * 3) + 1;
	}

	var question = '';
	if(thisOperator !== '~') {
		question = firstBit + ' ' + thisOperator + ' ' + secondBit;
	}
	else {
		question = thisOperator + firstBit;
	}
	$('.question-specific').text(question + '?');

	switch (thisOperator) {
		case operators[0]: 
			answer = firstBit << secondBit;
			break;
		case operators[1]: 
			answer = firstBit >> secondBit;
			break;
		case operators[2]: 
			answer = firstBit >>> secondBit;
			break;
		case operators[3]: 
			answer = ~firstBit;
			break;
		case operators[4]: 
			answer = firstBit & secondBit;
			break;
		case operators[5]: 
			answer = firstBit | secondBit;
			break;
		case operators[6]: 
			answer = firstBit ^ secondBit;
			break;
		default: 
			console.error('Oh shit, that\'s not an operator we recognize!');
	}

	var firstBitString = firstBit.toString(2);
	var secondBitString = secondBit.toString(2);
	var zeroes = '';

	if(firstBitString.length > secondBitString.length) {
		for(var i = 0; i < firstBitString.length - secondBitString.length; i++) {
			zeroes += '0';
		}
		secondBitString = zeroes + secondBitString;
	}
	else if(secondBitString.length > firstBitString.length) {
		for(var i = 0; i < secondBitString.length - firstBitString.length; i++) {
			zeroes += '0';
		}
		firstBitString = zeroes + firstBitString;
	}


	$('.bit-one').text(firstBitString);
	if(thisOperator !== '~' && thisOperator !== '<<' && thisOperator !== '>>' && thisOperator !== '>>>') {
		$('.bit-two').text(secondBitString);
	}
	else {
		$('.bit-two').text('');
	}

	isAnswered = false;

	clearInterval(countdownInterval);
}

var countdownInterval,
	countdown = 0;

function checkAnswer() {
	response = parseInt($('.response').val());
	var answerTxt = '';
	questionCount++;
	$('.question-count').text(questionCount);
	if(answer === response) {
		points++;
		$('.points-count').text(points);
		answerTxt += 'Correct!';
	}
	else {
		answerTxt += 'Incorrect!';
	}

	answerTxt += ' The answer was ' + answer;

	isAnswered = true;
	$('.answer').text(answerTxt);

	setTimeout(removeQuestion, 3000);
	countdown = 3;
	countdownInterval = setInterval(countdownTime, 1000);
	countdownTime();

	if(points % 5 === 0) {
		if((maxBit * 2) + 1 <= 2147483647 && (maxBit * 2) + 1 >= -2147483647) {
			maxBit = (maxBit * 2) + 1;
		}
	}
	$('.level-count').text(Math.floor(points / 5) + 1);

	$('.tweet-link').show();
	var tweetTxt = 'I reached level ' + Math.floor(points / 5) + ', and got ' + points + ' out of ' + questionCount + ' correct in the bitwise operators test! I\'m such a fucking nerd.'
	var tweetUrl = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweetTxt);
	tweetUrl +=  '&url=' + encodeURIComponent('https://jepster-dk.github.io/bitwise-operators-and-you/');
	$('.tweet-link').attr('href', tweetUrl);
}

function removeQuestion() {
	$('.question-container').addClass('remove-q');
	setTimeout(setQuestion, 750);
	setTimeout(function() {$('.question-container').removeClass('remove-q');}, 1499);
}

function countdownTime() {
	$('.timer').text('Getting new question in ' + countdown + ' seconds');
	if(countdown !== 0) {
		countdown--;
	}
}
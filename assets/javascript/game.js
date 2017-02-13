var wordlist = [],
		targetWord = '',
		guesses = [];
		maxLives = 6;

function loadWordlist() {
	var word = '';
	$.ajax({
		url: 'file://MacintoshHD/Users/afamolie/hangmanGame/assets/JSON/wordlist.json'
	}).done(function(data) {
		for (word in data) {
			wordlist.push(data[word]);
		}
	}, 'json');
}

function endGameDialog(isWinner) {
	if (isWinner) {
		$('#endGameDialogTitle').html('You Won');
		$('#endGameDialogContent').html('You guessed ' + targetWord + guesses.length + 'attempts');
	} else {
		$('#endGameDialogTitle').html('You lost');
		$('#endGameDialogContent').html('Unlucky, The word was ' + targetWord);
	}
}

function newWord() {
	// Select a random word from the generated word list
	targetWord = wordlist[Math.floor(Math.random() * wordlist.length)];
}

function cleanGuess() {
	// To make sure players aren't penalized for guessing the same guess twice
	var uniqueGuesses = [];
	$.each(guesses, function(index, element) {
		if (element.length > 0 && $.inArray(element, uniqueGuesses) == -1) {
			uniqueGuesses.push(element);
		}
	});
	// override guesses with uniqueGuesses
	guesses = uniqueGuesses;
}
function reviewLives() {
	var livesRemaining = maxLives,
			string = targetWord.toLowerCase();
	for (var i = 0; i<guesses.length; i++) {
		if (string.indexOf(guesses[i], 0) == -1) {
			livesRemaining--;
		}
	}

	if (livesRemaining <= 0) {
		// code for end game image
		setImage(0);
		endGameDialog(false);
		return;
	}
	// display current number of lives
	setImage(maxLives - livesRemaining);
}

function checkIfWon() {
	if (obfuscateWord() == targetWord) {
		endGameDialog(true);
	}
}

function addGuess() {
	// take  the element directly from itself rather than traversing through the DOM
	if(/^[a-zA-Z]*$/.test($('#guess').val()) && typeof $('#guess').val() !== "undefined") {
		guesses.push($('#guess').val().toLowerCase());
	}
}
function drawWord() {
	// if there is no targetWord, generate one
	while (targetWord == '') {
		newWord();
	}
	document.querySelector("#targetWord").innerHTML = (targetWord);
}

function resetGame() {
	setImage();
	targetWord == '';
	guesses == [];
	newWord();
}

function drawGuesses() {
	guesses.sort();
	$('#previousGuesses').html(guesses.join(', '));

}

function update() {
	addGuess();
	cleanGuess();
	drawWord();
	drawGuesses();
	checkIfWon();
}
$(function() {
	loadWordlist();
	drawWord();
	drawGuesses();
	$('#guess').attr('onkeyup', 'update();');
});
define(['utils'], function(Utils){
	var tens = {
		1: 'ten',
		2: 'twenty',
		3: 'thirty',
		4: 'forty',
		5: 'fifty',
		6: 'sixty',
		7: 'seventy',
		8: 'eighty',
		9: 'ninety'
	};
	
	var language = {
		base: 10,
		powers: {
			1: function(digit){
				if (digit == 0) {
					return false;
				}
				return tens[digit];
			},
			2: function(digit, index, number, options){
				if (digit == 0) {
					if (options.includeAnd && number.slice(index + 1, index + 3) != 0){
						return 'and';
					}
					
					return false;
				}
				var hundred = language.digits[digit] + ' hundred';
				
				if (options.includeAnd && number.slice(index + 1, index + 3) != 0){
					hundred += ' and';
				}
				
				return hundred;
			},
			3: 'thousand',
			6: 'million',
			9: 'billion',
			12: 'trillion',
			15: 'quadrillion',
			18: 'quintillion',
			21: 'sextillion',
			24: 'septillion',
			27: 'octillion',
			30: 'nonillion',
			33: 'decillion',
			36: 'undecillion',
			39: 'duodecillion',
			42: 'tredecillion',
			45: 'quattuordecillion',
			48: 'quindecillion',
			51: 'sexdecillion',
			54: 'septendecillion',
			57: 'octodecillion',
			60: 'novemdecillion',
			63: 'vigintillion',
			303: 'centillion'
		},
		digits: {
			0: 'zero',
			1: 'one',
			2: 'two',
			3: 'three',
			4: 'four',
			5: 'five',
			6: 'six',
			7: 'seven',
			8: 'eight',
			9: 'nine'
		},
		postprocess: function(arr){
			var processedArr = [],
				specials = {
					'one': 'eleven',
					'two': 'twelve',
					'three': 'thirteen',
					'four': 'fourteen',
					'five': 'fifteen',
					'six': 'sixteen',
					'seven': 'seventeen',
					'eight': 'eighteen',
					'nine': 'nineteen'
				};
			
			var currentWord,
				nextWord;
			for (var i = 0; i < arr.length; i++){
				if (typeof arr[i] === undefined){
					//End of array
					break;
				}
				
				currentWord = arr[i];
				nextWord = arr[+i+1]; // Extra + needed to convert string i to a number
				
				if (currentWord == 'ten' && specials.hasOwnProperty(nextWord)){
					// Numbers between "ten one" and "ten nine" should be replaced by "eleven" to "nineteen". 
					processedArr.push(specials[nextWord]);
					i++; // Skip the next word now we've combined them.
					continue;
					
				} else if (
					Utils.objectHasValue(tens, currentWord) &&
					typeof nextWord !== 'undefined' &&
					Utils.objectHasValue(language.digits, nextWord)
				){
					// Add a hyphen between tens and units.
					processedArr.push(currentWord + '-' + nextWord);
					i++; // Skip the next word now we've combined them.
					continue;
					
				} else {
					// For everything else, leave as-is.
					processedArr.push(currentWord);
					
				}
			}
			
			// Add any necessary spaces
			currentWord = undefined;
			for (var i in processedArr){
				currentWord = processedArr[i];
				
				if (+i != processedArr.length - 1){
					currentWord += ' ';
				}
				
				processedArr[i] = currentWord;
			}
			
			return processedArr;
		}
	};
	
	return language;
});
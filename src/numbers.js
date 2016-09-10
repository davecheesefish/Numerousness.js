define(['core', 'utils', 'languages/en-short'], function(numerousness, utils, lang){
	
	// Create the namespace
	var numbers = {};
	
	/**
	 * Post-processes the finished array before joining.
	 * If a postprocess() function is specified in the language file, that one will be used instead.
	 */
	var postprocess = function(arr){
		// The default post-processor just adds spaces after all but the final word.
		var processedArr = [],
			currentWord;
		
		for (var i in arr){
			currentWord = arr[i];
			
			if (i != arr.length - 1){
				currentWord += ' ';
			}
			
			processedArr.push(currentWord);
		}
		
		return processedArr;
	};
	
	var combine = function(arr){
		return arr.join('');
	};
	
	/**
	 * Numerousness.Numbers.spell()
	 * Spells the provided number out in words.
	 * 
	 * Parameters:
	 * - num         | number/string | The number (as digits) to spell out. Use strings for very large numbers.
	 * - options     | object        | (optional) An object containing key/value pairs of options and their values.
	 *  - digits        boolean         When true, the result will be separate digits (e.g. "one two" instead of "twelve").
	 *  - includeAnd    boolean         When true, the British-English "and" will be included after the hundreds place.
	 */
	var spell = function(num, options){
		// Convert numbers to strings to we can handle them easily digit-by-digit
		if (typeof num !== 'string'){
			num = num.toString();
		}
		if (typeof options === 'undefined') {
			options = {};
		}
		
		var outArr = [];
		
		// Check for digits option
		if (typeof options.digits !== 'undefined' && options.digits === true){
			// Digits option is true, output as separate digits
			for (var i in num){
				outArr.push(lang.digits[num[i]]);
			}
			
		} else {
			var currentDigit,
				digitIndex,
				subgroup = '',
				subgroupPower = 0;
			// We're working backwards through the number, so pow is the power of 10 of the current digit,
			// also the number of digits from the end.
			for (var pow = 0; true; pow++){ // Infinite loop
				digitIndex = (num.length - pow) - 1; // num.length is 1 more than the max index for charAt()
				currentDigit = num.charAt(digitIndex);
				
				// If we've reached the next named power, or the start of the number, process the subgroup.
				if (lang.powers.hasOwnProperty(pow) || currentDigit === '') {
					// If this power has a custom function, call it
					if (typeof lang.powers[subgroupPower] === 'function'){
						// Custom functions are used for power names which change based on the digit.
						// e.g. "ten", "twenty", "thirty", etc. instead of "one ten", "two ten", "three ten"
						var word = lang.powers[subgroupPower](subgroup, digitIndex + 1, num, options);
						if (word !== false){
							outArr.unshift(word);
						}
						
					} else if (subgroup != 0) {
						// If no custom function and the subgroup's not zero, add <number> <power name> (e.g. "four hundred")
						if (subgroupPower !== 0) {
							// This is not the units column, so add a power name (e.g. "hundred", "thousand"...)
							outArr.unshift(lang.powers[subgroupPower]);
							// Spell out the subgroup
							outArr.unshift(spell(subgroup, options));
							
						} else {
							// This is the units column, so add a digit name
							outArr.unshift(lang.digits[subgroup]);
							
						}
					}
					
					subgroup = '';
					subgroupPower = pow;
				}
				
				// If the current digit is blank, we've reached the start of the number, so exit.
				if (currentDigit === ''){
					break;
				} else {
					// otherwise, add the current digit to the subgroup
					subgroup = currentDigit + subgroup;
				}
			}
		}
		
		
		var postprocessor = postprocess;
		// If the language has a postprocess() function of its own, use that instead.
		if (typeof lang.postprocess === 'function'){
			postprocessor = lang.postprocess;
		}
		
		// Combine strings and return
		return combine(postprocessor(outArr));
	};
	numbers.spell = spell;
	
	numerousness.numbers = numbers;
});
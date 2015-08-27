module('Numbers');

test('spell()', function(assert){
	assert.equal(Numerousness.Numbers.spell(1), 'one', 'Spell a single digit number');
	assert.equal(Numerousness.Numbers.spell(12), 'twelve', 'Spell a special number 11-19');
	assert.equal(Numerousness.Numbers.spell(20), 'twenty', 'Spell a 2-digit number without units');
	assert.equal(Numerousness.Numbers.spell(21), 'twenty-one', 'Spell a 2-digit number with units');
	assert.equal(Numerousness.Numbers.spell(123), 'one hundred twenty-three', 'Spell a 3-digit number');
	assert.equal(Numerousness.Numbers.spell(100), 'one hundred', 'Spell a 3-digit number with no tens or units');
	assert.equal(Numerousness.Numbers.spell(1034), 'one thousand thirty-four', 'Spell a 4-digit number with no hundreds');
	assert.equal(Numerousness.Numbers.spell(1234), 'one thousand two hundred thirty-four', 'Spell a 4-digit number with hundreds');
	assert.equal(Numerousness.Numbers.spell(12345), 'twelve thousand three hundred forty-five', 'Spell a 5-digit number');
	assert.equal(Numerousness.Numbers.spell(123456), 'one hundred twenty-three thousand four hundred fifty-six', 'Spell a 6-digit number');
	assert.equal(Numerousness.Numbers.spell(1234567), 'one million two hundred thirty-four thousand five hundred sixty-seven', 'Spell a 7-digit number');
	assert.equal(Numerousness.Numbers.spell(1000000), 'one million', 'Spell a 7-digit number all zeroes after the millions');
	assert.equal(Numerousness.Numbers.spell(10000000), 'ten million', 'Spell a 7-digit number all zeroes after the ten millions');
	assert.equal(Numerousness.Numbers.spell(123456789), 'one hundred twenty-three million four hundred fifty-six thousand seven hundred eighty-nine', 'Spell a 9-digit number');
	assert.equal(Numerousness.Numbers.spell(123456789012), 'one hundred twenty-three billion four hundred fifty-six million seven hundred eighty-nine thousand twelve', 'Spell a 12-digit number');
});

test('spell() with option includeAnd: true', function(assert){
	assert.equal(Numerousness.Numbers.spell(1, {includeAnd: true}), 'one', 'Spell a single digit number');
	assert.equal(Numerousness.Numbers.spell(12, {includeAnd: true}), 'twelve', 'Spell a special number 11-19');
	assert.equal(Numerousness.Numbers.spell(20, {includeAnd: true}), 'twenty', 'Spell a 2-digit number without units');
	assert.equal(Numerousness.Numbers.spell(21, {includeAnd: true}), 'twenty-one', 'Spell a 2-digit number with units');
	assert.equal(Numerousness.Numbers.spell(123, {includeAnd: true}), 'one hundred and twenty-three', 'Spell a 3-digit number');
	assert.equal(Numerousness.Numbers.spell(100, {includeAnd: true}), 'one hundred', 'Spell a 3-digit number with no tens or units');
	assert.equal(Numerousness.Numbers.spell(1034, {includeAnd: true}), 'one thousand and thirty-four', 'Spell a 4-digit number with no hundreds');
	assert.equal(Numerousness.Numbers.spell(1234, {includeAnd: true}), 'one thousand two hundred and thirty-four', 'Spell a 4-digit number with hundreds');
	assert.equal(Numerousness.Numbers.spell(12345, {includeAnd: true}), 'twelve thousand three hundred and forty-five', 'Spell a 5-digit number');
	assert.equal(Numerousness.Numbers.spell(123456, {includeAnd: true}), 'one hundred and twenty-three thousand four hundred and fifty-six', 'Spell a 6-digit number');
	assert.equal(Numerousness.Numbers.spell(1234567, {includeAnd: true}), 'one million two hundred and thirty-four thousand five hundred and sixty-seven', 'Spell a 7-digit number');
	assert.equal(Numerousness.Numbers.spell(1000000, {includeAnd: true}), 'one million', 'Spell a 7-digit number all zeroes after the millions');
	assert.equal(Numerousness.Numbers.spell(10000000, {includeAnd: true}), 'ten million', 'Spell a 7-digit number all zeroes after the ten millions');
	assert.equal(Numerousness.Numbers.spell(123456789, {includeAnd: true}), 'one hundred and twenty-three million four hundred and fifty-six thousand seven hundred and eighty-nine', 'Spell a 9-digit number');
	assert.equal(Numerousness.Numbers.spell(123456789012, {includeAnd: true}), 'one hundred and twenty-three billion four hundred and fifty-six million seven hundred and eighty-nine thousand and twelve', 'Spell a 12-digit number');
});

test('spell() with option digits:true', function(assert){
	assert.equal(Numerousness.Numbers.spell(123456789012, {digits:true}), 'one two three four five six seven eight nine zero one two', 'Spell a 12-digit number as digits');
});
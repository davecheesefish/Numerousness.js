#Numerousness.js
A number formatting library for converting plain digits to fancy words.

- 1, 2, 3, 4... to one, two, three, four...
- ~~1, 2, 3, 4... to once, twice, thrice, four times...~~ (work in progress)
- ~~1000, 1000000, 1000000000, 1000000000000... to 1k, 1M, 1B, 1T...~~ (work in progress)
- ~~(X) units to (X) nano-/micro-/milli-/kilo-/mega-/giga-/tera-units~~ (work in progress)


##Usage
Include numerousness.js or numerousness.min.js in your project:

```JavaScript
<script type="text/javascript" src="numerousness.min.js></script>
```

The `window.Numerousness` object and its functions will then be available to your scripts.

###Plain Numbers (Numerousness.Numbers)
####Numerousness.Numbers.spell(num[, options])
Spells out the given number in words.

#####Arguments
| Arg       | Type          | Notes                                                  |
|-----------|---------------|--------------------------------------------------------|
| `num`     | number/string | The number to spell out as a number or numeric string. |
| `options` | object        | (optional) An object containing key/value pairs of settings (see below).      |

######Options object
All options are... optional.

| Key          | Type    | Default | Notes                                                               |
|--------------|---------|---------|---------------------------------------------------------------------|
| `digits`     | boolean | `false` | If true, output will be separate digits (e.g. "one two" instead of "twelve"). |
| `includeAnd` | boolean | `false` | If true, the British-style "and" will be added after hundreds (e.g. "one hundred and three" instead of "one hundred three"). |


##Development
###Build Dependencies
- Node.js with:
  - RequireJS (`npm install requirejs`)
  - AMDclean (`npm install amdclean`)
  - UglifyJS2 (`npm install uglify-js`)

To build, navigate to the root directory and run:
```node build/build.js```

The built files can then be found in the `dist` directory.

###Dictionaries
The dictionary for Numerousness is made up of several separate parts, as detailed below.
####Base
The `base` property is currently unused, but may be used in future for reverse-conversion of words back into digits.
####Powers
The `powers` property specifies the names of the different powers of `base` for the language. In the English short scale system, these are "ten"* (10^1^), hundred" (10^2^), "thousand" (10^3^), "million" (10^6^), "billion" (10^9^), etc.

For special cases, such as ten/twenty/thirty, where the name changes based on the value of that digit, a function can be provided instead of a string. This function should be in the form `function(digit, index, number, options)`. `digit` is the digit in that place value. `index` is the position of the digit within `number`, the full number currently being converted. `options` is the same options object that was passed to `Numerousness.Numbers.spell()` by the user. The function should return the correct string to be used in the finished number.

**Note:** Due to the recursive nature of the `Numerousness.Numbers.spell()` function, the `number` passed to this function may not necessarily be the whole number passed in by the user.

####Digits
The individual digit names, from 0 to 9.

####Postprocess
`postprocess` is an optional processing function that will be called after all digits have been converted, but before the array is combined into the final string. It will be passed the array of words as its only argument.

This function should add spaces and any punctuation where necessary (e.g. "twenty nine" to "twenty-nine"), and fix any special case numbers (such as changing "ten two" to "twelve"). it should then return an array of the finalised words for joining.

If no function is provided, the default action is to join all words together with spaces.

##Limitations
- Numerousness currently only supports the short scale number system for numbers 1,000,000,000 and greater (it will output "one billion" instead of "one thousand million"). Support for the long scale is planned for the future.

- Numerousness supports numbers up to several centillion (and more!) but, due to the limitations of 64-bit integers, numbers greater than 9007199254740991 must be provided to `Numerousness.Numbers.spell()` as a string.

- Numerousness can currently only handle integer values. Support for decimals may added in future, but are low priority due to their lack of readability when spelled out.

##License
See LICENSE.txt for full license terms.

##Credits
Created and built by David Prior | http://davidprior.media
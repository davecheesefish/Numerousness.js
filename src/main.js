require(['core', 'numbers'],function(numerousness){
	
	// If AMD is available, define a module, otherwise create a global object.
	// AMDclean breaks this section, so the following comment forces it to ignore the next line:
	// amdclean
	if (typeof define == 'function' && define.amd){
		// amdclean
		define(function(){
			return numerousness;
		});
	} else if (typeof exports !== 'undefined' && module.exports){
		exports = module.exports = numerousness;
	} else {
		window.numerousness = numerousness;
	}
	
});
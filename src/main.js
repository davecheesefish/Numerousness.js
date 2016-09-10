require(['core', 'numbers'],function(Numerousness){
	
	// If AMD is available, define a module, otherwise create a global object.
	// AMDclean breaks this section, so the following comment forces it to ignore the next line:
	// amdclean
	if (typeof define == 'function' && define.amd){
		// amdclean
		define(function(){
			return Numerousness;
		});
	} else if (typeof exports !== 'undefined' && module.exports){
		exports = module.exports = Numerousness;
	} else {
		window.Numerousness = Numerousness;
	}
	
});
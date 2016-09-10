define(function(){
	
	var utils = {
			/**
			 * Checks an object for a property with the given value.
			 */
			objectHasValue: function(obj, val){
				// Loop through properties
				for (var i in obj){
					// If property belongs to the object and it's equal, return true.
					if (obj.hasOwnProperty(i) && obj[i] === val){
						return true;
					}
				}
				
				// If no equal own property was found, return false.
				return false;
			}
	};
	
	return utils;
});
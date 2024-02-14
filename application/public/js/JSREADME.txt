My dataValidation is super jank if I were to redo it, I would make two functions for the eventListening that would look kinda like this (not entirely sure how
it would work with each specific input...might be a lot of fiddling)

input.addEventListener("input", function(e){
	let field = e.target.querySelector(".field");
	let error = field.querySelector(".error");
	if(checkValiditity(field)){ //checkValidity would be a catch all validity checker function for each field
		field.textContent = "✓ Great!";
    		field.className = "error noError";
  	} else {
		showError(field, error);
	}

});
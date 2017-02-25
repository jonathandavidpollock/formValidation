let requiredText = '<span> required</span>';
let successText = '<h2 class="success">Awesome! You\'re registered.</h2>';
let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
let emailRegex = new RegExp('/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/');
let nameRegex = new RegExp("/^[a-z ,.'-]+$/i");


let passwordError = 'Minimum 8 characters at least 1 Uppercase Alphabet, 1 Lowercase Alphabet and 1 Number.';
let phoneError = 'Please enter a valid phone number.';
let emailError = 'Please enter a valid email.';

let requiredFields = document.querySelectorAll('[required]');
let submit = document.querySelector('button');

let nameField = document.querySelector('#name');
let emailField = document.querySelector('#email');
let passField = document.querySelector('#password');
let phoneField = document.querySelector('#number');

let NAME = document.querySelector('.NAME');
let EMAIL = document.querySelector('.EMAIL');
let PASSWORD = document.querySelector('.PASSWORD');
let PHONE = document.querySelector('.PHONE');

if (requiredFields != null ) {
	requiredFields.forEach((field, index)=>{
		field.parentNode.querySelector('label').innerHTML +=requiredText;
	})
}

// Class
class CheckValidity {
  constructor(input, type) {
    this.input = input;
    this.type = type;
    this.errors = [];
  }
  
  addError(message) {
    this.errors.push(message);
  }
  
  getMessages() {

      if (this.input.value.match()) {
        this.addError('Please enter a valid value.');
      }

      if (this.type == "name" && !this.input.value.match(nameRegex)) {
      this.addError('Name can only contain letters.');
      }

      if (this.type == "phone" && !this.input.value.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) {
      this.addError('Please enter a valid phone number.');
      }
    
      if (this.type == "password" && !this.input.value.match(strongRegex)) {
      this.addError(passwordError);
       }

      if (this.type == "email" && !this.input.value.match(emailRegex)) {
      this.addError('Please enter a valid email address.');
      }

      if (this.type == "password" && this.input.value == "password") {
      this.addError('Password can not be password');
      }

    return this.errors
  }
  
}


// Submit Form

submit.addEventListener("click", (event) => {
	event.preventDefault(); 
      // this will stop the standard form submission.
  
      let validateName = new CheckValidity(nameField, "name");
  	let validatePassword = new CheckValidity(passField, "password");
      let validateEmail = new CheckValidity(emailField, "email");
      let validatePhone = new CheckValidity(phoneField, "phone");

      let nameMessages = validateName.getMessages();
  	let passwordMessages = validatePassword.getMessages();
      let emailMessages = validateEmail.getMessages();
      let phoneMessages = validatePhone.getMessages();

 	if (passwordMessages.length > 0) {
   		 passwordMessages.forEach( (err) => {
    		  PASSWORD.innerHTML = err;
  	       })
 	 } 
       if (nameMessages.length > 0) {
           nameMessages.forEach( (err) => {
              NAME.innerHTML = err;
               })
       } 
       if (emailMessages.length > 0) {
       emailMessages.forEach( (err) => {
          EMAIL.innerHTML = err;
           })
      } 
       if (phoneMessages.length > 0) {
       phoneMessages.forEach( (err) => {
          PHONE.innerHTML = err;
           })
        } 
        if (nameMessages.length < 1 && emailMessages.length < 1 &&  passwordMessages.length < 1 &&
           phoneMessages.length < 1 ) {
            // Replace Dom with success text
            document.querySelector('section:first-child').innerHTML = successText;
        }

})
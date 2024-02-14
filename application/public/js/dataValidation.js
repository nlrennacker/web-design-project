const form = document.getElementsByTagName("form")[0];

const username = document.getElementById("username");
const usernameError = document.getElementById("usernameError");

const email = document.getElementById("email");
const emailError = document.getElementById("emailError");

const password = document.getElementById("password");
const passwordError = document.getElementById("passwordError");

const confirmPassword = document.getElementById("confirmPassword");
const confirmPasswordError = document.getElementById("confirmPasswordError");

username.addEventListener("input", function (e) {
  if (isUsernameValid(username, usernameError)) {
    usernameError.textContent = "✓ Great!";
    usernameError.className = "error noError";
  } else {
    usernameError.className = "error active";
  }
});

function isUsernameValid(field, error) {
  if (field.value.length == 0) {
    error.textContent = "Please enter a Username";
    return false;
  } else if (!/^[a-zA-Z]/.test(field.value)) {
    error.textContent = "✕  Username needs to start with a letter.";
    return false;
  } else if (field.value.length < 3) {
    error.textContent = "✕  Username needs to be at least 3 characters.";
    return false;
  }
  return true;
}

email.addEventListener("input", function (e) {
  if (isEmailValid(email, emailError)) {
    emailError.textContent = "✓ Great!";
    emailError.className = "error noError";
  } else {
    emailError.className = "error active";
  }
});

function isEmailValid(field, error) {
  if (field.value.length == 0) {
    error.textContent = "Please enter an Email Address";
    return false;
  } else if (field.validity.typeMismatch) {
    error.textContent = `✕  Entered value is not an email address.`;
    return false;
  }
  return true;
}

password.addEventListener("input", function (e) {
  if (isValidPassword(password, passwordError)) {
    passwordError.textContent = "✓ Great!";
    passwordError.className = "error noError";
  } else {
    passwordError.className = "error active";
  }
});

function isValidPassword(field, error) {
  if (field.value.length == 0) {
    error.textContent = "Please enter a Password";
    return false;
  } else if (field.value.length < 8) {
    error.textContent = "✕  Password needs to be at least 8 characters.";
    return false;
  } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[/*\-+!@#$^&]).{8,}$/.test(field.value)) {
    error.textContent ="✕  Password needs to contain an uppercase letter, a number, and a symbol";
    return false;
  }
  return true;
} 

confirmPassword.addEventListener("input", function (e) {
  if (isPasswordConfirmed(confirmPassword, confirmPasswordError)) {
    confirmPasswordError.textContent = "✓ Great!";
    confirmPasswordError.className = "error noError";
  } else {
    confirmPasswordError.className = "error active";
  }
}); 

function isPasswordConfirmed(field, error){
  if (field.value.length == 0) {
    error.textContent = "Please confirm your Password.";
    return false;
  } else if(!(field.value === password.value)){
    error.textContent = "Your passwords do not match"
    return false;
  }
  return true;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!isUsernameValid(username, usernameError)){
    usernameError.className = "error active";
    return false;
  } else if(!isEmailValid(email, emailError)){
    emailError.className = "error active";
    return false;
  } else if(!isValidPassword(password, passwordError)){
    passwordError.className = "error active";
    return false;
  } else if(!isPasswordConfirmed(confirmPassword, confirmPasswordError)) {
    confirmPasswordError.className = "error active";
    return false;
  } else {
      form.submit();
  }
});
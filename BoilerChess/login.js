function validateForm() {
  /* THIS NEEDS TO BE CHANGED WHEN BACKEND IS INTEGRATED */
  var uname, pswd;
  uname = document.forms["login-form"]["inputUsername"].value;
  pswd = document.forms["login-form"]["inputPassword"].value;

  if (uname == "user" && pswd == "pass") {
    window.location.replace('http://google.com');
  }
}

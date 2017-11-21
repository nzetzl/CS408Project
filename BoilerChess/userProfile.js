/*jslint browser: true*/
/*jslint devel: true*/
/*global $, jQuery*/

$(document).ready(function () {
    $.get("/name", function(string){
        document.getElementById("username").innerHTML = "Welcome back, " + string + "!";
    })
  });
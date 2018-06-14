
//https://developers.giphy.com/docs/

// Initial array of animals
var animals = ["dog", "cat", "rabbit", "hamster"];

//ajax request for animal image
function displayAnimalInfo() {

  var animal = $(this).attr("data-name");
  var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=uCLeg25EeeHs21O7Ch1AZ99lwrT9czak&limit=5");

  xhr.done(function(data) {
    console.log("Success got data", data);

  // })
 
  // // Creating an AJAX call for the specific movie button being clicked
  // $.ajax({
  //   url: queryURL,
  //   method: "GET"
  // }).then(function(data) {

  var results = data.data;

  for(var i = 0; i < results.length; i++){

    var gifDiv = $("<div class='item col-md-3'>");

    var rating = results[i].rating;

    var p = $("<p>").text("Rating: " + rating);

    var animalImage = $("<img>");

    animalImage.attr("src", results[i].images.fixed_height.url);
      //console.log(data.data[i]);
    
    gifDiv.append(p);
    gifDiv.append(animalImage);

    $("#animals-view").prepend(gifDiv);
  }


  }) 
};

//function to rendering animal buttons
function renderButtons() {

  //delete the prioir animals before adding new
  $("#buttons-view").empty();

  //loop thorugh array of animals
  for (var i = 0; i < animals.length; i++){

    //generate button for each animal in array
    var a = $("<button>");
    //adding class for animal-btn
    a.addClass("btn btn-primary animal-btn");
    //adding a data-attribute
    a.attr("data-name", animals[i]);
    //providing an initial button text
    a.text(animals[i]);
    //adding the button to the html div
    $("#buttons-view").append(a);
  }
};

//onclick event of button click
$("#add-animal").on("click", function(event) {
  event.preventDefault();
  //grap the input from text box
  var animal = $("#animal-input").val().trim();

  //adding animal from the text box to array of annimals
  animals.push(animal);

  //calling the render button function
  renderButtons();

});

//onclick event for all animal-btn elements
$(document).on("click", ".animal-btn", displayAnimalInfo);

//call renderbutton to display inital buttons from intial array
renderButtons();
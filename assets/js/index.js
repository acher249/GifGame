//ADD GIF Button ************************************
//original array displayed on start
var topicsArray = ["Pig","Llama","Cat","Dog"];

$(document).ready(function() {
    welcomeAlert();

    // Create Buttons from Array..
    for (var i = 0; i < topicsArray.length; i++) {
    var topicBtn = $("<button>");
    topicBtn.addClass("topic-button");
    topicBtn.text(topicsArray[i]);
    $(".dropButtons").append(topicBtn);
    }
});

$("#add-Button").on("click", function(event) {
    var newGifInput = $(".form-control").val();
    console.log("original: " + newGifInput);
    newGifInput =  capitalizeFirstLetter(newGifInput);
    console.log("uppcercase: " + newGifInput);
    if(topicsArray.includes(newGifInput)){
        console.log("A " + newGifInput + " button already exists.");
        //Alert
        swal({
            title: "A " + newGifInput +  " Already Exists",
            icon: "error",
            text: "Try and new Topic",
            button: "Gif Time", 
        })
        .then(() => {
            //Do somthing on click
        });
    }
    else{
        var topicBtn = $("<button>");
        topicBtn.addClass("topic-button");
        topicBtn.text(newGifInput);
        $(".dropButtons").append(topicBtn);
        topicsArray.push(newGifInput);
        //make the input field clear
    }
});

// On click of any button
$(".topic-button").on("click", function() {

    console.log("clicked topic button");

    //ADD ID?
    // //get addButton so that we can add an id to it
    // var addButton = $("#add-Button");
    // addButton.attr("id", newGifInput);
    
    var buttonClicked = this.text;
    console.log("button clicked: " + buttonClicked);
    // Storing our giphy API URL for a random cat image
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + buttonClicked;

    // Perfoming an AJAX GET request to our queryURL
    $.ajax({
    url: queryURL,
    method: "GET"
    })

    // After the data from the AJAX request comes back
    .then(function(response) {
        console.log(response);

    // Saving the image_original_url property
        var imageUrl = response.data.image_original_url;

        // Creating and storing an image tag
        var catImage = $("<img>");

        // Setting the catImage src attribute to imageUrl
        catImage.attr("src", imageUrl);
        catImage.attr("alt", "cat image");

        // Prepending the catImage to the images div
        $("#images").prepend(catImage);
    });

  });

//Alerts*********************
function welcomeAlert() {    
swal({
    title: "Hope You Like Gifs",
    icon: "success",
    text: "because you are going to see a lot of gifs",
    button: "Gif Time", 
})
.then(() => {
    //Do somthing on click
    });
};

//uppercase first letter of input before pushing into array
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
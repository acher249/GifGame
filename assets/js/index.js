window.onload = function() {
    //on start
    welcomeAlert();
};

//ADD GIF Button ************************************
$("#addButton").on("click", function(event) {
    var newGifInput = $(".form-control").val();
    console.log(newGifInput);
});

// Array of Animals
var topicsArray = ["pig","llama"];

// Create Buttons from Array..
for (var i = 0; i < letters.length; i++) {

var topicBtn = $("<button>");
topicBtn.addClass("topic-button");
topicBtn.text(letters[i]);
$("#buttons").append(topicBtn);

}

// On click of any button
$(".topic-button").on("click", function() {

    //hit the giphy API with the text of the button.
    // fridgeMagnet.text($(this).attr("data-letter"));

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
}
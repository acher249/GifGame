//ADD GIF Button ************************************
$("#addButton").on("click", function(event) {
    var newGifInput = $(".form-control").val();
    var topicBtn = $("<button>");
    topicBtn.addClass("topic-button");
    topicBtn.text(newGifInput);
    $(".dropButtons").append(topicBtn);
    console.log(newGifInput);
});

$(document).ready(function() {
    welcomeAlert();

    // Array of Animals
    var topicsArray = ["pig","llama","cat","dog"];

    // Create Buttons from Array..
    for (var i = 0; i < topicsArray.length; i++) {

    var topicBtn = $("<button>");
    topicBtn.addClass("topic-button");
    topicBtn.text(topicsArray[i]);
    $(".dropButtons").append(topicBtn);

    }
});




// On click of any button
$(".topic-button").on("click", function() {

    console.log("clicked topic button");
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
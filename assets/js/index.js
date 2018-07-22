window.onload = function() {
    //on start
    welcomeAlert();

};

$("#addButton").on("click", function(event) {
    var newGifInput = $(".form-control").val();
    console.log(newGifInput);
});

//Alerts******************
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
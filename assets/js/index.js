//ADD GIF Button ************************************
//original array displayed on start
var topicsArray = ["Pig","Llama","Cat","Dog"];

$(document).ready(function() {
    welcomeAlert();
    // document.getElementById("inputForm").focus();

    // Create Buttons from Array..
    for (var i = 0; i < topicsArray.length; i++) {
    var topicBtn = $("<button>");
    topicBtn.addClass("topic-button");
    topicBtn.addClass(topicsArray[i]);
    topicBtn.attr("id", topicsArray[i]);
    topicBtn.text(topicsArray[i]);
    $(".dropButtons").append(topicBtn);
    }

    //This lets you press enter to replace the Add-button click
    $('#inputFormParent').submit(function(event){
    event.preventDefault();
        console.log("enter pressed");
        document.getElementById("add-Button").click();
    });

    //This lets you press enter to get rid of on screen alerts
    $('#jumbrotron').submit(function(event){
    event.preventDefault();
        welcomeAlert.then();
    });

    $(document).on('click', '#add-Button', function(){
    
        var newGifInput = $(".form-control").val();
        newGifInput =  capitalizeFirstLetter(newGifInput);

        if(newGifInput.length > 0){
            if(topicsArray.includes(newGifInput)){
                // console.log('A ' + newGifInput + ' button already exists.');
                $(".form-control").val("");
                //Alert
                swal({
                    title: "A " + newGifInput +  " Button Already Exists",
                    icon: "error",
                    text: "Try and new Topic",
                    button: "Gif Time", 
                })
                .then(() => {
                    document.getElementById("inputForm").focus();
                });
            }
            else{
                var topicBtn = $("<button>");
                topicBtn.addClass("topic-button");
                topicBtn.addClass(newGifInput);
                topicBtn.attr("id", newGifInput);
                topicBtn.text(newGifInput);
                $(".dropButtons").append(topicBtn);
                topicsArray.push(newGifInput);
                //make the input field clear
                $(".form-control").val("");
                document.getElementById("inputForm").focus();
            }
        }
        else{
            //Alert
            swal({
                title: "You Didn't Enter Anything. Lame.",
                icon: "error",
                text: "Please add a topic",
                button: "Try Again", 
            })
            .then(() => {
                document.getElementById("inputForm").focus();
            });
        }
    });
    
    //get on click of dynamically created buttons
    document.querySelector("#dropButtons").addEventListener("click", function (event) {
        if (event.target.classList.contains("topic-button")) {
    
            var buttonId = event.srcElement.id;
            
            //Add the gif play pause code..
            //now get multiple gifs at once not only one. rad up in Giphy docs.
            var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + buttonId;

            $.ajax({
            url: queryURL,
            method: "GET"
            })
            
            .then(function(response) {
                console.log(response);
        
                // Animated Gif URL
                var imageUrl = response.data.image_original_url;
                // Still Gif URL
                var pausedUrl = response.data.images.original_still.url;
                console.log(pausedUrl);
                // Creating and storing an image tag
                var catImage = $("<img>");
        
                //Set attr for data-animate, data-still, and data-state
                catImage.attr("src", pausedUrl);
                catImage.attr("data-still", pausedUrl);
                catImage.attr("data-animate", imageUrl);
                catImage.attr("data-state", "still");
                catImage.attr("id", "gifImage");
                catImage.attr("alt", "cat image");
        
                // Prepending the catImage to the images div
                $(".dropImages").append(catImage);

                document.getElementById("inputForm").focus();

            });
            
        }
    })

    //Play and Pause when click image
    $(document).on('click', '#gifImage', function(){
        var state = $(this).attr("data-state");
        console.log("data-state: " + state);

        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
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
            //focus the input field so that the user can just start typing
            document.getElementById("inputForm").focus();
        });
    };
    
    //uppercase first letter of input before pushing into array
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Change Tab Title
    (function() {
        var hidden = "hidden";
        var oldtitle = document.title;
        var currenttitle;
 
        // Standards based on browsers:
        if (hidden in document)
            document.addEventListener("visibilitychange", onchange);
        else if ((hidden = "mozHidden") in document)
            document.addEventListener("mozvisibilitychange", onchange);
        else if ((hidden = "webkitHidden") in document)
            document.addEventListener("webkitvisibilitychange", onchange);
        else if ((hidden = "msHidden") in document)
            document.addEventListener("msvisibilitychange", onchange);
        // IE 9 and lower:
        else if ("onfocusin" in document)
            document.onfocusin = document.onfocusout = onchange;
        // All others:
        else
            window.onpageshow = window.onpagehide
                = window.onfocus = window.onblur = onchange;
 
       //if tab change happens set status to either hidden or visible
        function onchange (evt) {
            var v = "visible", h = "hidden",
                evtMap = {   //check events and set status based on event type
                    focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h
                };
 
            evt = evt || window.event;
            if (evt.type in evtMap) {  // check the title
                currenttitle = oldtitle;
                $(document).attr('title', currenttitle);
            }
            else { // We are in hidden state so create unique title
                currenttitle = this[hidden] ? "Hey, Come Back! :( " : oldtitle; //update to whatever you want
                $(document).attr('title', currenttitle);
            }
 
        }
 
        // set the initial state (but only if browser supports the Page Visibility API)
        if( document[hidden] !== undefined )
            onchange({type: document[hidden] ? "blur" : "focus"});
    })();
});


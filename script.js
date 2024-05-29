// Function to add and remove "pressed" class for visual feedback
function clicKed(selector) {
    $(selector).addClass("pressed");
    setTimeout(function () {
        $(selector).removeClass("pressed");
    }, 200);
}

var solution = [];
document.addEventListener("click", start);
var i = 0, j=0;

function start() {
    for (; i < 100 && j===0; i++) {
        $("h1").text("level "+ i);
        setTimeout(function () {
            var solVal = Math.ceil(Math.random() * 4);
            solution.push(solVal);
            if (solVal === 1) {
                var audio = new Audio("./sounds/green.mp3");
                audio.play();
                clicKed(".green");
            } else if (solVal === 2) {
                var audio = new Audio("./sounds/red.mp3");
                audio.play();
                clicKed(".red");
            } else if (solVal === 3) {
                var audio = new Audio("./sounds/yellow.mp3");
                audio.play();
                clicKed(".yellow");
            } else if (solVal === 4) {
                var audio = new Audio("./sounds/blue.mp3");
                audio.play();
                clicKed(".blue");
            }
            
        },  1000); // Delay increases by 1000ms (1 second) for each iteration
    // }
    j=1;
    // After showing the sequence, start checking user input
    setTimeout(check, 1000);
    }
}

// Function to check user input
function check() {
    var k = 0; // Initialize the position tracker

    // Attach a click event handler to the buttons
    $(".btn").on("click", function () {
        // Determine the expected class based on the current solution value
        var expectedClass = "";
        if (solution[k] === 1) expectedClass = "green";
        else if (solution[k] === 2) expectedClass = "red";
        else if (solution[k] === 3) expectedClass = "yellow";
        else if (solution[k] === 4) expectedClass = "blue";

        // Check if the clicked button matches the expected class
        if (this.classList.contains(expectedClass)) {
            var audio = new Audio("./sounds/" + expectedClass + ".mp3");
            audio.play();
            clicKed("." + expectedClass); // Visual feedback for correct input
            k++;

            if (k === solution.length) {
                // Successfully matched all elements
                console.log("Success!");
                // You can add any success handling logic here
                $(".btn").off("click"); // Remove the click event handler
                j=0;
                start();
            }
        } else {
            // Mismatch found, handle the error
            console.log("Mismatch!");
            $("h1").text("Wrong Color!!! You Lost at level "+ (i-1) + "...");
            $("h1").after("<h3>Click anywhere to restart...</h3>")
            var audio = new Audio("./sounds/wrong.mp3");
            audio.play();
            $("body").css("backgroundColor","red");
            document.body.addEventListener("click", function(event) {
                if (!event.target.classList.contains("btn")) {
                    location.reload();
                }
            });
            
            k = 0; // Reset position or handle as needed
            // You can add any error handling or reset logic here
            $(".btn").off("click"); // Remove the click event handler
        }
    });
}




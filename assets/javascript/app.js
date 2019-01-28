$(document).ready(function() { 

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBe-mS4bYtmgi6JHKewfMR7PnXN_EVTo9U",
    authDomain: "trainscheduler-679de.firebaseapp.com",
    databaseURL: "https://trainscheduler-679de.firebaseio.com",
    projectId: "trainscheduler-679de",
    storageBucket: "trainscheduler-679de.appspot.com",
    messagingSenderId: "735897397450"
  };

  firebase.initializeApp(config);
 $("#add-train-btn").on("click", function(event){
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var destinationName = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-time-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    // googled a few different ways to reduce errors in the user data for the HH:mm format, and spun this solution out of someones tip for ensuring a certain number of digits.
    var formattedFirstTrain = ("0" + firstTrain).slice(-5);


    var newTrainToDatabase = {
        name: trainName,
        destination: destinationName,
        start: formattedFirstTrain,
        rate: trainFrequency,
    };

    database.ref().push(newTrainToDatabase);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");
 });


 
database.ref().on("child_added", function(childSnapshot){

    var trainName = childSnapshot.val().name;
    var destinationName = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().start;
    var trainFrequency = childSnapshot.val().rate;
    
    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    
    var currentTime = moment();

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    var tRemainder = diffTime % trainFrequency;

    var tMinutesTillTrain = trainFrequency - tRemainder;

    var nextTrain = currentTime.add(tMinutesTillTrain, "minutes");

    var i = 0;
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destinationName),
        $("<td>").text(trainFrequency),
        $("<td>").text(nextTrain.format('HH:mm')),
        $("<td>").text(tMinutesTillTrain),
        $("<td>").html("<button class=removal-button>x</button>"),
    );
    newRow.addClass("row-" + i);

    $("#train-table").append(newRow);
    i++;
});

// creates the list from information from firebase

$(document).on("click", ".removal-button", function(){
 
})

});
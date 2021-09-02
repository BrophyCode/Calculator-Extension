// Obtains the inputs the default values
minDefault = document.getElementById("minBound");
maxDefault = document.getElementById("maxBound");
stepDefault = document.getElementById("step");

// Saves the settings to chrome storage when the submit button is pressed
submitSettings = document.getElementById("submit").addEventListener("click", saveSettings);
submitResults = document.getElementById("submitResults");

function saveSettings(){
    chrome.storage.sync.set({
        "minDefault": minDefault.value, 
        "maxDefault": maxDefault.value,
        "stepDefault": stepDefault.value}, function(){
            console.log("Saved minDefault: " + minDefault.value);
            console.log("Saved maxDefault: " + maxDefault.value);
            console.log("Saved stepDefault: " + stepDefault.value);
            submitResults.textContent = "Successfully Saved";
    });
}

//Sets the default values for the elements
chrome.storage.sync.get(["minDefault", "maxDefault", "stepDefault"], result => {
    minDefault.value = result.minDefault;
    maxDefault.value = result.maxDefault;
    stepDefault.value = result.stepDefault;
});


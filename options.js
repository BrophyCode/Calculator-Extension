// Obtains the inputs the default values
minDefault = document.getElementById("minBound");
maxDefault = document.getElementById("maxBound");
stepDefault = document.getElementById("step");
primaryColor = document.getElementById("primaryColor");
secondColor = document.getElementById("secondColor");

// Saves the settings to chrome storage when the submit button is pressed
submitSettings = document.getElementById("submit").addEventListener("click", saveSettings);
submitResults = document.getElementById("submitResults");

function saveSettings(){
    chrome.storage.sync.set({
        "minDefault": minDefault.value, 
        "maxDefault": maxDefault.value,
        "stepDefault": stepDefault.value,
        "primaryColor": primaryColor.value,
        "secondColor": secondColor.value}, ()=> {
            submitResults.textContent = "Successfully Saved";
    });
}

//Sets the default values for the elements
async function getLocalStorageValue(){
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.sync.get(
                ["minDefault",
                "maxDefault",
                "stepDefault",
                "primaryColor",
                "secondColor"],
                 result => {resolve(result);
            })
        }
        catch (ex) {
            reject(ex);
        }
    });
}
const syncResult = getLocalStorageValue();

syncResult.then(result => {
    minDefault.value = result.minDefault;
    maxDefault.value = result.maxDefault;
    stepDefault.value = result.stepDefault;
    primaryColor.value = result.primaryColor;
    secondColor.value = result.secondColor
});


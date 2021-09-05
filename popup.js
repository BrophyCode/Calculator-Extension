// Graphing a 2d equation
// Creates an array of numbers that will be used as the x domain
let xrange = []; 
// Creates an array of numbers that will be used as the y domain. Same as x by default
let yrange = xrange;
// Sets the location for the graph as the div with id="graph"
let graph = document.getElementById("graph");
// Creates the graph
Plotly.newPlot(graph, [ {
    x: xrange,
    y: yrange,
    mode: "lines" } ],
    {margin: {
        l: 20,
        r: 5,
        b: 20,
        t: 20,
        pad: 0},
    },
);


// Grabs the input for the equation from the "equationInput" text input
// Whenever a character is added to the input, it updates the graph
let equation = document.getElementById("equationInput");
let step = document.getElementById("step");
let minBound = document.getElementById("minBound");
let maxBound = document.getElementById("maxBound");

// Waits for the stored settings to be fetched
// DONT CHANGE THIS
async function getLocalStorageValue(){
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.sync.get(["minDefault", "maxDefault", "stepDefault"], result => {
                resolve(result);
            })
        }
        catch (ex) {
            reject(ex);
        }
    });
}

// Obtains the promise from the storage containing the info values
const syncResult = getLocalStorageValue();
// Uses the promise to do stuff
syncResult.then(result => {
    //Sets the default values for the elements
    minBound.value = result.minDefault;
    maxBound.value = result.maxDefault;
    step.value = result.stepDefault;
    // Updates the bounds, equation, and graph
    updateBounds();
});

// Adds event listeners for when the values are changed
equation.addEventListener("input", updateEq);
step.addEventListener("input", updateBounds);
minBound.addEventListener("input", updateBounds);
maxBound.addEventListener("input", updateBounds);

//Updates the x range
function updateBounds(){
    xrange = [];
    let interval = [parseInt(minBound.value), parseInt(maxBound.value), parseFloat(step.value)];
    for(let i=interval[0]; i<interval[1]; i+=interval[2]) {
        xrange.push(i);
    }
    updateEq();
}

// Updates the y range
function updateEq() {
    try {
        // Sets math nodes to equal to the equation input
        let node = math.parse(equation.value);
        let expr = node.compile();
        
        // Changes the y values based on the equation
        yrange = xrange.map(setY);
        function setY(value, index, array){
            return expr.evaluate({x:value, e:math.e, pi:math.pi});
        }
        updateGraph();
    } catch {
        console.log("Not a valid Equation");
    }
}

// Updates the graph based on altered yrange data
function updateGraph(){
    Plotly.react(graph, [ {
        x: xrange,
        y: yrange,
        mode: "lines" } ],
        {margin: {
            l: 20,
            r: 0,
            b: 20,
            t: 20,
            pad: 0},
        }
    );
}
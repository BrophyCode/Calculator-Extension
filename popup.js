class Domain {
    constructor(variable, min, max, step){
        this.variable = variable;
        this.min = parseInt(min);
        this.max = parseInt(max);
        this.step = parseFloat(step);
    }
    render() {
        let divEl = document.createElement("p"); 

        let minInput = document.createElement("input");
        minInput.setAttribute("type", "number");
        minInput.addEventListener("input", this.updateBounds.bind(this));
        minInput.value = this.min;

        let maxInput = document.createElement("input");
        maxInput.setAttribute("type", "number");
        maxInput.addEventListener("input", this.updateBounds.bind(this));
        maxInput.value = this.max;

        let stepInput = document.createElement("input");
        stepInput.setAttribute("type", "number");
        stepInput.setAttribute("step", 0.01);
        stepInput.setAttribute("min", 0);
        stepInput.addEventListener("input", this.updateBounds.bind(this));
        stepInput.value = this.step;

        divEl.append(this.variable + ": ", minInput, " < " + this.variable + " < ", maxInput, document.createElement('br'), "Step: ", stepInput);

        minInput.setAttribute("id", "minInput");
        maxInput.setAttribute("id", "maxInput");
        stepInput.setAttribute("id", "stepInput");

        document.getElementById("graphInputs").appendChild(divEl);
    }
    get range(){
        let range = [];
        for(let i = this.min; i < this.max; i += this.step) {
            range.push(i);
        }
        return range;
    }
    updateBounds(event){
        this.min = parseInt(document.getElementById("minInput").value);
        this.max = parseInt(document.getElementById("maxInput").value);
        this.step = parseFloat(document.getElementById("stepInput").value);
    }
}

class Equation {
    constructor(variable, equation, domain){
        this.variable = variable;
        this.equation = equation;
        this.domain = domain;
    }
    render(){
        let divEl = document.createElement('p');
        
        let eqInput = document.createElement("input");
        eqInput.setAttribute("type", "text");
        eqInput.value = equation;

        divEl.append(this.variable + " ", eqInput);


    }
}

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

let xrange;
let yranges = [];

syncResult.then(result => {
    //Sets the default values for the domain element
    xrange = new Domain("X", result.minDefault, result.maxDefault, result.stepDefault);
    xrange.render();
});


let insertEq = document.getElementById("insertEq");
insertEq.addEventListener("click", function() {
    yranges.push(new Equation('Y', "X", xrange));
    console.log(xrange.range);
    console.log(yranges[0].variable);
});


/*
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
*/
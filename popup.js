class Domain {
    getRange(){
        this.range = [];
        for(let i=this.min; i<this.max; i+=this.step) {
            this.range.push(i);
        }
    }
    constructor(variable, min, max, step){
        this.variable = variable;
        this.min = parseInt(min);
        this.max = parseInt(max);
        this.step = step;
        this.range = this.getRange();

        this.minInput = document.createElement("input");
        this.minInput.setAttribute("type", "number");
        this.minInput.addEventListener("input", this.updateBounds);
        this.minInput.value = this.min;

        this.maxInput = document.createElement("input");
        this.maxInput.setAttribute("type", "number");
        this.maxInput.addEventListener("input", this.updateBounds);
        this.maxInput.value = this.max;

        this.stepInput = document.createElement("input");
        this.stepInput.setAttribute("type", "number");
        this.stepInput.setAttribute("step", 0.01);
        this.stepInput.setAttribute("min", 0)
        this.stepInput.addEventListener("input", this.updateBounds);
        this.stepInput.value = this.step;
    }
    render() {
        let divEl = document.createElement("p"); 

        divEl.append(this.variable + ": ", this.minInput, " < " + this.variable + " < ", this.maxInput, document.createElement('br'), "Step: ", this.stepInput);
        console.log(this.minInput);

        document.getElementById("graphInputs").appendChild(divEl);
    }
    updateBounds(){
        console.log(this.minInput);
        this.min = parseInt(this.minInput.value);
        this.max = parseInt(this.maxInput.value);
        this.step = parseInt(this.stepInput.value);
        this.getRange();
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
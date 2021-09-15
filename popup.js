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
        minInput.addEventListener("input", this.update.bind(this));
        minInput.value = this.min;

        let maxInput = document.createElement("input");
        maxInput.setAttribute("type", "number");
        maxInput.addEventListener("input", this.update.bind(this));
        maxInput.value = this.max;

        let stepInput = document.createElement("input");
        stepInput.setAttribute("type", "number");
        stepInput.setAttribute("step", 0.01);
        stepInput.setAttribute("min", 0);
        stepInput.addEventListener("input", this.update.bind(this));
        stepInput.value = this.step;

        divEl.append(this.variable + ": ", minInput, " < " + this.variable + " < ", maxInput, "Step: ", stepInput);

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
    update(event){
        this.min = parseInt(document.getElementById("minInput").value);
        this.max = parseInt(document.getElementById("maxInput").value);
        this.step = parseFloat(document.getElementById("stepInput").value);
        
        for(let i=0; i<data.length; i++){
            data[i]['x'] = this.range;
            yranges[i].update();
            data[i]['y'] = yranges[i].range;
        }
        updateGraph();
    }
}


class Equation {
    constructor(variable, equation, domain){
        this.variable = variable;
        this.equation = equation;
        this.domain = domain;
        this.id = Math.random().toString(36).substr(2,5);
    }
    render(){
        let divEl = document.createElement('p');
        
        let eqInput = document.createElement("input");
        eqInput.setAttribute("type", "text");
        eqInput.addEventListener("input", this.update.bind(this) );
        eqInput.value = this.equation;

        divEl.append(this.variable + " = ", eqInput);
        
        document.getElementById("graphInputs").appendChild(divEl);
        
        Array.from(document.getElementsByTagName("input")).map(b=>b.style.backgroundColor = secondColor);
    
        eqInput.setAttribute("id", this.id);
    }
    get range(){
        try{
            let node = math.parse(this.equation);
            let expr = node.compile();

            let range = this.domain.map(setY);
            function setY(value, index, array){
                return expr.evaluate({x:value, e:math.e, pi:math.pi});
            }
            return range;
        } catch(ex){
            return ex;
        }
        
    }
    update(event) {
        this.domain = xrange.range;
        this.equation = document.getElementById(this.id).value;
        for(let i=0; i<data.length; i++){
            data[i]['y'] = yranges[i].range;
        }
        updateGraph();
    }
}


class Line {
    constructor(x, y, type){
        this.x = x;
        this.y = y;
        this.type = type;
    }
}
// Waits for the stored settings to be fetched
// DONT CHANGE THIS
async function getLocalStorageValue(){
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.sync.get(["minDefault", 
                                    "maxDefault", 
                                    "stepDefault", 
                                    "primaryColor", 
                                    "secondColor"], 
                                    result => {
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
let data = [];

let primaryColor = "#c9f7f8";
let secondColor = "#00FFFF";

//Creates a graph with the data
Plotly.newPlot(graph, data,
    {margin: {
        l: 20,
        r: 5,
        b: 20,
        t: 20,
        pad: 0},
    },
);

syncResult.then(result => {
    //Sets the default values for the domain element
    xrange = new Domain("x", result.minDefault, result.maxDefault, result.stepDefault);
    xrange.render();

    // Gets the default colors
    primaryColor = result.primaryColor;
    secondColor = result.secondColor;

    //Sets the color of the body, inputs, and buttons to the default colors
    document.body.style.backgroundColor = primaryColor;
    Array.from(document.getElementsByTagName("button")).map(b=>b.style.backgroundColor = secondColor);
    Array.from(document.getElementsByTagName("input")).map(b=>b.style.backgroundColor = secondColor);
});

//Obtains the button to add equations
let insertEq = document.getElementById("insertEq");
//When the insertEq button is clicked this adds a line
insertEq.addEventListener("click", function() {
    //Createds an equation that has a function y=x^2 by default
    yranges.push(new Equation('f(x)', "x^2", xrange.range));
    //Renders the newly created equation
    yranges[yranges.length-1].render();

    //Adds a new line to the data list
    data.push(new Line( xrange.range, yranges[yranges.length-1].range, "lines"));
    //Update graph
    updateGraph();
});


function updateGraph(){
    Plotly.react(graph, data,
        {margin: {
            l: 20,
            r: 0,
            b: 20,
            t: 20,
            pad: 0},
        }
    );
}

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
    x: xrange.range,
    y: yranges[0].range,
    mode: "lines" } ],
    {margin: {
        l: 20,
        r: 5,
        b: 20,
        t: 20,
        pad: 0},
    },
);*/

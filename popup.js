// Simple arithmetic calculator
let currentEq = document.getElementById("currentEq");
let numButtons = [];
let nums=[0];
let operator = null;



for (let i=0; i<10; i++) {
    numButtons[i]= document.getElementById("b"+ i);
    numButtons[i].addEventListener("click", function(){numSelect(i)});
}

let bdot = document.getElementById("b.").addEventListener("click", function(){ numSelect(".") });
let bplus = document.getElementById("b+").addEventListener("click", function(){ operSelect(" + ") });
let bminus = document.getElementById("b-").addEventListener("click", function(){ operSelect(" - ") });
let bdiv = document.getElementById("b/").addEventListener("click", function(){ operSelect(" / ") });
let btimes = document.getElementById("bx").addEventListener("click", function(){ operSelect(" * ") });

let benter = document.getElementById("benter").addEventListener("click", function(){ evaluate() });


function numSelect(num) {
    currentEq.textContent += num;
    nums[nums.length-1] = nums[nums.length-1]*10 + parseInt(num);
}

function operSelect(oper) {
    if(operator != null) {
        evaluate();
    }
    currentEq.textContent += oper;
    operator = oper;
    nums.push(0);
}

function evaluate() {
    switch(operator) {
        case " + ": nums[0] = nums[0] + nums[1]; break;
        case " - ": nums[0] = nums[0] - nums[1]; break;
        case " / ": nums[0] = nums[0] / nums[1]; break;
        case " * ": nums[0] = nums[0] * nums[1]; break;
    }
    nums.pop();
    currentEq.textContent = nums[0];
    operator = null;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Graphing a 2d equation
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
let resolution = document.getElementById("resolution");
let minBound = document.getElementById("minBound");
let maxBound = document.getElementById("maxBound");
equation.addEventListener("input", updateEq);
resolution.addEventListener("input", updateBounds);
minBound.addEventListener("input", updateBounds);
maxBound.addEventListener("input", updateBounds);

function updateEq(e) {
    try {
        let node = math.parse(equation.value);
        let expr = node.compile();
        
        yrange = xrange.map(setY);
        function setY(value, index, array){
            return expr.evaluate({x:value, e:math.e, pi:math.pi});
        }
        updateGraph();
    } catch {
        console.log("Not a valid Equation");
    }
}
function updateBounds(e){
    xrange = [];
    interval = [parseInt(minBound.value), parseInt(maxBound.value), parseFloat(resolution.value)];
    for(let i=interval[0]; i<interval[1]; i+=interval[2]) {
        xrange.push(i);
    }
    console.log(xrange);
    updateEq(equation);
}

// The Graph function takes the text input element as an argument
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

updateBounds();
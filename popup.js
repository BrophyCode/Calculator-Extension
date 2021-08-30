// Simple arithmetic calculator
let currentEq = document.getElementById("currentEq");
let numButtons = [];
let nums=[0];
let operator = null;



for (let i=0; i<10; i++) {
    numButtons[i]= document.getElementById("b"+ i);
    numButtons[i].addEventListener("click", function(){numSelect(i)});
}

let bdot = document.getElementById("b.").addEventListener("click", function(){ numSelect("0.0") });
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


// Graphing a 2d equation
let xrange = [];
for(let i=0; i<10; i+=0.5){
    xrange.push(i);
}
let yrange = [];
for(let i=0; i<10; i+=0.5){
    yrange.push(math.sin(i));
}

let equation = document.getElementById("equationInput");
equation.addEventListener("input", parseEq);
let node;
let expr;


function parseEq(e){
    try {
        node = math.parse(e.target.value);
        expr = node.compile();
        ans = expr.evaluate({x:math.pi});
        console.log(ans);
        //console.log(node.toString());
    } catch {
        console.log("Doesn't Work")
    }
}

let graph = document.getElementById("graph");

Plotly.newPlot(graph, [ {
    x: xrange,
    y: yrange,
    mode: "lines" } ],
    {margin: {
        l: 20,
        r: 0,
        b: 20,
        t: 20,
        pad: 0},
    },
    );
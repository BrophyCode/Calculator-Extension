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

graph = document.getElementById("graph");

Plotly.newPlot(graph, [ {
    x:[1,2,3,4,5],
    y:[1,4,9,16,25],
    mode: "lines" } ],
    {margin: {
        l: 20,
        r: 0,
        b: 20,
        t: 20,
        pad: 0},
    },
    );
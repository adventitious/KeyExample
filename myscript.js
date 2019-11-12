// JavaScript Document
"use strict";

$("#generateP").click(function () {
    generateP();
});

$("#generateQ").click(function () {
    generateQ();
});


$("#calculatePQ").click(function () {
    calculatePQ();
});

$("#calculatePhi").click(function () {
    calculatePhi();
});

$("#generateE").click(function () {
    generateE();
});

$("#calculateD").click(function () {
    calculateD();
});

$("#generateC").click(function () {
    calculateC();
});

$("#generateM").click(function () {
    calculateM();
});

$("#all").click(function () {
    all();
});


// generate p
function generateP() {
    $("#inputP").val(randPrime(100, 250));
}

// generate q
function generateQ() {
    $("#inputQ").val(randPrime(100, 250));
}

// generate pq
function calculatePQ() {
    var calcVal = $("#inputP").val() * $("#inputQ").val()
    $("#outputPQ").html( calcVal );
}

// generate phi
function calculatePhi() {
    var calcVal = ($("#inputP").val() - 1) * ($("#inputQ").val() - 1 )
    $("#outputPhi").html( calcVal );
}

// generate e
function generateE() {
    var phi = $("#outputPhi").html();
	var calcVal = generateCoprime( phi );
    $("#outputE").html( calcVal );
}

function calculateD() 
{
    var phi = $("#outputPhi").html();
    var e = $("#outputE").html();
    
    var calcVal = modinv( e, phi );
    $("#outputD").html( calcVal );
}


// calculate c
function calculateC() {
    var m = $("#inputM").val()
    var e = $("#outputE").html();
    var pq = $("#outputPQ").html();
    
    m = BigInt(m)
    e = BigInt(e)
    pq = BigInt(pq)
    
    var mpe = m ** e;
    var res = mpe % pq;
    
    $("#outputC").html(res);
	$("#inputC").val(res)
    $("#outputM").html("<br>");
}

// calculate m
function calculateM()
{
    var c = $("#inputC").val()
    var d = $("#outputD").html();
    var pq = $("#outputPQ").html();
    
    c = BigInt(c)
    d = BigInt(d)
    pq = BigInt(pq)
    
    var cpd= c ** d;
    var res = cpd % pq;
    
    $("#outputM").html(res);
}


function all() 
{
	generateP();
    generateQ();
    calculatePQ();
    calculatePhi();
    generateE();
    calculateD();
    calculateC();
    calculateM();
}


function randPrime(mini, maxi) {
    
    var myrand;
    var done = false;
    while( done == false )
    {
        myrand = getRandomInt(maxi - mini);

        myrand = myrand + mini;
        done = isPrime(myrand)
    }
    return myrand;
}


function generateCoprime( phi ) {
    
    var myrand;
    var done = false;
    while( done == false )
    {
        myrand = getRandomInt( phi );

        done = chekCoprimeNum(myrand, phi)
    }
    return myrand;
}



// https://stackoverflow.com/questions/21966000/need-to-generate-prime-numbers-in-javascript
function isPrime(num) {
    if (num === 0 || num === 1) {
        return false;
    }
    for (var i = 2; i < num; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}


// https://repl.it/repls/ElegantLoudClasslibrary
function chekCoprimeNum(a, b) {
    if (b === 1) 
    {
        return true;
    }
    if (!(a % b)) 
    {
        return false;
    } else {
        return chekCoprimeNum(b, a % b);
    }
}


function getRandomInt(max) 
{
    return Math.floor(Math.random() * Math.floor(max));
}


function dividenew( bigger, smaller )
{
    var a = bigger % smaller;
    var b = bigger - a;
    var c = b / smaller;
	
    return c
}


// https://www.di-mgt.com.au/euclidean.html
function modinv( u, v )
{
    var inv, u1, u3, v1, v3, t1, t3, q;
    var iter;
    /* Step X1. Initialise */
    u1 = 1;
    u3 = u;
    v1 = 0;
    v3 = v;
    /* Remember odd/even iterations */
    iter = 1;
    /* Step X2. Loop while v3 != 0 */
    while (v3 != 0)
    {
        /* Step X3. Divide and "Subtract" */
        //q = u3 / v3;
        q = dividenew( u3, v3 );// u3 / v3;
        t3 = u3 % v3;
        t1 = u1 + q * v1;
        /* Swap */
        u1 = v1; v1 = t1; u3 = v3; v3 = t3;
        iter = -iter;
    }
    /* Make sure u3 = gcd(u,v) == 1 */
    if (u3 != 1)
        return 0;   /* Error: No inverse exists */
    /* Ensure a positive result */
    if (iter < 0)
        inv = v - u1;
    else
        inv = u1;
    return inv;
}
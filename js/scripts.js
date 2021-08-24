class Fraction{
  constructor(numerator, denominator){
    this.numerator = numerator;
    this.denominator = denominator;
  }
  toString(){
    if (this.denominator == 1){
      return this.numerator;
    } else {
      return this.numerator + '/' + this.denominator;
    }
  }

  //NB: this a very primitive add. It can only handle denominators
  //    that are powers of 2, e.g. 32, 64 etc.
  add(fraction){
    while(this.denominator < fraction.denominator){
      this.numerator *= 2;
      this.denominator *= 2;
    }
    while(fraction.denominator < this.denominator){
      fraction.numerator *= 2;
      fraction.denominator *= 2;
    }
    this.numerator += fraction.numerator;
    while((this.numerator % 2 == 0) && (this.denominator % 2 == 0)){
      this.numerator /= 2;
      this.demoninator /= 2;
    }
  }
}

document.querySelector('#sign0').textContent = '0';

let sign0 = document.querySelector('#sign0');

let mant0 = document.querySelector('#mant0');
let mant1 = document.querySelector('#mant1');
let mant2 = document.querySelector('#mant2');

let exp0 = document.querySelector('#exp0');
let exp1 = document.querySelector('#exp1');
let exp2 = document.querySelector('#exp2');

let sign_res = document.querySelector('#sign_res');

let mant_exp0 = document.querySelector('#mant_exp0');
let mant_exp1 = document.querySelector('#mant_exp1');
let mant_exp2 = document.querySelector('#mant_exp2');

let mant_fract0 = document.querySelector('#mant_fract0');
let mant_fract1 = document.querySelector('#mant_fract1');
let mant_fract2 = document.querySelector('#mant_fract2');

let exp_res = document.querySelector('#exp_res');
let exp_fract = document.querySelector('#exp_fract');

let a = document.querySelector('#a');
let b = document.querySelector('#b');
let c = document.querySelector('#c');
let s = document.querySelector('#s');
let result = document.querySelector('#result');

let warning = document.getElementById('warning');

update_figures();

sign0.onclick = function() {
  this.textContent = flip(this.textContent);
  update_figures();
}

exp0.onclick = function() {
  this.textContent = flip(this.textContent);
  update_figures();
}

exp1.onclick = function() {
  this.textContent = flip(this.textContent);
  update_figures();
}

exp2.onclick = function() {
  this.textContent = flip(this.textContent);
  update_figures();
}

mant0.onclick = function() {
  warning.style.display = "block";
}

warning.onclick = function() {
  warning.style.display = "none";
}


mant1.onclick = function() {
  this.textContent = flip(this.textContent);
  update_figures();
}

mant2.onclick = function() {
  this.textContent = flip(this.textContent);
  update_figures();
}


function flip(x){
  return(x == '0'? '1':'0');
}

function update_figures(){
  if (sign0.textContent == '1'){
    sign_res.textContent = '-';
  } else {
    sign_res.textContent = '+';
  }

  exponent = parseInt(exp1.textContent + exp2.textContent, 2) - (exp0.textContent == '1' ? 4:0);
  exp_res.textContent = exponent;
  exp_fract.textContent = exp_to_fract(exponent);

  mant_exp0.textContent = exponent - 1;
  mant_exp1.textContent = exponent - 2;
  mant_exp2.textContent = exponent - 3;

  x = (mant0.textContent == '1' ? exp_to_fract(exponent - 1) : new Fraction(0,1));
  y = (mant1.textContent == '1' ? exp_to_fract(exponent - 2) : new Fraction(0,1));
  z = (mant2.textContent == '1' ? exp_to_fract(exponent - 3) : new Fraction(0,1));

  mant_fract0.textContent = x;
  mant_fract1.textContent = y
  mant_fract2.textContent = z

  a.textContent = x
  b.textContent = y
  c.textContent = z

  x.add(y);
  x.add(z);

  s.textContent = sign_res.textContent;

  result.textContent = sign_res.textContent + x;
}

function exp_to_fract(exponent){
  return (exponent < 0) ? new Fraction(1, (2 ** (-exponent))): new Fraction ((2 ** exponent),1);
}

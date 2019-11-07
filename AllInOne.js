//Map, reduce, filter
//bind, call, apply
//debouncing, throttling
//sum()()

let arr = [1,2,3,4,5];
let resultArr = arr.map(ele=>{
  return ele  
})
console.log("Original Map",resultArr)

Array.prototype.myMap = function(callbackFun){
  if(typeof callbackFun !== 'function'){
    throw new Error('argument is not a function');
  }
  let arr = [];
  for(let i=0;i<this.length;i++){
    arr.push(callbackFun(this[i]))
  }
  return arr;
}
console.log("My map",arr.myMap(ele=>{return ele}))

resultArr = arr.filter(ele=>{
  if(ele > 3)
    return ele  
})
console.log("Original Filter",resultArr)

Array.prototype.myFilter = function(callbackFun){
  if(typeof callbackFun !== 'function'){
    throw new Error('argument is not a function');
  }
  let arr = [];
  for(let i=0;i<this.length;i++){
    if(callbackFun(this[i]))
      arr.push(callbackFun(this[i]))
  }
  return arr;
}

console.log("My Filter",arr.myFilter(ele=>{if(ele > 3)return ele}));

resultArr = arr.reduce((accum,actual)=>{
  return accum += actual 
},0)
console.log("Original Reduce",resultArr)

Array.prototype.myReduce = function(callbackFun,initial){
  if(typeof callbackFun !== 'function'){
    throw new Error('argument is not a function');
  }
  let accum = initial || 0;
  for(let i=0;i<this.length;i++){
   accum = callbackFun(accum,this[i])
  }
  return accum;
}

console.log("My Reduce",arr.myReduce((accum,actual)=>{
  return accum += actual 
},10));

//=========================================================
console.log("==============================================")

const student = function(name,dev){
  this.name = name;
  this.position = dev;
  console.log(this,"student")
}

let jay = {
  rollNo:5
}
student.call(jay,"Jay",'dev')
console.log(jay)

Function.prototype.myCall = function(obj,...args){
  if(obj && typeof obj !== 'object'){
    throw new Error("Error")
  }
  let uniqueId = "#123#";
  obj[uniqueId] = this;
  obj[uniqueId](...args);
  delete obj[uniqueId];
}

let uzma = {
  rollNo:6
}
student.myCall(uzma,"uzma","dev")
console.log(uzma)

//=========================================================
console.log("==============================================")

let std = student.bind(jay,"Makao","Developer")
std()

Function.prototype.myBind = function(obj,...args){
  let fun = this;
  return function(){
    return fun.apply(obj,args)
  } ;
}

let uStd = student.myBind(uzma,"uzmaao","Senior Software Enginer")
uStd(uStd);

//=========================================================
console.log("==============================================")

let sum = function(a){
  return function(b){
    if(b)
      return sum(a+b);
     else
      return a;
  }
}

let totSum = sum(1)(2)(3)(4)(5)();
console.log(totSum);

//=========================================================
console.log("==============================================")

const handleKeyup = function(e){
  console.log(e.target.value);
}
const debouncing = function(fun,delay){
  let interval;
  return function(){
    console.log(this)
    let context = this;
    let args = arguments;
    clearTimeout(interval);
    interval = setTimeout(()=>{fun.apply(context,args)},delay);
  }
}

const throttling = function(fun,delay){
  let flag = true;
  return function(){
    let context = this;
    let args = arguments;
    if(flag){
      setTimeout(()=>{fun.apply(context,args),flag=true},delay);
      flag=false
    }
  }
}
let inpField = document.getElementById('inputField');
inputField.addEventListener('keyup',throttling(handleKeyup,200));
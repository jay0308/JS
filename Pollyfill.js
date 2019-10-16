let arr = [1,2,3,4,5];
let fArr = arr.filter((e)=>{
    if(e > 3)   
        return e;
})

// filter Pollyfill
Array.prototype.myFilterFun = function(executer){
  // console.log(this);
  let tmpArr = [];
  if(!Array.isArray(this)){
    throw new Error("It's not array");
  }
  if(typeof executer === 'function'){
    for(let i=0;i<this.length;i++){
      let res = executer(this[i]);
      if(res){
        tmpArr.push(res)
      }      
    }
  }else{
    throw new Error("provide function");
  }
  return tmpArr
}

// reduce pollyfill
Array.prototype.myReduceFun = function(executer,initialValue){
  // console.log(this);
  let accum = initialValue || 0;
  if(!Array.isArray(this)){
    throw new Error("It's not array");
  }
  if(typeof executer === 'function'){
    for(let i=0;i<this.length;i++){
      let res = executer(accum,this[i]);
      accum = res;     
    }
  }else{
    throw new Error("provide function");
  }
  return accum;
}

let myArr = arr.myFilterFun((e)=>{
  if(e>3)
    return e
});
// console.log(myArr)

let testArr = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
let myReduceRes = testArr.myReduceFun((allNames, name)=>{
   if (name in allNames) {
    allNames[name]++;
  }
  else {
    allNames[name] = 1;
  }
  return allNames;
},{});

console.log(myReduceRes)

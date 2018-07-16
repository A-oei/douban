
const join = (arr) => {
  if(arr){
    return Array.from(arr).join(" ")
  }
}

const slice=(value,start,end)=>{
  if(value){
    return value.slice(start,end);
  }
}

export {
  join,
  slice
}

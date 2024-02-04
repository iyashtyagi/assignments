function counter(start, end){
    if(start<=end){
        console.log(start++);
        setTimeout(()=>counter(start,end),1000);
    }
}

counter(0,100);
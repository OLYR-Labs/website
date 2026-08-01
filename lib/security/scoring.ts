export function calculateSecurityScore(
    scores:number[]
  ){
  
    const total =
      scores.reduce(
        (a,b)=>a+b,
        0
      ) / scores.length;
  
  
    return Math.round(total);
  
  }
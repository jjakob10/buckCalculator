

module.exports = {
  async index(request, response) {
    const {type,L,med,ray,ray2,u} = request.body;
    console.log("ok")
    let N = 0;

    if(type === "cilinder"){
      N = Math.sqrt((L*med*100000)/(1.256*Math.PI*ray*ray*u))
    }
    else if(type==="toroid"){
      N= Math.sqrt((L*500000)/(med*Math.log(ray2/ray)*u))
    }
   N= N.toFixed(0)
    const values = {N }


    return response.json(values);
  },
}
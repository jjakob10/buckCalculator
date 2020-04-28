const getComercialL = require('../util/getComercialL');

module.exports = {
  async index(request, response) {
    const { Vin, Vout, Iout, Freq, DeltaV, DeltaI } = request.body;
    let dutyCicle = Vout / Vin;
    let Iin = (Vout * Iout) / Vin
    let Lo = Vin / (4 * Freq * DeltaI * Iout)
    let Co = Vin / (31 * Lo * Freq * Freq * DeltaV * Vout)
    let Ce = Iout / (4 * Freq * DeltaV * Vin)
    let Le = Iout / (31 * Freq * Freq * Ce * DeltaI * Iin)
    let comLo = getComercialL(Lo, 1) * 1000;
    let comCo = getComercialL(Co, 1) * 1000000;
    let comLe = getComercialL(Le, 1) * 1000;
    let comCe = getComercialL(Ce, 1) * 1000000;
    Lo = 1000 * Lo
    Ce = 1000000 * Ce
    Co = 1000000 * Co;
    Le = 1000 * Le;
    comLo = comLo.toFixed(2)
    comLe = comLe.toFixed(2)
    comCo = comCo.toFixed(2)
    comCe = comCe.toFixed(2)
    Lo = Lo.toFixed(2)
    Le = Le.toFixed(2)
    Co = Co.toFixed(2)
    Ce = Ce.toFixed(2)
    dutyCicle = dutyCicle.toFixed(4)
    const values = { dutyCicle, Lo, Co, Le, Ce, comLo, comCo, comLe, comCe, }


    return response.json(values);
  },
}
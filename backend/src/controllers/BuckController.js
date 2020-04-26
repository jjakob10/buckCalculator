module.exports = {
  async index(request, response) {
    const { Vin, Vout, Iout, Freq, DeltaV, DeltaI } = request.body;
    const dutyCicle = Vout / Vin;
    const Iin = (Vout * Iout) / Vin
    const Lo = Vin / (4 * Freq * DeltaI * Iout)
    const Co = Vin / (31 * Lo * Freq * Freq * DeltaV * Vout)
    const Ce = Iout / (4 * Freq * DeltaV * Vin)
    const Le = Iout / (31 * Freq * Freq * Ce * DeltaI * Iin)
    const values = { dutyCicle, Lo, Co, Le, Ce }

    return response.json(values);
  },
}
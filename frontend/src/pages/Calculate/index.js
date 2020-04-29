import React, { useState } from "react"
// import { Link } from "react-router-dom"
// import { FiArrowLeft } from "react-icons/fi"

import api from "../../services/api"
import "./styles.css"


export default function Register() {
  const [Vin, setVin] = useState('');
  const [Vout, setVout] = useState('');
  const [Iout, setIout] = useState('');
  const [Freq, setFreq] = useState('');
  const [DeltaV, setDeltaV] = useState('');
  const [DeltaI, setDeltaI] = useState('');
  const [DutyCicle, setDutyCicle] = useState('');
  const [Lo, setLo] = useState('');
  const [Co, setCo] = useState('');
  const [Le, setLe] = useState('');
  const [Ce, setCe] = useState('');
  const [resFreq, setResFreq] = useState('');
  const [comLo, comsetLo] = useState('');
  const [comCo, comsetCo] = useState('');
  const [comLe, comsetLe] = useState('');
  const [comCe, comsetCe] = useState('');


  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      Vin: Number(Vin),
      Vout: Number(Vout),
      Iout: Number(Iout),
      Freq: Number(Freq),
      DeltaV: Number(DeltaV),
      DeltaI: Number(DeltaI)
    }

    try {
      const response = await api.post("buck", data);

      const { dutyCicle, comLo, comCo, comLe, comCe, Lo, Co, Le, Ce, resFreq } = response.data;
      setDutyCicle(dutyCicle);
      setLo(Lo);
      setCo(Co);
      setLe(Le);
      setCe(Ce);
      setResFreq(resFreq);
      comsetLo(comLo);
      comsetCo(comCo);
      comsetLe(comLe);
      comsetCe(comCe);

    } catch (err) {
      alert("Erro no cadastro, tente novamente.")
    }
  };



  return (
    <div className="register-container">
      <div className="content">
        <section>
          <div>
            <h1>Calculo de conversor Buck</h1>
            <p>Entre com os dados para calcular os valores:</p>
            <h2>DutyCicle: {DutyCicle}</h2>
            <h2>Freq. de res.: {resFreq}Hz</h2>
          </div>
          <div>
            <b>Valores comerciais:</b>
            <h2>Le: {comLe}mH</h2>
            <h2>Ce: {comCe}uF</h2>
            <h2>Lo: {comLo}mH</h2>
            <h2>Co: {comCo}uF</h2>
          </div>
          <div>
            <b>Valores reais:</b>
            <h2>Le: {Le}mH</h2>
            <h2>Ce: {Ce}uF</h2>
            <h2>Lo: {Lo}mH</h2>
            <h2>Co: {Co}uF</h2>
          </div>
          {/* <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para página principal
          </Link> */}
        </section>

        <form onSubmit={handleRegister}>
          <input
            type="number"
            step="any"
            placeholder="Tensão de entrada"
            value={Vin}
            onChange={e => setVin(e.target.value)}
          />
          <input
            type="number"
            step="any"
            placeholder="Tensão de saida"
            value={Vout}
            onChange={e => setVout(e.target.value)}
          />
          <input
            type="number"
            step="any"
            placeholder="Corrente de saida"
            value={Iout}
            onChange={e => setIout(e.target.value)}
          />

          <input
            type="number"
            step="any"
            placeholder="Frequência"
            value={Freq}
            onChange={e => setFreq(e.target.value)}
          />
          <input
            type="number"
            step="any"
            max="1"
            min="0"
            placeholder="Delta V (%)"
            value={DeltaV}
            onChange={e => setDeltaV(e.target.value)}
          />
          <input
            type="number"
            step="any"
            max="1"
            min="0"
            placeholder="Delta I (%)"
            value={DeltaI}
            onChange={e => setDeltaI(e.target.value)}
          />


          <button className="button" type="submit">Calcular</button>
        </form>
      </div>
    </div>
  )
}
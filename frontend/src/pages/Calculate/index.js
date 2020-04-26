import React, { useState } from "react"
import { Link } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi"

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

      const { dutyCicle, Lo, Co, Le, Ce } = response.data;
      setDutyCicle(dutyCicle);
      setLo(Lo);
      setCo(Co);
      setLe(Le);
      setCe(Ce);

    } catch (err) {
      alert("Erro no cadastro, tente novamente.")
    }
  };



  return (
    <div className="register-container">
      <div className="content">
        <section>

          <h1>Calculo de conversor Buck</h1>
          <p>Entre com os dados para calcular os valores:</p>
          <h2>DutyCicle: {DutyCicle}</h2>
          <h2>Le: {Le}</h2>
          <h2>Ce: {Ce}</h2>
          <h2>Lo: {Lo}</h2>
          <h2>Co: {Co}</h2>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para página principal
          </Link>
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
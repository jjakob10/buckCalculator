import React, { useState } from "react"
import { Link } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi"

import api from "../../services/api"
import "./styles.css"


export default function Register() {

  const [hid, setHid] = useState({})
  const [L, setL] = useState("")
  const [ray, setRay] = useState("")
  const [ray2, setRay2] = useState("")
  const [u, setU] = useState("")
  const [med, setMed] = useState("")
  const [type, setType] = useState("")
  const [N, setN] = useState("")



  function handleChange(e) {
    setType(e.target.value)
    if (e.target.value === "cilinder") {
      setHid({ visibility: "hidden" })
    } else {
      setHid({ visibility: "visible" })
    }
  }

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      type,
      L: Number(L),
      ray: Number(ray),
      ray2: Number(ray2),
      u: Number(u),
      med: Number(med),
    }

    try {
      const response = await api.post("inductor", data);

      const { N } = response.data;
      setN(N);
    } catch (err) {
      alert("Erro de comunicação")
    }
  };



  return (
    <div className="register-container">
      <div className="content">
        <section>
          <div>
            <h1>Calculo de conversor {type}</h1>
            <p>Entre com os dados para calcular os valores:</p>

          </div>
          <div>
            <h2>N: {N}</h2>
          </div>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <label>
            Escolha seu sabor favorito:
            <select value={type} onChange={handleChange}>
              <option value="toroid">Toroidal</option>
              <option value="cilinder">Cilindrico</option>
            </select>
          </label>


          <div className="input-group">
            <input
              type="number"
              step="any"
              max="1"
              min="0"
              placeholder="Inner ray (CM)"
              value={ray}
              onChange={e => setRay(e.target.value)}
            />
            <input
              type="number"
              style={hid}
              step="any"
              max="1"
              min="0"
              placeholder="External ray (CM)"
              value={ray2}
              onChange={e => setRay2(e.target.value)}
            />
          </div>

          <button className="button" type="submit">Calcular</button>
        </form>
      </div>
    </div>
  )
}
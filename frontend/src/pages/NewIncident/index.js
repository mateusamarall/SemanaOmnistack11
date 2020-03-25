import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api";
import "./style.css";

import logo from "../../assets/logo.svg";
export default function Incident() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const history = useHistory();

  const ongId = localStorage.getItem("ongId");

  async function handleNewIncident(event) {
    event.preventDefault();
    const data = {
      title,
      description,
      value
    };
    try {
      await api.post("incidents", data, {
        headers: {
          Authorization: ongId
        }
      });

      history.push("/profile");
    } catch (error) {
      alert("Erro ao Cadastrar Caso");
    }
  }
  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logo} alt="Be the hero" />
          <h1>Cadastrar novo Caso</h1>
          <p>
            Descreva o caso detalhadamente pra econtrar um herói para resolver
            isso.
          </p>
          <Link className="backlink" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Titulo do caso"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
          <textarea
            placeholder="descrição"
            value={description}
            onChange={event => setDescription(event.target.value)}
          />
          <input
            placeholder="valor em reais"
            value={value}
            onChange={event => setValue(event.target.value)}
          />
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import api from "../../services/api";
import "./styles.css";
import logo from "../../assets/logo.svg";
import heroesimg from "../../assets/heroes.png";

export default function Login() {
  const [id, setId] = useState("");
  const history = useHistory();
  async function handleLogin(event) {
    event.preventDefault();

    try {
      const response = await api.post("sessions", { id });
      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", response.data.name);
      history.push("profile");
    } catch (error) {
      alert("Falha no Login. Tente Novamente");
    }
  }
  return (
    <div className="login-container">
      <section className="form">
        <img src={logo} alt="be the hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu login</h1>

          <input
            placeholder="Sua ID"
            value={id}
            onChange={event => setId(event.target.value)}
          />
          <button type="submit" className="button">
            Entrar
          </button>
          <Link className="backlink" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesimg} alt="heroes" />
    </div>
  );
}

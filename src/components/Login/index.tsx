import { Link, useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { Container } from "../Container";
import { FormTitle } from "../FormTitle";
import { HeaderForm } from "../HeaderForm";
import iconOffHidePassword from "../../assets/icons/elements/senha-exibir.svg";
import iconOnHidePassword from "../../assets/icons/elements/senha-esconder.svg";
import { useState } from "react";
import "./Login.css";
import apiClient from "../../services/api-client";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const hidePassword = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();

  const autenticaUsuario = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErro("");
    setLoading(true);

    try {
      const url = `/auth/login`;
      const response = await apiClient.post(url, { email, senha });

      const { access_token, id } = response.data;
      if (access_token) {
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("id", id);
        navigate("/");
      }
    } catch (error: any) {
      if (error.response.data.statusCode === 401) {
        setErro("Usuário ou senha Inválidos");
      } else {
        setErro("Erro ao autenticar usuário. Tente novamente mais tarde.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <HeaderForm />
      <form className="formLogin" onSubmit={autenticaUsuario}>
        <FormTitle
          title="Login"
          text="Informe seu e-mail e senha para acessar a plataforma."
        ></FormTitle>
        <div className="inputField">
          <label>
            {" "}
            Usuário
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            {" "}
            Senha
            <input
              type={showPassword ? "text" : "password"}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <img
              src={showPassword ? iconOffHidePassword : iconOnHidePassword}
              className="iconShowPassword"
              onClick={hidePassword}
            />
          </label>
          {erro ? <span>{erro}</span> : <></>}
          <Link to="/recuperar-senha" className="forgotPassword">
            Esqueci minha senha
          </Link>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Carregando..." : "Entrar"}
        </Button>

        <p className="notAccount">
          Não tem uma conta? <Link to="/cadastro">Cadastre-se!</Link>
        </p>
      </form>
    </Container>
  );
};

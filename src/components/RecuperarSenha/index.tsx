import { Link } from "react-router-dom";
import { Button } from "../Button";
import { Container } from "../Container";
import { FormTitle } from "../FormTitle";
import { HeaderForm } from "../HeaderForm";
import  iconOffHidePassword  from '../../assets/icons/elements/senha-exibir.svg';
import  iconOnHidePassword  from '../../assets/icons/elements/senha-esconder.svg';
import './RecuperarSenha.css';
import { useState } from "react";

export const RecuperarSenha = () => {

    const hidePassword = () => {
        setShowPassword(!showPassword);
    }
    const hidePassword2 = () => {
        setShowConfirmedPassword(!showConfirmedPassword);
    }

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmedPassword, setShowConfirmedPassword] = useState(false)

    return (
        <Container>
            <HeaderForm />
            <div className="containerFormForgotPassword">
                <form className="FormForgotPassword">
                    <FormTitle title="Esqueci a senha" text="Tranquilo, digite seu e-mail e enviaremos um código para a recuperação de senha."></FormTitle>
                    <div className="inputFieldForgot">
                        <label>E-mail
                            <input type="text" />
                        </label>
                    </div>
                    <Button type="submit">Solicitar código</Button>
                </form>
                <form className="FormCode">
                    <FormTitle title="Já possuo código" text="Maravilha! Insira o código de recuperação que enviamos por e-mail e crie sua nova senha."></FormTitle>
                    <div className="inputFieldForgot">
                        <label>Código
                            <input type="text"></input>
                        </label>
                        <label>Nova senha
                            <input type={showPassword ? "text" : "password"}></input>
                            <img src={showPassword ? iconOffHidePassword : iconOnHidePassword} className="iconShowPasswordForgot" onClick={hidePassword}/>
                        </label>
                        <label>Confirmar nova senha
                            <input type={showConfirmedPassword ? "text" : "password"}></input>
                            <img src={showConfirmedPassword ? iconOffHidePassword : iconOnHidePassword} className="iconShowPasswordForgot" onClick={hidePassword2}/>
                        </label>
                        <Button type="submit">Redefinir senha</Button>
                    </div>
                </form>
            </div>
            <div className="footerForgotPassword">Lembrou a senha? <Link to="/login">Entrar</Link></div>
        </Container>
    )
}
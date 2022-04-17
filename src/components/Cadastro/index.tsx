import { Link } from "react-router-dom";
import { Button } from "../Button";
import { Container } from "../Container";
import { FormTitle } from "../FormTitle";
import  arrowBack  from "../../assets/icons/elements/arrow-back.svg";
import { HeaderForm } from "../HeaderForm";
import  iconOffHidePassword  from '../../assets/icons/elements/senha-exibir.svg';
import  iconOnHidePassword  from '../../assets/icons/elements/senha-esconder.svg';
import './Cadastro.css';
import { useState } from "react";

export const Cadastro = () => {

    const hidePassword = () => {
        setShowPassword(!showPassword);
    }

    const [showPassword, setShowPassword] = useState(false);

    return(
        <Container>
            <HeaderForm />
            <form className="formCadastro">
                <FormTitle title="Cadastre-se" text="Desenvolva e amplie seu potencial na tecnologia."></FormTitle>
                <div className="inputFieldCadastro">
                    <label>Nome
                        <input type="text" />
                    </label>
                    <label>Email
                        <input type="email" />
                    </label>
                    <label>Senha
                        <input type={showPassword ? "text" : "password"} />
                        <img src={showPassword ? iconOffHidePassword : iconOnHidePassword} className="iconPasswordCadastro" onClick={hidePassword}/>
                    </label>
                    <label>Código de acesso
                        <input type="text" />
                    </label>
                    <div className="cadastroInfo">
                        <p>Ao se registrar, você aceita nossos <span>termos de uso </span>
                        e a nossa <span>politica de privacidade</span>.
                        </p>
                    </div>
                    <Button type="submit">Cadastrar</Button>
                </div>
                <Link to="/login" className="btnBack"><img src={arrowBack} />Voltar para login</Link>
            </form>
        </Container>
    )
}
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Form({ name, ids, setName, cpf, setCpf }) {

    const navigate = useNavigate();

    function sendInfo(e) {
        e.preventDefault();
        const body = { name, cpf, ids };

        if (ids.length === 0) {
            alert("Selecione um assento");
        } else {
            const promise = axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", body);
            promise.then(navigate("/sucesso"));
            promise.catch(console.log('erro no agendamento'));
        }
    }

    return (
        <FormContainer onSubmit={sendInfo}>
            <Name
                setName={setName}
                name={name} />

            <Cpf
                setCpf={setCpf}
                cpf={cpf} />

            <button
                data-test="book-seat-btn"
                type="submit"
            >Reservar Assento(s)
            </button>
        </FormContainer>
    );
}

function Name({ setName, name }) {
    return (
        <>
            <label htmlFor="name">Nome do Comprador:</label>
            <input
                id="name"
                placeholder="Digite seu nome..."
                required
                value={name}
                onChange={e => setName(e.target.value)}
                data-test="client-name" />
        </>
    );
}

function Cpf({ setCpf, cpf }) {
    return (
        <>
            <label htmlFor="cpf">CPF do Comprador:</label>
            <input
                id="cpf"
                placeholder="Digite seu CPF..."
                required
                value={cpf}
                onChange={e => setCpf(e.target.value)}
                data-test="client-cpf" />
        </>
    )
}

const FormContainer = styled.form`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`;
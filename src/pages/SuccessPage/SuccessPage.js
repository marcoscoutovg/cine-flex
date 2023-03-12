import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function SuccessPage({ setMovie, movie, setDay, day, setInfoSeats, infoSeats,
    setName, name, setCpf, cpf, setIdSeatSession, idSeatSession, setIds, ids }) {

    const navigate = useNavigate();

    function backHome() {
        navigate("/");
        setCpf("");
        setName("");
        setIdSeatSession([]);
        setIds([]);

    }

    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer data-test="movie-info">
                <strong><h2>Filme e sessão</h2></strong>
                <p>{movie.title}</p>
                <p>{day.date} {infoSeats.name}</p>
            </TextContainer>

            <TextContainer data-test="seats-info">
                <strong><h2>Ingressos</h2></strong>
                {idSeatSession.map(id => <p key={id}>{`Assento ${id}`}</p>)}
            </TextContainer>

            <TextContainer data-test="client-info">
                <strong><h2>Comprador</h2></strong>
                <p>{`Nome: ${name}`}</p>
                <p>{`CPF: ${cpf}`}</p>
            </TextContainer>

            <button onClick={backHome} data-test="go-home-btn">Voltar para Home</button>
        </PageContainer>
    );
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`;

const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
    h2 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        letter-spacing: 0.04em;
        color: black;
    }
    p {
        font-family: 'Roboto';
        font-style: normal;
        font-size: 22px;
        line-height: 26px;
        display: flex;
        align-items: center;
        letter-spacing: 0.04em;
        color: #293845;
    }
`;
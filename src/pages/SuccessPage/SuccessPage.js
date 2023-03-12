import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import InfoSuccess from "../../components/InfoSuccess";

export default function SuccessPage({ movie, day, infoSeats,
    setName, name, setCpf, cpf, setIdSeatSession, idSeatSession, setIds }) {

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

            <InfoSuccess
                movie={movie}
                day={day}
                infoSeats={infoSeats}
                idSeatSession={idSeatSession}
                name={name}
                cpf={cpf} />

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
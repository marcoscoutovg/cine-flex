import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import {
    COLORAVAILABLE, BORDERAVAILABLE, UNAVAILABLECOLOR, BORDERUNAVAILABLE, SELECTEDCOLOR, SELECTEDBORDER
} from "../../colors";

export default function SeatsPage({ movie, setMovie, day, setDay, infoSeats, setInfoSeats,
    name, setName, cpf, setCpf, idSeatSession, setIdSeatSession, setIds, ids }) {

    const { idSessao } = useParams();
    const [numSeats, setNumSeats] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`);

        promise.then(res => {
            setInfoSeats(res.data);
            setMovie(res.data.movie);
            setDay(res.data.day);
            setNumSeats(res.data.seats);
        });

        promise.catch(err => console.log(err.response.data));
    }, []);

    function seatSelected(s) {

        const idSeats = [...ids, s.id];
        const numberSeat = [...idSeatSession, s.name];

        if (!ids.includes(s.id) && s.isAvailable) {
            setIds(idSeats);
            setIdSeatSession(numberSeat);
        }

        if (ids.includes(s.id) && s.isAvailable) {
            setIds(idSeats.filter(m => m !== s.id));
            setIdSeatSession(numberSeat.filter(m => m !== s.name));
        }

        !s.isAvailable && alert("Esse assento não está disponível");
    }

    function sendInfo(e) {
        e.preventDefault();
        const body = { name, cpf, ids };

        const promise = axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", body);
        promise.then(navigate("/sucesso"));
        promise.catch(console.log('erro no agendamento'));
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {numSeats.map(s =>
                    <SeatItem
                        data-test="seat"
                        key={s.id}
                        id={s.id}
                        available={s.isAvailable}
                        ids={ids}
                        onClick={() => seatSelected(s)}>

                        {s.name}
                    </SeatItem>)}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle
                        color={SELECTEDCOLOR}
                        border={SELECTEDBORDER} />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle
                        color={COLORAVAILABLE}
                        border={BORDERAVAILABLE} />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle
                        color={UNAVAILABLECOLOR}
                        border={BORDERUNAVAILABLE} />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer onSubmit={sendInfo}>
                <label htmlFor="name">Nome do Comprador:</label>
                <input
                    id="name"
                    placeholder="Digite seu nome..."
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    data-test="client-name" />

                <label htmlFor="cpf">CPF do Comprador:</label>
                <input
                    id="cpf"
                    placeholder="Digite seu CPF..."
                    required
                    value={cpf}
                    onChange={e => setCpf(e.target.value)}
                    data-test="client-cpf" />

                <button
                    data-test="book-seat-btn"
                    type="submit"
                >Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={movie.posterURL} alt={movie.title} />
                </div>
                <div>
                    <p>{movie.title}</p>
                    <p>{day.weekday} - {infoSeats.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    );
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`;

const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`;

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

const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`;

const CaptionCircle = styled.div`
    border: 1px solid ${p => p.border === BORDERAVAILABLE ? BORDERAVAILABLE :
        (p.border === SELECTEDBORDER ? SELECTEDBORDER : BORDERUNAVAILABLE)};         // Essa cor deve mudar
    background-color: ${p => p.color === COLORAVAILABLE ? COLORAVAILABLE :
        (p.color === UNAVAILABLECOLOR ? UNAVAILABLECOLOR : SELECTEDCOLOR)};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`;

const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`;

const SeatItem = styled.div`
    border: 1px solid ${p => (p.available && !p.ids.includes(p.id)) ? BORDERAVAILABLE
        : ((p.available && p.ids.includes(p.id)) ? SELECTEDBORDER : BORDERUNAVAILABLE)};         // Essa cor deve mudar
    background-color: ${p => (p.available && !p.ids.includes(p.id)) ? COLORAVAILABLE
        : ((p.available && p.ids.includes(p.id)) ? SELECTEDCOLOR : UNAVAILABLECOLOR)};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`;

const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`;
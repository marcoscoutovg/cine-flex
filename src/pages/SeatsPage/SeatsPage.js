import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import axios from "axios";
import { useState, useEffect } from "react";
import COLORS from "../../colors";

export default function SeatsPage() {

    const { idSessao } = useParams();
    const [infoSeats, setInfoSeats] = useState([]);
    const [numSeats, setNumSeats] = useState([]);
    const [movie, setMovie] = useState([]);
    const [day, setDay] = useState([]);
    const [selected, setSelected] = useState([]);
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [ids, setIds] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`);

        promise.then(res => {
            setInfoSeats(res.data)
            setMovie(res.data.movie)
            setDay(res.data.day)
            setNumSeats(res.data.seats)
            console.log('funcionou')
            console.log(res.data.seats)
        });

        promise.catch(err => console.log(err.response.data));
    }, []);

    function seatSelected(s) {
        if (!ids.includes(s.id)) {
            setIds([...ids, s.id]);
        }
    }

    console.log([ids, name, cpf]);

    function sendInfo(e) {
        e.preventDefault();
        const body = { name, cpf, ids };

        const promise = axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", body);
        promise.then(navigate("/sucesso"));
        promise.catch(console.log('não'))
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {numSeats.map(s =>
                    <SeatItem
                        data-test="seat"
                        key={s.id}
                        selected={s.isAvailable}
                        onClick={() => seatSelected(s)}>

                        {s.name}
                    </SeatItem>)}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle status={COLORS[2].status} />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle status={COLORS[0].status} />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle status={COLORS[1].status} />
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
                    data-test="client-cpf"/>

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
    )
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
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
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
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${p => p.status === "disponível" ? COLORS[0].border :
        (p.status === "indisponível" ? COLORS[1].border : COLORS[2].border)};         // Essa cor deve mudar
    background-color: ${p => p.status === "disponível" ? COLORS[0].color :
        (p.status === "indisponível" ? COLORS[1].color : COLORS[2].color)};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid ${p => p.selected ? COLORS[0].border : COLORS[1].border};         // Essa cor deve mudar
    background-color: ${p => p.selected ? COLORS[0].color : COLORS[1].color};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
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
`
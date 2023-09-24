import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import ContainerStatus from "../../components/ContainerStatus";
import Form from "../../components/Form";
import FooterSeats from "../../components/FooterSeats";
import {
    COLORAVAILABLE, BORDERAVAILABLE, UNAVAILABLECOLOR,
    BORDERUNAVAILABLE, SELECTEDCOLOR, SELECTEDBORDER
} from "../../colors";

export default function SeatsPage({ movie, setMovie, day, setDay, infoSeats, setInfoSeats,
    name, setName, cpf, setCpf, idSeatSession, setIdSeatSession, setIds, ids }) {

    const { idSessao } = useParams();
    const [numSeats, setNumSeats] = useState([]);

    useEffect(() => {
        const promise = axios.get(`${process.env.REACT_APP_API_URL}/showtimes/${idSessao}/seats`);

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

            <ContainerStatus />

            <Form
                name={name}
                ids={ids}
                setName={setName}
                cpf={cpf}
                setCpf={setCpf}
            />

            <FooterSeats
                movie={movie}
                day={day}
                infoSeats={infoSeats} />

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

const SeatItem = styled.div`
    border: 1px solid ${p => (p.available && !p.ids.includes(p.id)) ? BORDERAVAILABLE
        : ((p.available && p.ids.includes(p.id)) ? SELECTEDBORDER : BORDERUNAVAILABLE)};
    background-color: ${p => (p.available && !p.ids.includes(p.id)) ? COLORAVAILABLE
        : ((p.available && p.ids.includes(p.id)) ? SELECTEDCOLOR : UNAVAILABLECOLOR)};
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
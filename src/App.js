import styled from "styled-components";
import HomePage from "./pages/HomePage/HomePage";
import SeatsPage from "./pages/SeatsPage/SeatsPage";
import SessionsPage from "./pages/SessionsPage/SessionsPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

export default function App() {

    const [movie, setMovie] = useState([]);
    const [day, setDay] = useState([]);
    const [infoSeats, setInfoSeats] = useState([]);
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [idSeatSession, setIdSeatSession] = useState([]);
    const [ids, setIds] = useState([]);

    return (
        <BrowserRouter>
            <NavContainer>CINEFLEX</NavContainer>

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/sessoes/:idFilme" element={<SessionsPage />} />

                <Route path="/assentos/:idSessao" element={<SeatsPage
                    movie={movie} setMovie={setMovie}
                    day={day} setDay={setDay}
                    infoSeats={infoSeats} setInfoSeats={setInfoSeats}
                    name={name} setName={setName}
                    cpf={cpf} setCpf={setCpf}
                    idSeatSession={idSeatSession} setIdSeatSession={setIdSeatSession}
                    ids={ids} setIds={setIds} />} />

                <Route path="/sucesso" element={<SuccessPage
                    movie={movie} setMovie={setMovie}
                    day={day} setDay={setDay}
                    infoSeats={infoSeats} setInfoSeats={setInfoSeats}
                    name={name} setName={setName}
                    cpf={cpf} setCpf={setCpf}
                    idSeatSession={idSeatSession} setIdSeatSession={setIdSeatSession}
                    ids={ids} setIds={setIds} />} />
            </Routes>

        </BrowserRouter>
    );
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`;

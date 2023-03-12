import styled from "styled-components";

export default function InfoSuccess({ movie, day, infoSeats, idSeatSession, name, cpf }) {
    return (
        <>
            <MovieAndSessions
                movie={movie}
                day={day}
                infoSeats={infoSeats} />

            <Tickets idSeatSession={idSeatSession} />

            <Buyer
                name={name}
                cpf={cpf} />
        </>
    );
}

function MovieAndSessions({ movie, day, infoSeats }) {
    return (
        <TextContainer data-test="movie-info">
            <strong><h2>Filme e sessão</h2></strong>
            <p>{movie.title}</p>
            <p>{day.date} {infoSeats.name}</p>
        </TextContainer>
    );
}

function Tickets({ idSeatSession }) {
    return (
        <TextContainer data-test="seats-info">
            <strong><h2>Ingressos</h2></strong>
            {idSeatSession.map(id => <p key={id}>{`Assento ${id}`}</p>)}
        </TextContainer>
    );
}

function Buyer({ name, cpf }) {
    return (
        <TextContainer data-test="client-info">
            <strong><h2>Comprador</h2></strong>
            <p>{`Nome: ${name}`}</p>
            <p>{`CPF: ${cpf}`}</p>
        </TextContainer>
    );
}

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
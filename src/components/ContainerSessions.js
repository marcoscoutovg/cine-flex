import styled from "styled-components";
import { Link } from "react-router-dom";

export default function ContainerSessions({ movieDate }) {
    return (
        <div>
            {movieDate.map((d, index) => (
                <SessionContainer
                    data-test="movie-day"
                    key={index}>

                    {d.weekday} - {d.date}

                    <ButtonsContainer>
                        {d.showtimes.map((t, j) => (
                            <Button
                                key={j}
                                time={t.name}
                                sessionId={t.id} />))}
                    </ButtonsContainer>
                </SessionContainer>))}
        </div>
    );
}

function Button({ time, sessionId }) {
    return (
        <Link to={`/assentos/${sessionId}`}>
            <button data-test="showtime">{time}</button>
        </Link>
    );
}

const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`;

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
    }
`;
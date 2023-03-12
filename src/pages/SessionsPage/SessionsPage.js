import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function SessionsPage() {

    const { idFilme } = useParams();
    const [movieDate, setMovieDate] = useState([]);
    const [infoMovie, setInfoMovie] = useState([]);

    useEffect(() => {

        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`);

        promise.then((res) => {
            console.log(res.data);
            setMovieDate(res.data.days);
            setInfoMovie(res.data);
        });
        promise.catch((err) => {
            console.log(err.response.data);
        })
    }, []);


    return (
        <PageContainer>
            Selecione o horário
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

            <FooterContainer data-test="footer">
                <div>
                    <img src={infoMovie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{infoMovie.title}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    );
}

function Button({ time, sessionId }) {
    return (
        <Link to={`/assentos/${sessionId}`}>
            <button data-test="showtime">{time}</button>
        </Link>
    );
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;

    div {
        margin-top: 20px;

    }
`;

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
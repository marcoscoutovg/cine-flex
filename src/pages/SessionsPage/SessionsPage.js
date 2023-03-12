import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ContainerSessions from "../../components/ContainerSessions";
import FooterSessions from "../../components/FooterSessions";

export default function SessionsPage() {

    const { idFilme } = useParams();
    const [movieDate, setMovieDate] = useState([]);
    const [infoMovie, setInfoMovie] = useState([]);

    useEffect(() => {

        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`);

        promise.then((res) => {
            setMovieDate(res.data.days);
            setInfoMovie(res.data);
        });
        promise.catch((err) => {
            console.log(err.response.data);
        });
    }, []);


    return (
        <PageContainer>
            Selecione o horário

            <ContainerSessions movieDate={movieDate} />

            <FooterSessions infoMovie={infoMovie} />

        </PageContainer>
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
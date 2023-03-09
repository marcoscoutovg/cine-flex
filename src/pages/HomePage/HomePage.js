import styled from "styled-components";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function HomePage() {

    const [films, setFilms] = useState([]);

    useEffect(() => {

        const promise = axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies");

        promise.then((res) => {
            console.log(res.data)
            setFilms(res.data)
        });
        promise.catch((err) => console.log(err.response.data));
    }, []);

    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>

                {films.map((f) => <Film
                    key={f.id}
                    poster={f.posterURL}
                    id = {f.id} />)}
            </ListContainer>

        </PageContainer>
    )
}

function Film({ poster, id }) {
    return (
        <Link to={`/sessoes/${id}`}>
            <MovieContainer>
                <img src={poster}></img>
            </MovieContainer>
        </Link>
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
    padding-top: 70px;
    flex-wrap: wrap;
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
`
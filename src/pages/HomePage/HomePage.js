import styled from "styled-components";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function HomePage() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {

        const promise = axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies");

        promise.then((res) => {
            console.log(res.data)
            setMovies(res.data)
        });
        promise.catch((err) => console.log(err.response.data));
    }, []);

    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>
                {movies.map((f) => <Movie
                    key={f.id}
                    poster={f.posterURL}
                    movieId = {f.id} />)}
            </ListContainer>

        </PageContainer>
    )
}

function Movie({ poster, movieId }) {
    return (
        <Link to={`/sessoes/${movieId}`}>
            <MovieContainer data-test="movie">
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
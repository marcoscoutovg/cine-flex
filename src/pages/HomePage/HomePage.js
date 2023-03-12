import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import Movie from "../../components/Movie";

export default function HomePage() {

    const [movieList, setMovieList] = useState([]);

    useEffect(() => {

        const promise = axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies");

        promise.then((res) => {
            setMovieList(res.data)
        });
        promise.catch((err) => console.log(err.response.data));
    }, []);

    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>
                {movieList.map((f) => <Movie
                    key={f.id}
                    poster={f.posterURL}
                    movieId={f.id} />)}
            </ListContainer>

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
    padding-top: 70px;
    flex-wrap: wrap;
`;

const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`;
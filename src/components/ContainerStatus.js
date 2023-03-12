import styled from "styled-components";
import {
    COLORAVAILABLE, BORDERAVAILABLE, UNAVAILABLECOLOR, BORDERUNAVAILABLE, SELECTEDCOLOR, SELECTEDBORDER
} from "../colors";

export default function ContainerStatus() {
    return (
        <CaptionContainer>
            <CaptionItem>
                <CaptionCircle
                    color={SELECTEDCOLOR}
                    border={SELECTEDBORDER} />
                Selecionado
            </CaptionItem>
            <CaptionItem>
                <CaptionCircle
                    color={COLORAVAILABLE}
                    border={BORDERAVAILABLE} />
                Disponível
            </CaptionItem>
            <CaptionItem>
                <CaptionCircle
                    color={UNAVAILABLECOLOR}
                    border={BORDERUNAVAILABLE} />
                Indisponível
            </CaptionItem>
        </CaptionContainer>
    );
}

const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`;

const CaptionCircle = styled.div`
    border: 1px solid ${p => p.border === BORDERAVAILABLE ? BORDERAVAILABLE :
        (p.border === SELECTEDBORDER ? SELECTEDBORDER : BORDERUNAVAILABLE)};
    background-color: ${p => p.color === COLORAVAILABLE ? COLORAVAILABLE :
        (p.color === UNAVAILABLECOLOR ? UNAVAILABLECOLOR : SELECTEDCOLOR)};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`;

const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`;
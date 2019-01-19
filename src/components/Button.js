import styled from "styled-components"

export const Button = styled.button`
    padding: 10px 20px;
    border: 2px solid black;
    background: none;
    font-size: 1.1em;
`

export const FlatButton = styled.button`
    border: none;
    background: none;
    font-size: 1em;
    margin-left: auto;
    padding: 10px 20px;

    &:hover{
        background-color: rgba(black, 0.5);
    }
`
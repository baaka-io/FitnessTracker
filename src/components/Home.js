import React from "react"
import styled from "styled-components"
import BackgroundImage from "../../assets/home-background.jpg"

const Container = styled.div`
    height: 100%;
    background-image: url(${BackgroundImage});
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
`

const CallToAction = styled.button`
    border: 1px solid white ;
    background: rgba(0, 0, 0, 0.2);
    padding: 10px 20px;
    font-size: 1.5em;
    color: white;

    &:hover {
        background: rgba(0, 0, 0, 0.4);
    }
`

export default class Home extends React.Component{
    render(){
        return <Container>
            <CallToAction>WORK OUT</CallToAction>
        </Container>
    }
}
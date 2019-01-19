import styled from "styled-components"
import { NavLink } from "react-router-dom";

export const TabBar = styled.div`
    position: fixed;
    top: auto;
    bottom: 0;
    background-color: white;
    width: 100vw;
`
export const Tabs = styled.div`
    display: flex;
    width: 100%;
`
export const Tab = styled.span`
    color: black;
    text-align: center;
    font-size: 1.5em;
    padding: 10px 20px;
    flex-grow: 1;
    text-decoration: none;
`

export const NavTab = styled(NavLink)`
    color: grey;
    text-align: center;
    font-size: 1.5em;
    padding: 10px 20px;
    flex-grow: 1;
    text-decoration: none;

    &.active {
        color: black;
    }

`
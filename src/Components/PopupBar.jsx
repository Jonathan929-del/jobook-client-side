// Imports
import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';





// Styles
const PopupContainer = styled.div`
    top:0;
    z-index:9;
    width:100vw;
    display:flex;
    height:100vh;
    position:fixed;
    align-items:center;
    justify-content:center;
    transition:0.4s linear;
    background-color:#1a1a1a;
    right:${({isOpen}) => isOpen ? '0' : '-100vw'};
`

const Span = styled.span`
    top:10px;
    right:30px;
    color:#fff;
    cursor:pointer;
    font-size:20px;
    padding:7px 14px;
    border-radius:50%;
    position:absolute;
    transition:0.2s linear;
    background-color:#59c9ff;

    &:hover{
        color:#59c9ff;
        background-color:#fff;
    }
`

const NavUl = styled.ul`
    list-style:none;
`

const NavLi = styled.li`
    font-size:20px;
    padding-top:50px;
`

const PopLink = styled(Link)`
    color:#fff;
    text-decoration:none;
    transition:0.2s linear;

    &:hover{
        color:#59c9ff;
    }
`





// Main Function
export default function PopupBar({isOpen, OpenHandler}) {

    const currentUser = JSON.parse(localStorage.getItem('user'));

    const LogoutHandler = () => {
        OpenHandler();
        localStorage.removeItem('user');
        window.location.reload();
    }

    return (
        <PopupContainer isOpen={isOpen}>
            <Span onClick={OpenHandler}>X</Span>
            <NavUl>
                <NavLi><PopLink to="/" onClick={OpenHandler}>Home</PopLink></NavLi>
                <NavLi><PopLink to={`/profile/${currentUser.firstname}`} onClick={OpenHandler}>Profile</PopLink></NavLi>
                <NavLi><PopLink to="/login" onClick={LogoutHandler}>Log Out</PopLink></NavLi>
            </NavUl>
        </PopupContainer>
    )
}

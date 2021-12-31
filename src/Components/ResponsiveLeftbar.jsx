// Imports
import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import ProfilePic from '../Images/02.png';





// Styles
const ResponsiveLeftbarContainer = styled.div`
    width:100%;
    display:flex;
    font-size:20px;
    margin-top:70px;
    align-items:center;
    flex-direction:column;
    justify-content:center;
    display:none;

    @media screen and (max-width:768px){
        display:flex;
    }
`

const BarNav = styled(Link)`
    color:#fff;
    text-decoration:none;
`

const PostButton = styled.button`
    border:none;
    outline:none;
    font-size:15px;
    cursor:pointer;
    color:#59c9ff;
    padding:5px 25px;
    border-radius:5px;
    transition:0.2s linear;
    background-color:#383838;

    &:hover{
        color:#fff;
        background-color:#59c9ff;
    }

    @media screen and (max-width:500px){
        font-size:12px;
        padding:5px 20px;
    }
`

const UserInf = styled.div`
    width:100%;
    height:170px;
    display:flex;
    margin-top:10px;
    border-radius:5px;
    flex-direction:column;
    background-color:#1a1a1a;

    @media screen and (max-width:380px){
        height:200px;
    }
`

const Wrapper = styled.div`
    display:flex;
    justify-content:space-between;

    @media screen and (max-width:380px){
        flex-direction:column;
    }
`

const UserImg = styled.img`
    width:75px;
    height:75px;
    cursor:pointer;
    object-fit:cover;
    border-radius:50%;
    margin:10px 0 10px 50px;

    @media screen and (max-width:550px){
        margin:10px 0 10px 20px;
    }

    @media screen and (max-width:500px){
        width:60px;
        height:60px;   
    }
`

const Username = styled.p`
    cursor:pointer;
    margin-left:5px;
`

const SearchBar = styled.input`
    width:80%;
    height:7px;
    border:none;
    margin:auto;
    outline:none;
    padding:15px;
    color:#59c9ff;
    border-radius:5px;
    background-color:#383838;
    border:3px solid #59c9ff;

    @media screen and (max-width:500px){
        width:80%;
        height:5px;
    }

    @media screen and (max-width:380px){
        font-size:11px;
    }
`

const WrapperTwo = styled.div`
    display:flex;
    align-items:center;
`

const WrapperThree = styled.div`
    display:flex;
    margin-right:8%;
    align-items:center;

    @media screen and (max-width:380px){
        margin-left:5%;
    }
`





export default function ResponsiveLeftbar() {

    const currentUser = JSON.parse(localStorage.getItem('user'));

    return (
        <ResponsiveLeftbarContainer>
            <UserInf>
                <Wrapper>
                    <WrapperTwo>
                        <UserImg src={ProfilePic}/>
                        <Username>{`${currentUser.firstname} ${currentUser.lastname}`}</Username>
                    </WrapperTwo>
                    <WrapperThree>
                        <BarNav to='/share'><PostButton>Share a Post</PostButton></BarNav>
                    </WrapperThree>
                </Wrapper>
                <SearchBar placeholder="Search For A Friend, Video or Post"/>
            </UserInf>
        </ResponsiveLeftbarContainer>
    )
}

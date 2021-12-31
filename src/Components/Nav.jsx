// Imports
import Fade from 'react-reveal/Fade';
import {Link} from 'react-router-dom';
import {FaBars} from 'react-icons/fa';
import styled from 'styled-components';





// Styles
const NavContainer = styled.nav`
    top:0;
    left:0;
    z-index:9;
    width:100%;
    height:70px;
    display:flex;
    position:fixed;
    align-items:center;
    justify-content:center;
    background-color:#1a1a1a;

    @media screen and (max-width:500px){
        height:50px;
    }
`

const NavWrapper = styled.div`
    width:86%;
    height:100%;
    display:flex;
    font-weight:100;
    align-items:center;
    justify-content:space-between;
`

const NavLogo = styled.h3`
    font-size:25px;
    color:#59c9ff;

    @media screen and (max-width:500px){
        font-size:20px;
    }
`

const NavPages = styled.ul`
    padding:0;
    display:flex;
    list-style:none;
    align-items:center;
    justify-content:space-between;
`

const NavPage = styled.li`
    font-size:19px;
    font-weight:100;
    padding-left:30px;

    @media screen and (max-width:500px){
        display:none;
    }
`

const NavLink = styled(Link)`
    color:#fff;
    text-decoration:none;
    transition:0.2s linear;

    &:hover{
        color:#59c9ff;
    }
`

const IconContainer = styled.div`
    display:none;

    @media screen and (max-width:500px){
        display:block;
    }
`

const Icon = styled(FaBars)`
    cursor:pointer;
    font-size:25px;
`





// Main Function
export default function Nav({OpenHandler}) {

    const ClickHandler = () => {
        localStorage.removeItem('user');
        window.location.reload();
    }

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <NavContainer>
            <NavWrapper>
                <Fade top><NavLink to="/"><NavLogo>JoBook</NavLogo></NavLink></Fade>
                <NavPages>
                    <Fade top><NavLink to='/'><NavPage>Home</NavPage></NavLink></Fade>
                    <Fade top><NavLink to={`/profile/${user.firstname}`}><NavPage>Profile</NavPage></NavLink></Fade>
                    <Fade top><NavLink to="/login" onClick={ClickHandler}><NavPage>Log Out</NavPage></NavLink></Fade>
                </NavPages>
                <IconContainer>
                    <Fade top>
                        <Icon onClick={OpenHandler}/>
                    </Fade>
                </IconContainer>
            </NavWrapper>
        </NavContainer>
    )
}

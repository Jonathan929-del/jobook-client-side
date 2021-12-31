import React from 'react';
import {useState} from 'react';
import Nav from '../Components/Nav';
import Feed from '../Components/Feed';
import styled from 'styled-components';
import Leftbar from '../Components/Leftbar';
import PopupBar from '../Components/PopupBar';
import ResponsiveLeftbar from '../Components/ResponsiveLeftbar';





// Styles
const HomeSection = styled.section`
    @media screen and (max-width:768px){
        display:flex;
        align-items:center;
        flex-direction:column;
        justify-content:center;
    }
`

const LeftbarWrapper = styled.div`
    left:0;
    top:0px;
    position:fixed;
`





export default function Home() {

    const [isOpen, setIsOpen] = useState(false);

    const OpenHandler = () => {
      setIsOpen(!isOpen);
    }

    return (
        <HomeSection>
            <Nav OpenHandler={OpenHandler}/>
            <PopupBar isOpen={isOpen} OpenHandler={OpenHandler}/>
            <LeftbarWrapper>
                <Leftbar />
            </LeftbarWrapper>
            <ResponsiveLeftbar />
            <Feed />
        </HomeSection>
    )
}

// Imports
import axios from 'axios';
import Nav from '../Components/Nav';
import Feed from '../Components/Feed';
import {useParams} from 'react-router';
import styled from 'styled-components';
import {useEffect, useState} from 'react';
import PopupBar from '../Components/PopupBar';
import ProfileImgs from '../Components/ProfileImgs';
import ProfileLeftbar from '../Components/ProfileLeftbar';





// Styles
const ProfileSection = styled.section`
    width:100%;
    min-height:100vh;

    @media screen and (max-width:768px){
        display:flex;
        align-items:center;
        flex-direction:column;
        justify-content:center;
    }
`

const FeedWrapper = styled.div`
    margin-top:550px;

    @media screen and (max-width:768px){
        margin-top:400px;
    }

    @media screen and (max-width:500px){
        margin-top:250px;
    }

    @media screen and (max-width:380px){
        margin-top:${({isStyle}) => isStyle ? '350px' : '0'};
    }
`

const LeftbarWrapper = styled.div`
    position:absolute;
`





export default function Profile() {

    const [isOpen, setIsOpen] = useState(false);
    const [isStyle, setIsStyle] = useState(false);
    const [profileUser, setProfileUser] = useState({});

    const OpenHandler = () => {
      setIsOpen(!isOpen);
    }

    const firstname = useParams().firstname;

    useEffect(() => {
        const UserFetcher = async () => {
            try {
                const res = await axios.get(`https://jobook-server-side.herokuapp.com/users/name?firstname=${firstname}`);
                setProfileUser(res.data);
                profileUser ? setIsStyle(true) : setIsStyle(false);
            } catch (err) {
                console.log(err)
            }
        }
        UserFetcher();
    }, [profileUser])

    return (
        <ProfileSection>
            <Nav OpenHandler={OpenHandler}/>
            <PopupBar isOpen={isOpen} OpenHandler={OpenHandler}/>

            <LeftbarWrapper>
                <ProfileLeftbar profileUser={profileUser}/>
            </LeftbarWrapper>
            <ProfileImgs profileUser={profileUser}/>
            <FeedWrapper isStyle={isStyle}>
                <Feed profileUser={profileUser}/>
            </FeedWrapper>
        </ProfileSection>
    )
}

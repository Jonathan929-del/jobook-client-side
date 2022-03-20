// Imports
import axios from 'axios';
import Fade from 'react-reveal/Fade';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {useState, useEffect} from 'react';
import NoUser from '../Images/NoUser.png';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';





// Styles
const LeftbarContainer = styled.aside`
    z-index:9;
    width:300px;
    display:flex;
    margin-top:-550px;
    align-items:center;
    justify-content:center;
    height:calc(100vh);

    @media screen and (max-width:992px){
        width:250px;
        margin-top:-300px;
    }

    @media screen and (max-width:768px){
        display:none;
    }
`

const LeftbarWrapper = styled.div`
    width:80%;
    height:50%;
    border-bottom:1px solid #CCC;
`

const FriendsH1 = styled.h1`
    font-size:25px;
    font-weight:500;
    margin-top:50px;
`

const Ul = styled.ul`
    list-style:none;
`

const Li = styled.li`
    font-size:18px;
    font-weight:500;
    padding-top:30px;
    margin-left:-30px;
`

const FriendsUl = styled.ul`
    list-style:none;
`

const FriendsLi = styled.li`
    display:flex;
    font-size:20px;
    align-items:center;
    margin:15px 0 0 -20%;

    @media screen and (max-width:992px){
        font-size:17px;
    }
`

const FriendImg = styled.img`
    width:50px;
    height:50px;
    object-fit:cover;
    margin-right:5px;
    border-radius:50%;
`

const BarNav = styled(Link)`
    color:#fff;
    text-decoration:none;
`





// Main Function
export default function ProfileLeftbar({profileUser}) {

    const PF = 'http://localhost:3000/Images/';
    const [friends, setFriends] = useState([[{}]]);

    useEffect(() => {
        const FriendsFetcher = async () => {
            const res = await axios.get(`https://jobook-server-side.herokuapp.com/users/friends/${profileUser.userId}`);
            setFriends(res.data);
        }
        FriendsFetcher();
    }, [profileUser.userId]);

    const BarNavHandler = () => {
        window.location.reload();
    }

    return (
        <Fade left>
            <LeftbarContainer>
                {profileUser.firstname !== undefined ? 
                    <LeftbarWrapper>
                        <Ul>
                            {profileUser.from !== '' && <Li>From: {profileUser.from}</Li>}
                            <Li>Relationship: {profileUser.married ? 'Married' : 'Single'}</Li>
                        </Ul>
                        {friends[0] !== undefined && <FriendsH1>Friends</FriendsH1>}
                        {
                            friends[0] !== undefined && 
                            <FriendsUl>
                                {friends.map(friend => (
                                    friend[0].firstname !== undefined ? <FriendsLi onClick={BarNavHandler}><BarNav to={`/profile/${friend[0] && friend[0].firstname}`}><FriendImg src={profileUser.profilePic ? PF + profileUser.profilePic : NoUser} /></BarNav><BarNav to={`/profile/${friend[0] && friend[0].firstname}`}>{`${friend[0] && friend[0].firstname} ${friend[0] && friend[0].lastname}`}</BarNav></FriendsLi> : <CircularProgress />
                                ))}
                            </FriendsUl>
                        }
                    </LeftbarWrapper> : <CircularProgress />
                }
            </LeftbarContainer>
        </Fade>
    )
}

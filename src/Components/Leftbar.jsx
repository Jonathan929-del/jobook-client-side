// Imports
import axios from 'axios';
import Fade from 'react-reveal/Fade';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {useEffect, useState} from 'react';
import NoUser from '../Images/NoUser.png';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';





// Styles
const LeftbarContainer = styled.aside`
    left:0;
    top:70px;
    z-index:9;
    width:300px;
    display:flex;
    position:fixed;
    align-items:center;
    justify-content:center;
    height:calc(100vh - 70px);
    background-color:#1a1a1a;

    @media screen and (max-width:992px){
        width:250px;
    }

    @media screen and (max-width:768px){
        display:none;
    }
`

const LeftbarWrraper = styled.div`
    width:80%;
    height:80%;
    display:flex;
    flex-direction:column;
`

const TopContainer = styled.div`
    
`

const ImgContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
`

const Img = styled.img`
    width:100px;
    height:100px;
    object-fit:cover;
    border-radius:100%;
`

const TextArea = styled.div`
    width:100%;
    height:25px;
    display:flex;
    align-items:center;
    justify-content:center;
`

const UserName = styled.h2`
    font-size:19px;
    margin-top:50px;
    font-weight:500;
`

const PostArea = styled.div`
    display:flex;
    margin-top:50px;
    align-items: center;
    justify-content:center;
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
`

const FriendsArea = styled.div`
    display:flex;
    flex-direction:column;
    margin:100px 0 0 20px;
    align-items: flex-start;
`

const FriendsHeading = styled.h2`
    font-size:27px;
    font-weight:500;
`

const FriendsUl = styled.ul`
    width:100%;
    display:flex;
    list-style:none;
    margin-top:-10px;
    align-items:center;
    flex-direction:column;
    justify-content:center;
`

const FriendsLi = styled.li`
    display:flex;
    width:140%;
    font-size:20px;
    margin-top:15px;
    align-items:center;
    justify-content:center;
    justify-content: flex-start;

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

const CircularContainer = styled.div`
    width:100%;
    margin:30px  0 0 -80px;
`





// Main Function
export default function Leftbar() {

    const PF = 'http://localhost:3000/Images/';
    const [friends, setFriends] = useState([[{}]]);
    const currentUser = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const FriendsFetcher = async () => {
            const res = await axios.get(`https://jobook-server-side.herokuapp.com/users/friends/${currentUser.userId}`);
            setFriends(res.data);
        }
        FriendsFetcher();
    }, [currentUser.userId]);

    return (
        <Fade left>
            <LeftbarContainer>
                <LeftbarWrraper>
                    <TopContainer>                    
                        <ImgContainer>
                            <BarNav to={`/profile/${currentUser.firstname}`}><Img src={currentUser.profilePic ? PF + currentUser.profilePic : NoUser}/></BarNav>
                        </ImgContainer>
                        <TextArea>
                            <UserName>{`${currentUser.firstname} ${currentUser.lastname}`}</UserName>
                        </TextArea>
                        <PostArea>
                            <BarNav to='/share'><PostButton>Share A Post</PostButton></BarNav>
                        </PostArea>
                    </TopContainer>
                    {friends[0] !== undefined &&
                        <FriendsArea>
                            <FriendsHeading>Friends</FriendsHeading>
                            <FriendsUl>
                                {friends.map(friend => (
                                    <FriendsLi><BarNav to={`/profile/${friend[0].firstname}`}><FriendImg src={currentUser.profilePic ? PF + currentUser.profilePic : NoUser} /></BarNav><BarNav to={`/profile/${friend[0].firstname}`}>{`${friend[0].firstname} ${friend[0].lastname}`}</BarNav></FriendsLi>
                                ))}
                            </FriendsUl>
                        </FriendsArea>
                    }
                </LeftbarWrraper>
            </LeftbarContainer>
        </Fade>
    )
}


// friends[1].firstname !== undefined ? 
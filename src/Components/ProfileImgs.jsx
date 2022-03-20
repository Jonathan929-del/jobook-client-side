// Imports
import axios from 'axios';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router';
import styled from 'styled-components';
import {useState, useEffect} from 'react';
import NoUser from '../Images/NoUser.png';
import NoCover from '../Images/NoCover.png';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';





// Styles
const ProfileContainer = styled.div`
    top:0;
    height:350px;
    position:absolute;
    margin:70px 0 0 300px;
    margin-bottom:1000000px;
    width:calc(100vw - 305px);

    @media screen and (max-width:992px){
        width:calc(100vw - 5px);
        margin:unset;
    }

    @media screen and (max-width:500px){
        height:250px;
    }

    @media screen and (max-width:380px){
        height:300px;
    }
`

const BackgroundImg = styled.img`
    width:100%;
    height:100%;
    border-radius:5px;
    object-fit:${({profileUser}) => profileUser ? '' : 'cover'};
`

const ProfileWrapper = styled.div`
    display:flex;
    align-items:center;

    @media screen and (max-width:768px){
        align-items:unset;
        flex-direction:column;
    }
`

const ProfileImg = styled.img`
    width:100px;
    height:100px;
    object-fit:cover;
    border-radius:50%;
    margin:-50px 0 0 60px;
    border:5px solid #1e1e1e;

    @media screen and (max-width:500px){
        width:70px;
        height:70px;
        margin:-30px 0 0 30px;
    }

    @media screen and (max-width:380px){
        width:70px;
        height:70px;
        margin:-30px 0 0 10px;
    }
`

const Name = styled.p`
    font-size:20px;
    margin-top:10px;

    @media screen and (max-width:500px){
        font-size:17px;
    }

    @media screen and (max-width:280px){
        font-size:15px;
    }
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

const BarNav = styled(Link)`
    color:#fff;
    text-decoration:none;
    margin:10px 0 0 200px;

    @media screen and (max-width:768px){
        margin:10px 0 0 50px;
    }

    @media screen and (max-width:380px){
        margin:auto;
    }
`

const FollowButton = styled.button`
    border:none;
    height:30px;
    outline:none;
    font-size:15px;
    cursor:pointer;
    color:#59c9ff;
    padding:5px 25px;
    border-radius:5px;
    margin:10px 0 0 200px;
    transition:0.2s linear;
    background-color:#383838;

    &:hover{
        color:#fff;
        background-color:#59c9ff;
    }

    @media screen and (max-width:768px){
        font-size:13px;
        padding:5px 20px;
        margin:10px 0 0 20px;
    }

    @media screen and (max-width:380px){
        margin:auto;
    }
`

const Wrapper = styled.div`
    height:50px;
    display:flex;

    @media screen and (max-width:380px){
        flex-direction:column;
    }
`

const WrapperTwo = styled.div`
    display:flex;
`





export default function ProfileImgs({profileUser}) {

    const [user, setUser] = useState({});
    const PF = 'http://localhost:3000/Images/';
    const userFirstname = useParams().firstname;
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const [followed, setFollowed] = useState(false);

    const FollowFunction = async () => {
        try {
            if(followed){
                await axios.put(`https://jobook-server-side.herokuapp.com/users/unfollow/${user && user.userId}`, {userId:currentUser.userId});
                setFollowed(!followed);
            }else{
                await axios.put(`https://jobook-server-side.herokuapp.com/users/follow/${user && user.userId}`, {userId:currentUser.userId});
                setFollowed(!followed);
            }
        } catch(err){
            console.log(err)
        }
    }

    const UserFetcher = async () => {
        try {
            const res = await axios.get(`https://jobook-server-side.herokuapp.com/users/name?firstname=${userFirstname}`);
            setUser(res.data);
        } catch (err){
            console.log(err);
        }
    }
    UserFetcher();

    useEffect(() => {
        const Follow = async () => {
            setFollowed(user.followers ? user.followers.includes(currentUser.userId) : false);
        }
        Follow();
    })

    return (
        <ProfileContainer>
            <BackgroundImg src={profileUser.backgroundPic ? PF + profileUser.backgroundPic : NoCover} profileUser={profileUser.backgroundPic}/>
            <ProfileWrapper>
                <Wrapper>
                    <WrapperTwo>
                        <ProfileImg src={profileUser.profilePic ? PF + profileUser.profilePic : NoUser}/>
                        {profileUser.firstname !== undefined ? <Name>{`${profileUser.firstname} ${profileUser.lastname}`}</Name> : ''}
                    </WrapperTwo>
                    {profileUser.firstname === currentUser.firstname ? <BarNav to='/share'><PostButton>Share A Post</PostButton></BarNav> : <FollowButton onClick={FollowFunction}>{followed ? 'Unfollow' : 'Follow'}</FollowButton>}
                </Wrapper>
            </ProfileWrapper>
        </ProfileContainer>
    )
}
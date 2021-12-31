// Imports
import axios from 'axios';
import Post from './Post';
import {useParams} from 'react-router';
import styled from 'styled-components';
import {useEffect, useState} from 'react';





// Styles
const FeedContainer = styled.div`
    
`

const P = styled.p`
    margin-top:200px;
    text-align:center;
`





// Main Function
export default function Feed({profileUser}) {

    const [posts, setPosts] = useState([{}]);
    const currentUser = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const PostsFetcher = async () => {
            try {
                const res = profileUser
                    ? await axios.get(`http://localhost:4000/posts/user-posts/${profileUser.userId}`)
                    : await axios.get(`http://localhost:4000/posts/friends-posts/${currentUser.userId}`);
                setPosts(res.data);
                const followRes = await axios.get(`http://localhost:4000/users/name?firstname=${userFirstname}`);
                setUser(followRes.data);
            } catch (err) {
                console.log(err);
            }
        }
        PostsFetcher();
    }, [profileUser ? profileUser.userId : currentUser.userId])




    
    // Follow Functions
    const [user, setUser] = useState({});
    const userFirstname = useParams().firstname;
    const [followed, setFollowed] = useState(false);

    const UserFetcher = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/users/name?firstname=${userFirstname}`);
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
        <FeedContainer>
            {
                posts.length > 0 
                ? posts.map(post => (
                    <Post profileUser={profileUser} post={post} />
                ))
                : <P>No Posts To Show</P>
            }
        </FeedContainer>
    )
}

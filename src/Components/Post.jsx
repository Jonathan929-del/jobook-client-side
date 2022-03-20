// Imports
import axios from 'axios';
import {useRef} from 'react';
import {format} from 'timeago.js';
import Fade from 'react-reveal/Fade';
import {Link} from 'react-router-dom';
import {IoSend} from 'react-icons/io5';
import styled from 'styled-components';
import NoUser from '../Images/NoUser.png';
import {useEffect, useState} from 'react';
import {AiFillHeart} from 'react-icons/ai';
import {BsThreeDotsVertical} from 'react-icons/bs';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';





// Styles
const PostsContainer = styled.div`
    margin:100px 0 100px 330px;

    @media screen and (max-width:992px){
        margin:100px 0 100px 280px;
    }

    @media screen and (max-width:768px){
        margin:100px auto;
    }

    @media screen and (max-width:500px){
        margin:0;
    }
`

const PostContainer = styled.div`
    width:600px;
    height:550px;
    margin-top:50px;
    position:relative;
    border-radius:10px;
    background-color:#383838;
    height:${({img}) => img ? '300px' : '550px'};

    @media screen and (max-width:992px){
        width:470px;
        height:${({img}) => img ? '300px' : '550px'};
    }

    @media screen and (max-width:500px){
        width:350px;
        margin-top:100px;
        height:${({img}) => img ? '250px' : '450px'};
    }

    @media screen and (max-width:380px){
        width:230px;
        margin-bottom:-50px;
        height:${({img}) => img ? '200px' : '330px'};
    }
`

const NameArea = styled.div`
    width:90%;
    margin:auto;
    display:flex;
    padding-top:10px;
    position:relative;
    align-items:center;
`

const UserImgContainer = styled.div`
    
`

const Img = styled.img`
    width:70px;
    height:70px;
    cursor:pointer;
    object-fit:cover;
    border-radius:50%;

    @media screen and (max-width:500px){
        width:50px;
        height:50px;
    }

    @media screen and (max-width:380px){
        width:35px;
        height:35px;
    }
`

const Name = styled.h3`
    font-size:22px;
    font-weight:500;
    margin-left:5px;

    @media screen and (max-width:500px){
        font-size:18px;
    }

    @media screen and (max-width:380px){
        font-size:13px;
        margin-left:2px;
    }
`

const Date = styled.p`
    font-size:12px;
    margin-left:10px;

    @media screen and (max-width:500px){
        font-size:10px;
    }

    @media screen and (max-width:380px){
        font-size:8px;
        margin-left:2px;
    }
`

const Icon = styled(BsThreeDotsVertical)`
    top:30px;
    right:0px;
    cursor:pointer;
    font-size:30px;
    position:absolute;

    @media screen and (max-width:500px){
        font-size:20px;
    }

    @media screen and (max-width:380px){
        top:25px;
        font-size:15px;
    }
`

const TheLink = styled(Link)`
    color:#fff;
    text-decoration:none;
`

const PostArea = styled.div`
    width:90%;
    height:${({img}) => img ? '30%' : '60%'};
    display:flex;
    margin:20px auto;
    flex-direction:column;
    justify-content:space-between;
`

const Caption = styled.p`
    font-size:16px;
    
    @media screen and (max-width:380px){
        font-size:14px;
    }
`

const PostImgContainer = styled.div`
    
`

const TheImg = styled.img`
    width:480px;
    height:250px;
    object-fit:cover;
    border-radius:5px;
    margin-bottom:200px;
    
    @media screen and (max-width:992px){
        width:400px;
    }

    @media screen and (max-width:500px){
        width:320px;
        height:200px;
    }

    @media screen and (max-width:380px){
        width:200px;
        height:120px;
        margin-bottom:200px;
    }
`

const LikesArea = styled.div`
    width:90%;
    display:flex;
    margin:5px auto;
    align-items:center;
    justify-content:space-between;

    @media screen and (max-width:992px){
        margin-top:20px;
    }

    @media screen and (max-width:500px){
        margin-top:-10px;
    }

    @media screen and (max-width:380px){
        margin-top:-30px;
    }
`

const LikesContainer = styled.div`
    width:100px;
    display:flex;
    align-items:center;
    justify-content:space-between;

    @media screen and (max-width:500px){
        width:70px;
        font-size:12px;
    }
`

const LikeIcon = styled(AiFillHeart)`
    cursor:pointer;
    font-size:40px;
    transition:0.2s linear;
    color:${({uiLike}) => uiLike ? '#59c9ff' : '#fff'};

    &:hover{
        transform: scale(1.2);
    }

    @media screen and (max-width:500px){
        font-size:30px;
    }
`

const CommentsArea = styled.div`
    cursor:pointer;
    transition:0.2s linear;

    &:hover{
        color:#59c9ff;
    }

    @media screen and (max-width:500px){
        font-size:12px;
    }
`

const Likey = styled.p`
    cursor:pointer;
    transition:0.2s linear;

    &:hover{
        color:#59c9ff;
    }

    @media screen and (max-width:500px){
        font-size:12px;
        margin-left:3px;
    }
`

const UsersLikes = styled.div`
    left:0;
    top:-550px;
    width:600px;
    opacity:0.995;
    position:absolute;
    overflow-y:scroll;
    border-radius:10px;
    background-color:#1a1a1a;
    top:${({img}) => img ? '-300px' : '-550px'};
    height:${({img}) => img ? '240px' : '420px'};
    display:${({isOpened}) => isOpened ? 'block' : 'none'};

    &::-webkit-scrollbar{
        width:2px;
    }

    ::-webkit-scrollbar-thumb{
        border-radius:10px;
        background-color:#59c9ff;
    }

    @media screen and (max-width:992px){
        width:470px;
    }

    @media screen and (max-width:500px){
        top:-470px;
        width:350px;
        height:370px;
    }

    @media screen and (max-width:380px){
        top:-280px;
        width:230px;
        height:260px;
    }
`

const Ul = styled.ul`
    
`

const Li = styled.li`
    display:flex;
    list-style:none;
    align-items:center;
    margin-bottom:20px;

    @media screen and (max-width:380px){
        margin-bottom:10px;
        margin-left:-20px;
    }
`

const LikeImg = styled.img`
    width:60px;
    height:60px;
    object-fit:cover;
    border-radius:50%;

    @media screen and (max-width:500px){
        width:45px;
        height:45px;
    }

    @media screen and (max-width:380px){
        width:40px;
        height:40px;
    }
`

const LikeName = styled.p`
    font-size:18px;
    margin-left:10px;

    @media screen and (max-width:500px){
        font-size:15px;
        margin-left:5px;
    }

    @media screen and (max-width:500px){
        font-size:13px;
    }
`

const LikeLink = styled(Link)`
    color:#fff;
    text-decoration:none;
`

const LikeHeading = styled.h2`
    margin:30px 0;
    font-size:25px;
    font-weight:500;
    text-align:center;

    @media screen and (max-width:500px){
        font-size:22px;
    }

    @media screen and (max-width:380px){
        font-size:16px;
    }
`

const P = styled.p`
    font-size:16px;
    text-align:center;
    margin-top:${({img}) => img ? '50px' : '150px'};

    @media screen and (max-width:500px){
        font-size:13px;
        margin:75px 25px 0 0;
    }

    @media screen and (max-width:380px){
        font-size:11px;
        margin:75px 25px 0 0;
    }
`

const UsersComments = styled.div`
    left:0;
    width:600px;
    opacity:0.995;
    position:absolute;
    overflow-y:scroll;
    border-radius:10px;
    background-color:#1a1a1a;
    top:${({img}) => img ? '-300px' : '-550px'};
    height:${({img}) => img ? '240px' : '420px'};
    display:${({isOpenedComments}) => isOpenedComments ? 'block' : 'none'};

    &::-webkit-scrollbar{
        width:2px;
    }

    ::-webkit-scrollbar-thumb{
        border-radius:10px;
        background-color:#59c9ff;
    }

    @media screen and (max-width:992px){
        width:470px;
    }

    @media screen and (max-width:500px){
        top:-470px;
        width:350px;
        height:370px;
    }

    @media screen and (max-width:380px){
        top:-280px;
        width:230px;
        height:260px;
    }
`

const CommentsHeading = styled.h2`
    margin:30px 0;
    font-size:25px;
    font-weight:500;
    text-align:center;

    @media screen and (max-width:500px){
        font-size:22px;
    }

    @media screen and (max-width:380px){
        font-size:16px;
    }
`

const CommentsUl = styled.ul`
    @media screen and (max-width:380px){
        display:flex;
        align-items:center;
        flex-direction:column;
    }
`

const CommentsLi = styled.li`
    width:85%;
    list-style:none;
    padding:10px 20px;
    position:relative;
    margin-bottom:50px;
    border-radius:10px;
    background-color:#1e1e1e;

    @media screen and (max-width:992px){
        width:80%;
    }

    @media screen and (max-width:500px){
        margin-left:-20px;
        margin:0 0 20px -20px;
    }

    @media screen and (max-width:380px){
        width:90%;
        margin-right:15px;
    }
`

const TopComment = styled.div`
    display:flex;
    align-items:center;
`

const CommentImg = styled.img`
    width:50px;
    height:50px;
    object-fit:cover;
    border-radius:50%;

    @media screen and (max-width:380px){
        width:40px;
        height:40px;
    }
`

const CommentName = styled.p`
    font-size:16px;
    font-weight:400;
    margin-left:5px;

    @media screen and (max-width:992px){
        font-size:14px;
    }

    @media screen and (max-width:380px){
        font-size:12px;
    }
`

const BottomComment = styled.p`
    font-size:18px;
    font-weight:200;

    @media screen and (max-width:992px){
        font-size:15px;
    }

    @media screen and (max-width:380px){
        font-size:14px;
    }
`

const PostComment = styled.form`
    width:90%;
    display:flex;
    align-items:center;
    margin:-20px 0 0 30px;
    justify-content:space-between;

    @media screen and (max-width:500px){
        margin:-25px 0 15px 20px;   
    }

    @media screen and (max-width:380px){
        width:90%;
        margin:-35px 0 30px 15px;
    }
`

const CommentInput = styled.input`
    height:0;
    width:100%;
    border:none;
    outline:none;
    font-size:13px;
    color:#59c9ff;
    border-radius:5px;
    padding:15px 15px;
    background-color:#383838;
    border:2px solid #59c9ff;

    @media screen and (max-width:992px){
        font-size:12px;
        padding:15px 5px;
    }

    @media screen and (max-width:500px){
        font-size:10px;
        padding:10px 5px;
    }
`

const CommentBtn = styled.button`
    border:none;
    outline:none;
    color:#fff;
    font-size:13px;
    cursor:pointer;
    margin-left:5px;
    padding:8px 20px;
    border-radius:5px;
    transition:0.2s linear;
    background-color:#59c9ff;

    &:hover{
        color:#59c9ff;
        background-color:#fff;
    }

    @media screen and (max-width:992px){
        padding:8px 20px;
    }

    @media screen and (max-width:500px){
        padding:4px 15px;
    }

    @media screen and (max-width:380px){
        padding:3px 10px;
    }
`

const CommentIcon = styled(IoSend)`

`

const UserCommentIcon = styled(BsThreeDotsVertical)`
    top:15px;
    right:10px;
    cursor:pointer;
    position:absolute;

    @media screen and (max-width:500px){
        top:25px;
    }

    @media screen and (max-width:380px){
        top:20px;
    }
`

const CircularIconContainer = styled.div`
    width:600px;
    height:550px;
    display:flex;
    align-items:center;
    justify-content:center;

    @media screen and (max-width:992px){
        width:470px;
        height:550px;
    }

    @media screen and (max-width:500px){
        width:350px;
        height:470px;
        margin-top:100px;
    }

    @media screen and (max-width:380px){
        width:230px;
        height:330px;
        margin-bottom:-50px;
    }
`

const CircularContainer = styled.div`
    width:100%;
    height:100%;
    display:flex;
    margin-top:100px;
    align-items:center;
    justify-content:center;
`





// Main Function
export default function Post({profileUser, post}) {

    // Variables
    const commentText = useRef();
    const [user, setUser] = useState('');
    const [likes, setLikes] = useState();
    const [input, setInput] = useState({});
    const [postId, setPostId] = useState('');
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [isOpened, setIsOpened] = useState(false);
    const [likedUsers, setLikedUsers] = useState([{}]);
    const [commentsLength, setCommentsLength] = useState();
    const [commentPostId, setCommentPostId] = useState('');
    const [userComment, setUserComment] = useState([[{}]]);
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const [commentLikeLength, setCommentLikeLength] = useState();
    const [img, setImg] = useState(post.img === '' ? true : false);
    const [isOpenedComments, setIsOpenedComments] = useState(false);

    // Like Function
    useEffect(() => {
        const UserFetcher = async () => {
            try {
                const res = await axios.get(`https://jobook-server-side.herokuapp.com/users/name?userId=${post.userId}`);
                setUser(res.data);
                setPostId(post.postId);
                setLikes(post.likes.length);
                setLiked(post.likes.includes(currentUser.userId));
                const likedRes = await axios.get(`https://jobook-server-side.herokuapp.com/posts/liked-users/${post.postId}`);
                setLikedUsers(likedRes.data);
            } catch (err) {
                console.log(err);
            }
        }
        UserFetcher();
    }, [post.userId])

    const LikeHandler = async () => {
        try {
            const res = await axios.put(`https://jobook-server-side.herokuapp.com/posts/like`, {userId:currentUser.userId, postId:postId});
            setPostId(post.postId);
            setLiked(res.data === 'You Liked The Post');
            setLikes(liked == true ? likes - 1 : likes + 1);
            liked == true ? localStorage.setItem('liked', true) : localStorage.setItem('liked', false);
            const likedRes = await axios.get(`https://jobook-server-side.herokuapp.com/posts/liked-users/${post.postId}`);
            setLikedUsers(likedRes.data);
        } catch (err) {
            console.log(err);
        }
    }

    // Open Handlers
    const OpenHandler = () => {
        setIsOpened(!isOpened);
        isOpenedComments && setIsOpenedComments(false);
    }

    const  CommentsOpener = () => {
        setIsOpenedComments(!isOpenedComments);
        isOpened && setIsOpened(false);
        setCommentPostId(post.postId);
    }

    const uiLike = liked;

    // Comment Functions
    useEffect(() => {
        const CommentsFunction = async () => {
            try {
                const res = await axios.get(`https://jobook-server-side.herokuapp.com/posts/comments/${commentPostId}`);
                setComments(res.data[0]);
                setUserComment(res.data[1]);
                setCommentLikeLength(res.data[2]);
            } catch (err) {
                console.log(err);
            }
        }
        CommentsFunction();
    }, [commentPostId, post.postId])

    useEffect(() => {
        const CommentsFetcher = async () => {
            try {
                await axios.post('https://jobook-server-side.herokuapp.com/posts/post-comment', input);
            } catch (err) {
                console.log(err);
            }
        }
        CommentsFetcher();
    }, [input])

    useEffect(() => {
        const CommentsNumber = async () => {
            try {
                const res = await axios.get(`https://jobook-server-side.herokuapp.com/posts/comments-num/${post.postId}`);
                setCommentsLength(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        CommentsNumber();
    }, [post.postId])

    const CommentSubmitter = e => {
        e.preventDefault();
        setIsOpenedComments(true);
        setInput({
            userId:currentUser.userId,
            postId:postId,
            comment:commentText.current.value,
            commentId:Math.floor(Math.random() * 10000000000000000000000)
        })
        commentText.current.value = '';
    }

    // Comments Like
    const CommentLikeHandler = async () => {
        try {
            axios.put('https://jobook-server-side.herokuapp.com/like-comment', {userId:currentUser.userId});
        } catch (err) {
            console.log(err);
        }
    }

    console.log(post);

    return (
        <PostsContainer>
            {user.firstname === undefined ? <CircularIconContainer><CircularProgress/></CircularIconContainer> : <Fade bottom>
                {post !== null &&
                    <PostContainer img={img}>
                        <div />
                        <NameArea>
                            <UserImgContainer>
                                <TheLink to={`/profile/${user.firstname}`}><Img src={user.img ? user.img : NoUser}/></TheLink>
                            </UserImgContainer>
                            <TheLink to={`/profile/${user.firstname}`}><Name>{`${user.firstname} ${user.lastname}`}</Name></TheLink>
                            <Date>{format(post.createdAt)}</Date>
                            <Icon />
                        </NameArea>
                        <PostArea img={img}>
                            <Caption>{post.desc}</Caption>
                            {img ? '' :
                                <PostImgContainer>
                                    <TheImg src={`${PF}/${post.img}`}/>
                                </PostImgContainer>
                            }
                        </PostArea>
                        <PostComment onSubmit={CommentSubmitter}>
                                <CommentInput ref={commentText} placeholder="Write A Comment" maxLength="100"/>
                                <CommentBtn><CommentIcon /></CommentBtn>
                        </PostComment>
                        <LikesArea>
                            <LikesContainer>
                                <LikeIcon onClick={LikeHandler} uiLike={uiLike}/>
                                {likes} <Likey onClick={OpenHandler}>Likes</Likey>
                            </LikesContainer>
                            <CommentsArea onClick={CommentsOpener}>Comments: {commentsLength}</CommentsArea>
                        </LikesArea>
                    </PostContainer>
                }
                <UsersLikes isOpened={isOpened} img={img}>
                    <Fade bottom>
                        <LikeHeading>Likes</LikeHeading>
                        <Ul>
                            {likedUsers.length > 0 ? likedUsers.map(user => (
                                <Fade left>
                                    {user && user.firstname !== undefined ? 
                                        <Li>
                                            <LikeLink to={`/profile/${user && user.firstname}`}><LikeImg src={user.img ? PF + user.img : NoUser}/></LikeLink>
                                            <LikeLink to={`/profile/${user && user.firstname}`}><LikeName>{`${user ? user.firstname : 'Unexisting'} ${user ? user.lastname : 'User'}`}</LikeName></LikeLink>
                                        </Li>
                                        : <CircularProgress />
                                    }
                                </Fade>
                            )) : <P img={img}>This Post Has No Likes</P>}
                        </Ul>
                    </Fade>
                </UsersLikes>
                <UsersComments isOpenedComments={isOpenedComments} img={img}>
                    <Fade bottom>
                        <CommentsHeading>Comments</CommentsHeading>
                        {userComment[0] && userComment[0][0].firstname !== undefined ?
                            <CommentsUl>
                                {userComment.length > 0 ? userComment.map(user => (
                                    <CommentsLi>
                                        <TopComment>
                                            <CommentImg src={userComment.img ? PF + userComment.img : NoUser}/>
                                            <CommentName>{`${user[0].firstname} ${user[0].lastname}`}</CommentName>
                                            <UserCommentIcon />
                                        </TopComment>
                                        <BottomComment>
                                            {comments[userComment.indexOf(user)]}
                                        </BottomComment>
                                    </CommentsLi>
                                )) : <CircularContainer><CircularProgress /></CircularContainer>
                                }
                            </CommentsUl>
                            : <P img={img}>No Comments Yet</P>
                        }
                    </Fade>
                </UsersComments>
            </Fade>}
        </PostsContainer>
    )
}
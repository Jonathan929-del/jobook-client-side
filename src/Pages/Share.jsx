// Imports
import axios from 'axios';
import Nav from '../Components/Nav';
import Fade from 'react-reveal/Fade';
import styled from 'styled-components';
import {useState, useRef} from 'react';
import {useHistory} from 'react-router';
import PopupBar from '../Components/PopupBar';





// Styles
const ShareSection = styled.section`
    width:100%;
    height:100vh;
    display:flex;
    align-items:center;
    justify-content:center;
`

const ShareContainer = styled.div`
    width:80%;
    height:80%;
    display:flex;
    align-items:center;
    flex-direction:column;
`

const ShareHeading = styled.h1`
    font-size:30px;
    font-weight:500;
`

const InputsArea = styled.form`
    width:100%;
    height:80%;
    display:flex;
    align-items:center;
    flex-direction:column;
    justify-content:center;
`

const Input = styled.input`
    border:none;
    width:300px;
    outline:none;
    padding:15px;
    color:#59c9ff;
    border-radius:5px;
    background-color:#383838;
    border:3px solid #59c9ff;

    &::placeholder{
        color:#b4e6ff;
    }

    @media screen and (max-width:380px){
        width:200px;
    }
`

const ImgArea = styled.div`
    position:relative;
`

const Img = styled.img`
    width:500px;
    margin-top:50px;
    border-radius:5px;

    @media screen and (max-width:600px){
        width:300px;
    }

    @media screen and (max-width:350px){
        width:250px;
    }
`

const Span = styled.span`
    top:60px;
    right:10px;
    font-size:18px;
    cursor:pointer;
    padding:5px 10px;
    position:absolute;
    border-radius:50%;
    transition:0.2s linear;
    background-color:#000000b8;

    &:hover{
        color:#59c9ff;
    }

    @media screen and (max-width:600px){
        font-size:12px;
    }
`

const ChooseFileIcon = styled.label`
    cursor:pointer;
    margin-top:50px;
`

const InputFile = styled.input`
    display:none;   
`

const PostButton = styled.div`
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

const ShareBtn = styled.button`
    border:none;
    outline:none;
    font-size:25px;
    cursor:pointer;
    color:#59c9ff;
    margin-top:20px;
    padding:10px 50px;
    border-radius:5px;
    transition:0.2s linear;
    background-color:#383838;

    &:hover{
        color:#fff;
        background-color:#59c9ff;
    }
`





// Main Function
export default function Share() {

    const [isWritten, setIsWritten] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const OpenHandler = () => {
      setIsOpen(!isOpen);
    }
    const history = useHistory();
    const description = useRef();
    const [file, setFile] = useState(null);
    const currentUser = JSON.parse(localStorage.getItem('user'));

    const SubmitHandler = async e => {
        e.preventDefault();
        const input = {
            userId:currentUser.userId,
            desc:description.current.value,
            postId:Math.floor(Math.random() * 1000000000)
        }
        if(file){
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append('name', fileName);
            data.append('file', file);
            input.img = fileName;
            try {
                await axios.post('http://localhost:4000/api/upload', data);
            } catch (err) {
                console.log(err);
            }
        }
        try {
            await axios.post('http://localhost:4000/posts', input);
        } catch (err) {
            console.log(err);
        }
        history.push(`/profile/${currentUser.firstname}`);
    }
    
    return (
        <ShareSection>
            <Nav OpenHandler={OpenHandler}/>
            <PopupBar isOpen={isOpen} OpenHandler={OpenHandler}/>
            <ShareContainer>
                <Fade top><ShareHeading>Share A Post</ShareHeading></Fade>
                <InputsArea onSubmit={SubmitHandler} encType="multipart/form-data">
                    <Fade left><Input type="text" placeholder="Place Your Post Description" onChange={e =>  e.target.value.length !== 0 ? setIsWritten(true) : setIsWritten(false)} ref={description}/></Fade>
                    {file && 
                        <ImgArea>
                            <Fade bottom><Img src={URL.createObjectURL(file)} className="imgFile" alt="User's Post"/></Fade>
                            <Span onClick={() => setFile(null)}>X</Span>
                        </ImgArea>
                    }
                    {!file && 
                        <ChooseFileIcon htmlFor="file">
                            <InputFile type="file" id="file" accept=".png, .jpg, .jpeg" onChange={e => setFile(e.target.files[0])} name='file'/>
                            <Fade bottom><PostButton>Choose An Image</PostButton></Fade>
                        </ChooseFileIcon>
                    }
                    {
                        isWritten && <Fade bottom><ShareBtn isWritten={isWritten}>Share</ShareBtn></Fade>
                    }
                </InputsArea>
            </ShareContainer>
        </ShareSection>
    )
}
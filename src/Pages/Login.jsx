// Imports
import axios from 'axios';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {useRef, useEffect, useState} from 'react';





// Styles
const LoginSection = styled.section`
    width:100%;
    height:100vh;
    display:flex;
    align-items:center;
    flex-direction:column;
    justify-content:center;
`

const LoginContainer = styled.div`
    width:80%;
    height:80%;
`

const MainHeading = styled.h1`
    font-size:35px;
    text-align:center;

    @media screen and (max-width:400px){
        font-size:27px;
    }

    @media screen and (max-width:300px){
        font-size:24px;
    }
`

const HeadingSpan = styled.span`
    color:#59c9ff;
`

const LoginHeading = styled.h1`
    font-size:30px;
    font-weight:500;
    text-align:center;
`

const Form = styled.form`
    height:50%;
    display:flex;
    margin-top:100px;
    position:relative;
    align-items:center;
    flex-direction:column;
    justify-content:space-between;
`

const Message = styled.span`
    top:-50px;
    font-size:13px;
    padding:5px 30px;
    border-radius:5px;
    text-align:center;
    position:absolute;
    transition:0.5s linear;
    background-color:#ff4343;
    opacity:${({error}) => error ? '1' : '0'};

    @media screen and (max-width:500px){
        font-size:11px;
        padding:5px 30px;
    }
`

const Container = styled.div`
    width:80%;
    height:50%;
    display:flex;
    column-gap:20px;
    align-items:center;
    flex-direction:column;
    justify-content:center;
    justify-content:space-between;

    @media screen and (max-width:768px){
        height:40%;
    }
`

const Input = styled.input`
    width:500px;
    border:none;
    height:20px;
    outline:none;
    padding:15px;
    color:#59c9ff;
    border-radius:5px;
    background-color:#383838;
    border:3px solid #59c9ff;

    @media screen and (max-width:768px){
        height:10px;
        width:450px;
        font-size:13px;
    }

    @media screen and (max-width:500px){
        width:100%;
        margin-bottom:30px;
    }

    @media screen and (max-width:400px){
        font-size:11px;
    }
`

const PostButton = styled.button`
    border:none;
    outline:none;
    font-size:20px;
    cursor:pointer;
    color:#59c9ff;
    padding:5px 50px;
    text-align:center;
    border-radius:5px;
    transition:0.2s linear;
    background-color:#383838;

    &:hover{
        color:#fff;
        background-color:#59c9ff;
    }

    @media screen and (max-width:500px){
        margin-top:50px;
    }
`

const LoginArea = styled.div`
    margin-top:20px;
    text-align:center;
    @media screen and (max-width:500px){
        font-size:15px;
        margin-top:20px;
    }
`

const TheLink = styled(Link)`
    color:#fff;
    text-decoration:none;
    transition:0.2s linear;

    &:hover{
        color:#59c9ff;
    }
`





// Main Function
export default function Login() {

    const email = useRef();
    const password = useRef();
    const [error, setError] = useState(false);
    const [input, setInput] = useState({});

    useEffect(() => {
        const LoggingUser = async () => {
            try {
                const res = await axios.post('https://jobook-server-side.herokuapp.com/auth/login', input);
                if(res.data !== 'Wrong Password'){
                    localStorage.setItem('user', JSON.stringify(res.data));
                    setTimeout(() => {
                        window.location.reload();
                    })
                }else{
                    setError(true);
                }
            } catch (err) {
                console.log(err);
            }
        }
        LoggingUser();
    }, [input]);
    
    const SubmitHandler = e => {
        e.preventDefault();
        setInput({
            email:email.current.value,
            password:password.current.value,
        });
        setTimeout(() => {
            if(!error){
                setError(true);
            }
        }, 1000)
    }

    return (
        <LoginSection>
            <MainHeading>Welcome To <HeadingSpan>JoBook</HeadingSpan></MainHeading>
            <LoginContainer>
                <LoginHeading>Log In</LoginHeading>
                <Form onSubmit={SubmitHandler}>
                    <Message error={error}>Wrong Email Or Password</Message>
                    <Container>
                        <Input type="email" placeholder="Enter Your Email" ref={email}/>
                        <Input type="password" placeholder="Enter Your Password" ref={password}/>
                    </Container>
                    <PostButton>Login</PostButton>
                </Form>
                <LoginArea>
                    New To JoBook? <TheLink to="/register">Regsiter</TheLink>
                </LoginArea>
            </LoginContainer>
        </LoginSection>
    )
}

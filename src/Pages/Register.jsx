// Imports
import axios from 'axios';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {GrStatusGood} from 'react-icons/gr';
import {useEffect, useState, useRef} from 'react';





// Styles
const RegisterSection = styled.section`
    width:100%;
    height:100vh;
    display:flex;
    align-items:center;
    flex-direction:column;
    justify-content:center;
`

const RegisterContainer = styled.div`
    width:80%;
    height:80%;
`

const MainHeading = styled.h1`
    font-size:35px;
    text-align:center;

    @media screen and (max-width:500px){
        display:none;
    }
`

const HeadingSpan = styled.span`
    color:#59c9ff;
`

const LoginHeading = styled.h1`
    font-size:30px;
    font-weight:500;
    text-align:center;

    @media screen and (max-width:500px){
        margin-top:100px;
    }
`

const Message = styled.span`
    font-size:13px;
    margin-top:-30px;
    padding:5px 30px;
    border-radius:5px;
    text-align:center;
    position:absolute;
    transition:0.5s linear;
    background-color:#ff4343;
    opacity:${({error}) => error ? '1' : '0'};
`

const Form = styled.form`
    height:50%;
    display:flex;
    margin-top:50px;
    align-items:center;
    flex-direction:column;
    justify-content:space-between;
`

const Container = styled.div`
    width:80%;
    height:100%;
    display:grid;
    column-gap:20px;
    align-items:center;
    justify-content:center;
    justify-content:space-between;
    grid-template-rows:repeat(3, 1fr);
    grid-template-columns:repeat(2, 1fr);

    @media screen and (max-width:992px){
        height:80%;
        width:100%;
    }

    @media screen and (max-width:500px){
        height:400px;
        grid-template-rows:repeat(6, 1fr);
        grid-template-columns:repeat(1, 1fr);
    }
`

const Input = styled.input`
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
        font-size:13px;
    }

    @media screen and (max-width:500px){
        height:5px;
        font-size:11px;
        margin-bottom:30px;
    }
`

const Checkbox = styled.div`
    width:80%;
    display:flex;
    margin-top:10px;
    position:relative;
    align-items:center;

    @media screen and (max-width:992px){
        width:100%;
        margin-top:-50px;
    }

    @media screen and (max-width:500px){
        margin-top:50px;
    }
`

const Label = styled.label`
    @media screen and (max-width:500px){
        font-size:15px;
    }
`

const DummyInput = styled.input`
    opacity:0;
    z-index:9;
    cursor:pointer;
    margin-left:13px;
`

const CheckboxSpan = styled.span`
    left:60px;
    width:17px;
    height:17px;
    overflow:hidden;
    margin-left:10px;
    border-radius:50%;
    position:absolute;
    background-color:#59c9ff;
`

const Icon = styled(GrStatusGood)`
    color:red;
    font-size:17px;
    margin-right:15px;
    transition:0.2s linear;
    opacity:${({isChecked}) => isChecked ? '1' : '0'};
`

const PostButton = styled.button`
    border:none;
    outline:none;
    font-size:20px;
    cursor:pointer;
    color:#59c9ff;
    padding:5px 50px;
    text-align:center;
    margin-bottom:-70px;
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
    @media screen and (max-width:500px){
        font-size:13px;
        margin:150px 0 100px 0;
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
export default function Register() {

    const [isChecked, setIsChecked] = useState(false);

    const CheckHandler = () => {
        setIsChecked(!isChecked);
    }

    const firstname = useRef();
    const lastname = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const from = useRef();
    const married = useRef();
    const [input, setInput] = useState({});
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');

    useEffect(() => {
        const RegisterHandler = async () => {
            try {                
                const res = await axios.post('http://localhost:4000/auth/register', input);
                if(!localStorage.getItem('user')){
                    localStorage.setItem('user', JSON.stringify(res.data));
                }
            } catch (err) {
                console.log(err);
            }
        };
        RegisterHandler();
    }, [input]);
    
    const SubmitHandler = e => {
        e.preventDefault();
        if(password.current.value !== passwordAgain.current.value){
            setError(true);
            setErrorText("Passwords Dosn't Match");
            setTimeout(() => {
                setError(false);
            }, 2000);
        }else if(!error){
            setInput({
                firstname:firstname.current.value,
                lastname:lastname.current.value,
                email:email.current.value,
                password:password.current.value,
                from:from.current.value,
                married:married.current.value === 'true' ? true : false,
            });
            setTimeout(() => {
                if(!localStorage.getItem('user')){
                    setError(true);
                    setErrorText('You Cant Use This Email');
                    setTimeout(() => {
                        setError(false);
                    }, 2000)
                }else if(!error){
                    window.location.reload();
                }else if(error){
                    localStorage.removeItem('user');
                }
            }, 1000)
        }
    };
    
    return (
        <RegisterSection>
            <MainHeading>Welcome To <HeadingSpan>JoBook</HeadingSpan></MainHeading>
            <RegisterContainer>
                <LoginHeading>Register</LoginHeading>
                <Form onSubmit={SubmitHandler}>
                    <Message error={error}>{errorText}</Message>
                    <Container>
                        <Input type="text" placeholder="Enter Your First Name" ref={firstname} maxLength="10"/>
                        <Input type="text" placeholder="Enter Your Last Name" ref={lastname} maxLength="10"/>
                        <Input type="email" placeholder="Enter Your Email" ref={email}/>
                        <Input type="password" placeholder="Enter Your Password" ref={password}/>
                        <Input type="password" placeholder="Enter Your Password Again" ref={passwordAgain}/>
                        <Input type="text" placeholder="Enter Your Region" ref={from} maxLength="15"/>
                    </Container>
                    <Checkbox>
                        <Label htnlFor="relationship">Married</Label>
                        <DummyInput type="checkbox" placeholder="Relationship" name="relationship" onClick={CheckHandler} ref={married} value={isChecked ? true : false}/>
                        <CheckboxSpan>
                            <Icon isChecked={isChecked}/>
                        </CheckboxSpan>
                    </Checkbox>
                    <PostButton>Submit</PostButton>
                </Form>
            </RegisterContainer>
            <LoginArea>
                Already Have An Account? <TheLink to="/login">Log In</TheLink>
            </LoginArea>
        </RegisterSection>
    )
}
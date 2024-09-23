import React, { useEffect, useState } from "react";
import styled from "styled-components";
import user_icon from "./assets/username.png";
import password_icon from "./assets/password.png";
import email_icon from "./assets/email.png";
import { useNavigate } from "react-router-dom";
import { handleAuthSubmit } from '../utils/authHandlers'; 
import { useDispatch } from "react-redux"; 


const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Text = styled.h1`
  color: #779977;
  font-size: 40px;
  font-weight: 700;
  font-family: 'Garamond';

`;

const Underline = styled.div`
  width: 10%;
  height: 4px;
  background: #779977;
  border-radius: 9px;
`;

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  background: #ffffff;
  padding-bottom: 30px;
`;

const Inputs = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
`;

const Input = styled.div`
  display: flex;
  align-items: center;
  margin: auto auto 10px auto;
  width:54% ;
  height: 40px;
  background: #eaeaea;
  border-radius: 10px;
`;
const Img = styled.img`
  max-width:50px;
  max-height:30px;
`;

const SubmitContainer = styled.div`
  display: flex;
  margin:  auto;
  margin-top: 10px;
`;

const Submit = styled.button`
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  font-family: 'comic sans ms';
  align-items: center;
  width: 210px;
  height: 50px;
  color: #fff;
  background: ${props => (props.isActive ? '#88aa88' : '#ffffff')}; /* Adjust colors as needed */
  border-radius: 15px;
  font-size: 19px;
  font-weight: 600;
  cursor: pointer;
  border: none; /* Remove default border */
  outline: none; /* Remove default focus outline */
  &:focus {
    outline: none; /* Ensure focus outline is removed */
  }
    &:hover {
    background: ${props => (props.isActive ? '#885588' : '#aa88aa')}; /* Darker shade on hover */
  }
        &:active{
        transition: all 0.1s ease;
        transform:translatey(4px);
    }
`;

const Span = styled.span`
  letter-spacing: 1px;
  display:flex;
  flex-direction:column;
  color: #225522;
  cursor: pointer;
  text-align: center;
  margin-bottom: 3px;
  width:180px;
  color: #885588;
  font-size: 14px;
  font-family: 'Garamond';
  font-weight:700;

    &:hover {
    color: ${props => (props.isActive ? '#aa88aa' : '#88aa88')}; 
  }
`;
const ChangeMode = styled.div`
  display:flex;
  flex-direction:column;
  align-items: center;
`;



const MForm = styled.form`
  display: flex;
  flex-direction: column;
`;


const StyledInput = styled.input`
  height: 50px;
  width: 400px;
  background: transparent;
  border: none;
  outline: none;
  color: #797979;
  font-size: 19px;
  padding-left: 20px;

  &::placeholder {
    color: #a9a9a9
    font-style: italic; 
    font-size: 17px;
  }
`;

const Signup = () => {
  const [action, setAction] = useState("Sign Up");
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
  }, [action]);

  const handleSubmit = (event) => {
    handleAuthSubmit(event, action, email, password, name, navigate, dispatch, setAction); 
  };
  
  const handleSwitch = (newAction) => {
    setAction(newAction);
  };

  return (
    <SignupContainer>
      <Header>
        <Text>{action}</Text>
        <Underline />
      </Header>
      <MForm onSubmit={handleSubmit}>
        <Inputs>
          {action === "Login" ? null : (
            <Input>
              <StyledInput
                value={name}
                type="text"
                placeholder="Name"
                required
                onChange={(e) => setName(e.target.value)}>

              </StyledInput>

              <Img src={user_icon} alt="" />
            </Input>
          )}
          <Input>
            <StyledInput
              value={email}
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}>
            </StyledInput>
            <Img src={email_icon} alt="" />
          </Input>
          <Input >
            <StyledInput
              value={password}
              type="password"
              placeholder="Password"
              required
              minLength="8"
              maxLength="15"
              onChange={(e) => setPassword(e.target.value)}>
            </StyledInput>
            <Img src={password_icon} alt="" />
          </Input>
        </Inputs>
        <ChangeMode>
          {action === "Sign Up" ? null : (
            <Span> Lost Password? </Span>)}
          {action === "Sign Up" ?
            <Span onClick={() => handleSwitch("Login")}>Already registered?</Span> :
            <Span onClick={() => handleSwitch("Sign Up")}>Not registerd yet? </Span>
          }

        </ChangeMode>

        <SubmitContainer>
          {action === "Sign Up" ?
            <Submit type="submit" isActive={action === 'Sign Up'}>
              Sign Up
            </Submit> : null}
          {action === "Login" ?
            <Submit type="submit" isActive={action === 'Login'} >
              Log in
            </Submit> : null}
        </SubmitContainer>

      </MForm>
    </SignupContainer >
  );
};

export default Signup;

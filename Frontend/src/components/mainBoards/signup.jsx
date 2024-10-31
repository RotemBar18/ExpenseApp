import React, { useEffect, useState } from "react";
import styled from "styled-components";
import user_icon from "../assets/username.png";
import password_icon from "../assets/password.png";
import email_icon from "../assets/email.png";
import { useNavigate } from "react-router-dom";
import { handleAuthSubmit } from '../../utils/authHandlers';
import { useDispatch } from "react-redux";
import { clearBoard } from "../../redux/actions/boardActions";
import { clearPreferences } from "../../redux/actions/preferenceAction";

const PageContainer = styled.div`
  display: flex;
`;

const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.8);
  padding: 40px 50px;
  border-radius: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 40px;
  font-family: 'Poppins', sans-serif;
  color: #334e68;
`;

const Underline = styled.div`
  width: 50px;
  height: 4px;
  background: #6c91c2;
  border-radius: 9px;
  margin: 10px auto;
`;

const Inputs = styled.div`
  width: 100%;
`;

const Input = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0;
  width: 100%;
  height: 50px;
  background: #f5f5f5;
  border-radius: 30px;
  padding: 0 15px;
  box-shadow: inset 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledInput = styled.input`
  width: 90%;
  background: transparent;
  border: none;
  outline: none;
  font-size: 16px;
  color: #333;
  padding-left: 10px;

  &::placeholder {
    color: #bdbdbd;
  }
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;

const SubmitContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const SubmitButton = styled.button`
  background-color: #6c91c2;
  color: #fff;
  padding: 15px 30px;
  border-radius: 30px;
  border: none;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 200px;

  &:hover {
    background-color: #5583a9;
  }

  &:active {
    transform: translateY(3px);
  }
`;

const SwitchMode = styled.div`
  margin-top: 20px;
  color: #fff;
  font-size: 14px;
  text-align: center;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Signup = () => {
  const [action, setAction] = useState("Login");
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

  const handleSubmit = async (event) => {

    if (action === 'Login') {
        await dispatch(clearBoard());
        await dispatch(clearPreferences());
    }

    handleAuthSubmit(event, action, email, password, name, navigate, dispatch, setAction);
  };

  const handleSwitch = (newAction) => {
    setAction(newAction);
  };

  return (
    <PageContainer>
      <FormContainer>
        <Header>
          <Title>{action}</Title>
          <Underline />
        </Header>
        <form onSubmit={handleSubmit}>
          <Inputs>
            {action === "Login" ? null : (
              <Input>
                <StyledInput
                  value={name}
                  type="text"
                  placeholder="Name"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
                <Icon src={user_icon} alt="User Icon" />
              </Input>
            )}
            <Input>
              <StyledInput
                value={email}
                type="email"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <Icon src={email_icon} alt="Email Icon" />
            </Input>
            <Input>
              <StyledInput
                value={password}
                type="password"
                placeholder="Password"
                required
                minLength="8"
                maxLength="15"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Icon src={password_icon} alt="Password Icon" />
            </Input>
          </Inputs>
          <SubmitContainer>
            <SubmitButton type="submit">
              {action === "Sign Up" ? "Sign Up" : "Log in"}
            </SubmitButton>
          </SubmitContainer>
          <SwitchMode onClick={() => handleSwitch(action === "Sign Up" ? "Login" : "Sign Up")}>
            {action === "Sign Up" ? "Already registered?" : "Not registered yet?"}
          </SwitchMode>
        </form>
      </FormContainer>
    </PageContainer>
  );
};

export default Signup;

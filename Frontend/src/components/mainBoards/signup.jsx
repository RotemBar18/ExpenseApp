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
import { clearExpenses } from "../../redux/actions/expenseActions";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

const FormContainer = styled.div`
  border-radius: 15px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  width: 90%;
  max-width: 350px;
  justify-content: center;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-family: 'Poppins', sans-serif;
  color: #ffffff; // White color to stand out on dark background
  margin: 0;
`;

const Underline = styled.div`
  width: 40px;
  height: 3px;
  background: #6c91c2; // Matches the blue accent color from your theme
  border-radius: 9px;
  margin: 8px auto;
`;

const Inputs = styled.div`
  width: 100%;
`;

const Input = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  height: 45px;
  padding: 0 8px;
  background: rgba(255, 255, 255, 0.1); // Light transparent input background
  border-radius: 20px;
  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.2);
`;

const StyledInput = styled.input`
  width: 85%;
  background: transparent;
  border: none;
  outline: none;
  font-size: 14px;
  color: #ffffff; // White input text color
  padding-left: 8px;

  &::placeholder {
    color: #d3d3d3; // Light gray for placeholders
  }
`;

const Icon = styled.img`
  width: 18px;
  height: 18px;
  filter: brightness(0) invert(1); // Inverts the color to match dark background
`;

const SubmitContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

const SubmitButton = styled.button`
  background-color: #6c91c2; // Blue color matching the overall theme
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 160px;

  &:hover {
    background-color: #5583a9; // Slightly darker blue on hover
  }

  &:active {
    transform: translateY(2px);
  }
`;

const SwitchMode = styled.div`
  margin: 15px 0;
  color: #d3d3d3; // Light gray text color for switch mode
  font-size: 12px;
  text-align: center;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    color: #ffffff; // White color on hover for emphasis
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
    event.preventDefault();

    if (action === 'Login') {
      await dispatch(clearBoard());
      await dispatch(clearPreferences());
      await dispatch(clearExpenses());
      localStorage.setItem('currentIndex', 0);
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

import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Logo, FormRow, Alert} from "../components";
import styled from "styled-components";
import {useAppContext} from "../context/appContext";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState(initialState);
  //global state and useNavigate
  const {user, isLoading, showAlert, displayAlert, setupUser} = useAppContext();

  const toggleMember = () => {
    setValues({...values, isMember: !values.isMember});
  };

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const {name, email, password, isMember} = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = {name, email, password};
    if (isMember) {
      setupUser(currentUser, "login", "Login Successful! Redirecting");
    } else {
      setupUser(currentUser, "register", "User Registered! Redirecting");
    }
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user, navigate]);

  return (
    <Wrapper>
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        <div className="form-row">
          {!values.isMember && (
            <FormRow
              type="text"
              name="name"
              value={values.name}
              handleChange={handleChange}
            />
          )}
          <FormRow
            type="email"
            name="email"
            value={values.email}
            handleChange={handleChange}
          />
          <FormRow
            type="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Submit
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`;

export default Register;

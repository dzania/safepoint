import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../services/auth-service.js";
import "bootstrap/dist/css/bootstrap.css";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default function Register(props) {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const onChangePassword2 = (e) => {
    const password2 = e.target.value;
    setPassword2(password2);
  };

  const onChangeFirstName = (e) => {
    const firstname = e.target.value;
    setFirstname(firstname);
  };
  const onChangeLastName = (e) => {
    const lastname = e.target.value;
    setLastname(lastname);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(
        username,
        email,
        firstname,
        lastname,
        password,
        password2
      ).then(
        (response) => {
          setMessage("Account created");
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div class="container justify-content-center">
      <div class="card ">
        <div class="card-body ">
          <h4 class="card-title text-center">Create new account</h4>
          <Form onSubmit={handleRegister} ref={form}>
            {!successful && (
              <div>
                <div class="form-group">
                  <input
                    type="username"
                    class="form-control"
                    id="usernameInput"
                    placeholder="Username"
                    value={username}
                    onChange={onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>
                <div class="form-group">
                  <input
                    type="username"
                    class="form-control"
                    id="firstname"
                    placeholder="First name"
                    value={firstname}
                    onChange={onChangeFirstName}
                    validations={[required]}
                  />
                </div>
                <div class="form-group">
                  <input
                    class="form-control"
                    id="usernameInput"
                    placeholder="Last name"
                    value={lastname}
                    onChange={onChangeLastName}
                    validations={[required]}
                  />
                </div>
                <div class="form-group">
                  <input
                    type="email"
                    class="form-control"
                    id="emailInput"
                    placeholder="Email"
                    value={email}
                    onChange={onChangeEmail}
                    validations={[required, validEmail]}
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    id="InputPassword1"
                    placeholder="Password"
                    value={password}
                    onChange={onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    id="InputPassword2"
                    placeholder="Confirm password"
                    value={password2}
                    onChange={onChangePassword2}
                    validations={[required, vpassword]}
                  />
                </div>
                <div class="row mx-auto">
                  <div class="col-md-6">
                    <button
                      type="submit"
                      class="btn btn-primary rounded-pill btn-block"
                    >
                      Create account
                    </button>
                  </div>
                  <div class="col-md-6 my-auto ">
                    <a class="login-link" href="/login">
                      Already have an account?
                    </a>
                  </div>
                </div>
              </div>
            )}
            {message && (
              <div className="form-group">
                <div
                  className={
                    successful ? "alert alert-success" : "alert alert-danger"
                  }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Login.css";
import AuthService from "../services/auth-service.js";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default function Login(props) {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          props.history.push("/dashboard");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div class="container justify-content-center">
      <div class="card">
        <div class="card-body ">
          <h4 class="card-title text-center">Login to your account</h4>
          <Form onSubmit={handleLogin} ref={form}>
            <div className="form-group">
              <input
                type="username"
                class="form-control"
                id="usernameInput"
                placeholder="Username"
                value={username}
                onChange={onChangeUsername}
                validations={[required]}
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
                validations={[required]}
              />
            </div>

            <div class="form-group">
              <button
                type="submit"
                class="btn btn-primary rounded-pill btn-block"
                disabled={loading}
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                Login
              </button>
            </div>
            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
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

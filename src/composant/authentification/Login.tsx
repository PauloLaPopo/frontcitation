import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const login = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/user/login", {
                email: email,
                password: password,
            });

            console.log(res.data);

            if (res.data.message === "Email not exits") {
                alert("Email not exists");
            } else if (res.data.message === "Login Success") {
                navigate('/home');
            } else {
                alert("Incorrect Email and Password do not match");
            }
        } catch (err) {
            alert(err);
        }
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    <h2>Login</h2>
                    <hr />
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <form onSubmit={login}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                            <button onClick={() => navigate('/register')}>
                                Register ?
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

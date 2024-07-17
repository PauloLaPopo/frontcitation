import React, { useState } from "react";
import axios from "axios";

const Register: React.FC = () => {
    const [employeename, setEmployeename] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const save = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8085/api/v1/employee/save", {
                employeename: employeename,
                email: email,
                password: password,
            });
            alert("Employee Registration Successfully");
        } catch (err) {
            alert(err);
        }
    };

    return (
        <div>
            <div className="container mt-4">
                <div className="card">
                    <h1>Employee Registration</h1>
                    <form onSubmit={save}>
                        <div className="form-group">
                            <label htmlFor="employeename">Employee name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="employeename"
                                placeholder="Enter Name"
                                value={employeename}
                                onChange={(event) => setEmployeename(event.target.value)}
                            />
                        </div>

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

                        <button type="submit" className="btn btn-primary mt-4">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;

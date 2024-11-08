import { useState, useEffect } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

export default () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { doRequest, errors } = useRequest({
        url: "/api/users/signin",
        method: "post",
        body: {
            email,
            password,
        },
        onSuccess: () => Router.push("/"),
    });

    const onSubmit = async (event) => {
        event.preventDefault();

        await doRequest();
    };

    return (
        <div className="container mx-auto d-flex flex-column my-5">
            <form onSubmit={onSubmit} className="shadow shadow-md rounded p-3">
                <h1>Sign In</h1>
                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control"
                    />
                </div>
                {errors}
                <button className="btn btn-primary mt-3">Sign In</button>
            </form>
        </div>
    );
};

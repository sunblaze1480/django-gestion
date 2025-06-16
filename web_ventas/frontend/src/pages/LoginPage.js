import React from "react"

export const LoginPage = () => {

    const onSubmit = (e) => {
        e.preventDefault();
        const user = e.target.username.value;
        const pwd = e.target.password.value;

        loginUser(user, pwd)
    }

    return (
        <div>
            <form>
                <input type="text" name="username" placeholder="Enter Username"></input>
                <input type="pasword" name="password" placeholder="Enter Password"></input>
                <input type="submit"></input>
            </form>
        </div>
    )
}
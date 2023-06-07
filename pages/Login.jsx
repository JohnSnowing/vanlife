import React from "react";
import {
    Form,
    redirect,
    useActionData,
    useLoaderData,
    useNavigation,
} from "react-router-dom";
import { loginUser } from "../api";

export function loader({ request }) {
    //request params is default from web
    return new URL(request.url).searchParams.get("message");
}

//usenavigate another way to redirect user to other page navigate("/host", { replace: true }) means goes to the page before you go to the login page

export async function action({ request }) {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    try {
        const data = await loginUser({ email, password });
        localStorage.setItem("loggedin", true);
        return redirect("/host");
    } catch (error) {
        return error.message;
    }
}

//react router way to submit form

export default function Login() {
    const errorMessage = useActionData();
    const message = useLoaderData();
    const navigation = useNavigation();

    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>
            {message && <h3 className="red">{message}</h3>}
            {errorMessage && <h3 className="red">{errorMessage}</h3>}
            {/* Warning goes here. Give it a classname="red" */}
            {/* Form react router import to use to simplify react form */}
            <Form method="post" replace className="login-form">
                <input name="email" type="email" placeholder="Email address" />
                <input name="password" type="password" placeholder="Password" />
                {/* navigation has automatic navigation state submitting */}
                <button disabled={navigation.state === "submitting"}>
                    {navigation.state === "submitting"
                        ? "Logging in...."
                        : "Log in"}
                </button>
            </Form>
        </div>
    );
}

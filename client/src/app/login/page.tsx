import React from "react";
import Login from "../components/Login";
import Heading from "../utils/Heading";

function page() {
  return (
    <div>
      <Heading
        title="Login | Codemy"
        description="This is the login page of learning platform"
        keywords="mern web development programming"
      />
      <Login
        title="Welcome Back"
        fields={[
          {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "Enter your email",
          },
          {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "Enter your password",
          },
        ]}
      />
    </div>
  );
}

export default page;

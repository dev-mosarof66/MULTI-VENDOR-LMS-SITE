import React from "react";
import Login from "../components/Login";


function page() {
  return (
    <div>
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

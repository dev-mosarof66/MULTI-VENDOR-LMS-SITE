import React from "react";
import Login from "@/app/components/Login";
import Heading from "@/app/utils/Heading";

function page() {
  return (
    <div className="w-full h-screen">
      <Heading
        title="Login | Codemy"
        description="This is the login page of learning platform"
        keywords="mern web development programming"
      />
      <Login
        title="Admin Login"
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

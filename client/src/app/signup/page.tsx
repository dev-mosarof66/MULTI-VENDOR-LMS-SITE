import Signup from "@/app/components/Signup";
import React from "react";
import Heading from "../utils/Heading";

function page() {
  return (
    <>
      <Heading
        title="Signup | Codemy"
        description="This is the login page of learning platform"
        keywords="mern web development programming"
      />
      <Signup
        title="Create an Account"
        fields={[
          {
            name: "name",
            label: "Full Name",
            type: "text",
            placeholder: "Enter your name",
          },
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
            placeholder: "Enter a password",
          },
          {
            name: "confirmPassword",
            label: "Confirm Password",
            type: "password",
            placeholder: "Confirm your password",
          },
        ]}
      />
    </>
  );
}

export default page;

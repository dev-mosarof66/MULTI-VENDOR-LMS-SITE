import React from "react";
import Login from "@/app/components/Login";


function page() {
  return (
    <div>
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

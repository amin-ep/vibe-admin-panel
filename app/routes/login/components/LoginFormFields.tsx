import React from "react";
import FormControl from "~/components/FormControl";

type Props = { errors?: RequestError };

function LoginFormFields({ errors }: Props) {
  return (
    <>
      <FormControl
        id="identifier"
        label="Email or Username"
        name="identifier"
        placeholder="Enter your email or username"
        type="text"
        error={errors?.identifier}
      />
      <FormControl
        id="password"
        label="Password"
        name="password"
        placeholder="Enter your password"
        type="password"
        error={errors?.password}
      />
    </>
  );
}

export default LoginFormFields;

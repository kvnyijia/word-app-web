'use client'
import React from "react";
import { Form, Formik } from "formik";
import { Box, Button, Flex } from "@chakra-ui/react";
import { InputField } from "../../components/InputField";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import { userServices } from "../../utils/userServices";

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={async (values, actions) => {
        let {ok} = await userServices.login(values);
        if (ok) {
          router.push("/");
        } else {
          actions.setErrors({password: "Invalid username or password"});
        }
      }}
    >
      {(props) => (
        <Form>
          <InputField
            name="username"
            placeholder="Username"
            label="Username"
            type="text"
          />
          <Box mt={4}>
            <InputField
              name="password"
              placeholder="Password"
              label="Password"
              type="password"
            />
          </Box>
          <Flex mt={2}>
            <NextLink href="/forget-password">
              Forget password?
            </NextLink>
          </Flex>
          <Button 
            mt={4} 
            type="submit" 
            isLoading={props.isSubmitting} 
            colorScheme='teal'
          >
            LOGIN
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default Login;

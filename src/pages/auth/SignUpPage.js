import React from "react";
import { Link as LinkRouter, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import {
  Flex,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";

import { Input } from "../../components/forms";
import { signUp } from "../../backend/auth";

const FormSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  name: Yup.string().required("Required"),
  password: Yup.string().min(6, "6 chars minimum").required("Required"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const SignUpPage = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const submit = async (values) => {
    try {
      const { name, email, password } = values;
      await signUp(name, email, password);

      toast({
        title: "Sign up successfully.",
        description: "You need to verify your email address first.",
        status: "success",
      });

      navigate("/", { replace: true });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
      });
    }
  };

  return (
    <>
      <Flex minH="100vh" align="center" justify="center">
        <Stack spacing={8} mx="auto" maxW="lg" py={8} px={6} flex="1">
          <Stack align="center">
            <Heading>Social</Heading>
            <Text fontSize="lg" align="center" color={useColorModeValue("gray.600", "gray.400")}>
              Create a new account ✌️
            </Text>
          </Stack>

          <Formik
            initialValues={{
              email: "",
              name: "",
              password: "",
              passwordConfirmation: "",
            }}
            validationSchema={FormSchema}
            onSubmit={submit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Stack spacing={5}>
                  <Input name="email" type="email" title="Email" />
                  <Input name="name" type="text" title="Name" />
                  <Input name="password" type="password" title="Password" />
                  <Input
                    name="passwordConfirmation"
                    type="password"
                    title="Password confirmation"
                  />

                  <Stack spacing={5}>
                    <Button
                      variant="primary"
                      isLoading={isSubmitting}
                      type="submit"
                    >
                      Sign Up
                    </Button>

                    <Text align="right">
                      Do you have an account?{" "}
                      <Link as={LinkRouter} to="/" variant="primary">
                        Sign In
                      </Link>
                    </Text>
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        </Stack>
      </Flex>
    </>
  );
};

export default SignUpPage;

import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
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
} from "@chakra-ui/react";
// import { signIn } from "../backend/auth";
import { Input } from "../../components/forms";
import { signIn } from "../../features/auth/authSlice";

const FormSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(5, "5 chars minimum").required("Required"),
});

const SignInPage = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const submit = async (values) => {
    const { email, password } = values;
    try {
      await dispatch(signIn({ email, password })).unwrap();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Flex minH="100vh" align="center" justify="center">
        <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6} flex="1">
          <Stack align="center">
            <Heading>Social</Heading>
            <Text fontSize="lg" align="center" color="gray.600">
              Sign in to your account ✌️
            </Text>
          </Stack>

          <Formik
            // initialValues={{ email: "", password: "", remember: false }}
            initialValues={{ email: "", password: "" }}
            validationSchema={FormSchema}
            onSubmit={submit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Stack spacing={5}>
                  <Input name="email" type="email" title="Email" />
                  <Input name="password" type="password" title="Password" />
                  {/* <Checkbox name="remember" title="Remember me" /> */}

                  <Stack spacing={5}>
                    <Button
                      variant="primary"
                      isLoading={isSubmitting}
                      type="submit"
                    >
                      Sign In
                    </Button>

                    <Link
                      as={LinkRouter}
                      to="/forgot-password"
                      variant="primary"
                      align="center"
                    >
                      Forgot password?
                    </Link>
                    <Text align="right">
                      Don&quot;t have an account?{" "}
                      <Link as={LinkRouter} to="/sign-up" variant="primary">
                        Sign Up
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

export default SignInPage;

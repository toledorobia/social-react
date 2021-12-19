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
} from "@chakra-ui/react";

import { sendPasswordResetEmail } from "../backend/auth";
import { Input } from "../components/forms";

const FormSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const submit = async (values) => {
    const { email } = values;

    try {
      await sendPasswordResetEmail(email);

      toast({
        title: "Password Reset.",
        description: "Password reset email sent, check your inbox.",
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
        <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6} flex="1">
          <Stack align="center">
            <Heading>Social</Heading>
            <Text fontSize="lg" align="center" color="gray.600">
              Enter your email address to request a password reset 📧
            </Text>
          </Stack>

          <Formik
            initialValues={{ email: "" }}
            validationSchema={FormSchema}
            onSubmit={submit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Stack spacing={5}>
                  <Input name="email" type="email" title="Email" />

                  <Stack spacing={5}>
                    <Button
                      variant="primary"
                      isLoading={isSubmitting}
                      type="submit"
                    >
                      Reset Password
                    </Button>

                    <Text align="right">
                      🔙
                      <Link as={LinkRouter} to="/" variant="primary">
                        Back
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

export default ForgotPasswordPage;

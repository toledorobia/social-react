import React, { useEffect, useState } from "react";
import { Link as LinkRouter, useNavigate, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import {
  Flex,
  Stack,
  Heading,
  Text,
  Spinner,
  Button,
  Link,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { verifyPasswordResetHash, resetPassword } from "../../backend/auth";
import { Input } from "../../components/forms";

const FormSchema = Yup.object().shape({
  password: Yup.string().min(6, "6 chars minimum").required("Required"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const ResetPasswordPage = () => {
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const { id, hash } = params;

  useEffect(() => {
    verifyPasswordResetHash(id, hash)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });

        navigate("/");
      });
  }, [id, hash, toast, navigate]);

  const submit = async (values) => {
    try {
      const { password } = values;
      await resetPassword(id, hash, password);

      toast({
        title: "Reset password successfully.",
        description: "You can now login with your new password.",
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
      {loading && <Flex minH="100vh" align="center" justify="center">
        <Stack spacing={8} mx="auto" maxW="lg" py={8} px={6} flex="1">
          <Stack align="center">
            <Heading>Social</Heading>
            <Text fontSize="lg" align="center" color={useColorModeValue("gray.600", "gray.400")}>
              Verifing...
            </Text>
            <Spinner />
          </Stack>
        </Stack>
      </Flex>}

      {!loading && <Flex minH="100vh" align="center" justify="center">
        <Stack spacing={8} mx="auto" maxW="lg" py={8} px={6} flex="1">
          <Stack align="center">
            <Heading>Social</Heading>
            <Text fontSize="lg" align="center" color="gray.600">
              Please enter your new password.
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
                      Reset Password
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
      </Flex>}
    </>
  );
};

export default ResetPasswordPage;

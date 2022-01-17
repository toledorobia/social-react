import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Flex,
  Stack,
  Heading,
  Text,
  Spinner,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { verifyEmail } from "../../backend/auth";

const VerifyEmailPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const { id, hash } = params;

  useEffect(() => {
    verifyEmail(id, hash)
      .then(() => {
        toast({
          title: "Success",
          description: "Your email has been verified. Please sign in.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });

        navigate("/");
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

  return (
    <>
      <Flex minH="100vh" align="center" justify="center">
        <Stack spacing={8} mx="auto" maxW="lg" py={8} px={6} flex="1">
          <Stack align="center">
            <Heading>Social</Heading>
            <Text fontSize="lg" align="center" color={useColorModeValue("gray.600", "gray.400")}>
              Verifing your email address...
            </Text>
            <Spinner />
          </Stack>
        </Stack>
      </Flex>
    </>
  );
};

export default VerifyEmailPage;

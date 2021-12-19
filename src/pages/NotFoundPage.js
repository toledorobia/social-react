import React from "react";
import { Link } from "react-router-dom";

import { Box, Heading, Text, Button } from "@chakra-ui/react";

const NotFoundPage = () => {
  return (
    <>
      <Box textAlign="center" py={10} px={6}>
        <Heading display="inline-block" as="h2" size="2xl" color="blue.400">
          404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          Page Not Found
        </Text>
        <Text color={"gray.500"} mb={6}>
          The page you&quot;re looking for does not seem to exist
        </Text>

        <Button
          as={Link}
          to="/"
          colorScheme="blue"
          color="white"
          variant="solid"
        >
          Go to Home
        </Button>
      </Box>
    </>
  );
};

export default NotFoundPage;

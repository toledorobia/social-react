import React from "react";

import { Center, Spinner, } from "@chakra-ui/react";

const LoadingPage = () => {
  return (
    <>
      <Center h="100vh">
        <Spinner size="lg" />
      </Center>
    </>
  );
};

export default LoadingPage;

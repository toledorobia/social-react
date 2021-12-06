import React, { useRef } from "react";
import PropTypes from "prop-types";

import {
  Link,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogHeader,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

const LinkConfirm = ({
  children,
  title,
  message,
  buttonTitle,
  onConfirm,
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleConfirm = () => {
    onClose();
    onConfirm();
  };

  return (
    <>
      <Link {...props} onClick={onOpen}>
        {children}
      </Link>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>{message}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleConfirm} ml={3}>
                {buttonTitle}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

LinkConfirm.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default LinkConfirm;

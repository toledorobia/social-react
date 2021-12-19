import { useToast as useToastChakra } from "@chakra-ui/react";

export const useToast = () => {
  const { toast: toastChakra } = useToastChakra();

  const toast = ({ title, description, status }) => {
    toastChakra({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
    });
  };

  return toast;
};

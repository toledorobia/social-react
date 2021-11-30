import React, { memo } from "react";
import { Field } from "formik";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input as ChakraInput,
} from "@chakra-ui/react";

const Input = ({ title, name, type, ...rest }) => {
  console.log("Input", name, type, rest);

  return (
    <>
      <Field name={name}>
        {({ field, form }) => (
          <FormControl isInvalid={form.errors[name] && form.touched[name]}>
            <FormLabel htmlFor={name}>{title}</FormLabel>
            <ChakraInput {...field} {...rest} type={type} id={name} />
            <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </>
  );
};

export default memo(Input);

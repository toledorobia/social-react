import React, { memo } from "react";
import PropTypes from "prop-types";
import { Field } from "formik";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input as ChakraInput,
} from "@chakra-ui/react";

const Input = ({ title, name, type, ...rest }) => {
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

Input.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};


export default memo(Input);

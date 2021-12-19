import React, { memo } from "react";
import PropTypes from "prop-types";
import { Field } from "formik";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";

const InputNumberCustom = ({ title, name, ...rest }) => {
  return (
    <>
      <Field name={name}>
        {({ field, form }) => (
          <FormControl isInvalid={form.errors[name] && form.touched[name]}>
            <FormLabel htmlFor={name}>{title}</FormLabel>
            <NumberInput {...field} id={name} {...rest}>
              <NumberInputField />
            </NumberInput>
            <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </>
  );
};

InputNumberCustom.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default memo(InputNumberCustom);

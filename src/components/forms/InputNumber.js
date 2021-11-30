import React, { memo, } from 'react';
import { Field, } from "formik";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";

const InputNumberCustom = ({title, name, ...rest}) => {
  console.log("InputNumberCustom", name, rest);

  return <>
    <Field name={name}>
      {({ field, form, }) => (
        <FormControl isInvalid={form.errors[name] && form.touched[name]}>
          <FormLabel htmlFor={name}>{title}</FormLabel>
          <NumberInput {...field}
            id={name}
            {...rest}>
            <NumberInputField />
          </NumberInput>
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  </>;
};

export default memo(InputNumberCustom);
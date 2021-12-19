import React, { memo } from "react";
import PropTypes from "prop-types";
import { Field } from "formik";

import { FormControl, Checkbox as ChakraInput } from "@chakra-ui/react";

const Checkbox = ({ title, name, ...rest }) => {
  return (
    <>
      <Field name={name}>
        {({ field, form }) => (
          <FormControl isInvalid={form.errors[name] && form.touched[name]}>
            <ChakraInput {...field} id={name} {...rest}>
              {title}
            </ChakraInput>
          </FormControl>
        )}
      </Field>
    </>
  );
};

Checkbox.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default memo(Checkbox);

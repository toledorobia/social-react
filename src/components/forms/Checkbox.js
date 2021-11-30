import React, { memo } from "react";
import { Field } from "formik";

import { FormControl, Checkbox as ChakraInput } from "@chakra-ui/react";

const Checkbox = ({ title, name, ...rest }) => {
  console.log("Checkbox", name, rest);

  return (
    <>
      <Field name={name}>
        {({ field, form }) => (
          <FormControl isInvalid={form.errors[name] && form.touched[name]}>
            <ChakraInput {...field} id={name}>
              {title}
            </ChakraInput>
          </FormControl>
        )}
      </Field>
    </>
  );
};

export default memo(Checkbox);

import React, { useState, } from "react";
import { Link as LinkRouter, } from "react-router-dom";
import { Formik, Form, Field, } from "formik";
import * as Yup from "yup";

import {
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  Select,
  VStack,
  HStack,
  NumberInput,
  NumberInputField,
  useToast,
} from "@chakra-ui/react";

import InputCustom from "../components/forms/Input";
import InputNumberCustom from "../components/forms/InputNumber";

const FormSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  debtor: Yup.string().required("Required"),
  amount: Yup.number("Must be a valid number").required("Required"),
  installments: Yup.number().when("repeat", {
    is: true,
    then: Yup.number()
      .typeError("Must be a valid number")
      .positive("Must be a positive number")
      .integer("Must be an integer")
      .required("Required"),
  }),
});

const DebtFormPage = () => {

  const [withRepeat, setWithRepeat] = useState(false);

  const handleRepeatChange = (e) => {
    setWithRepeat(e.target.checked);
  };

  const submit = async (values) => {
    console.log("OK", values);
  };

  return <>

    <Stack spacing={4}
      bg="white"
      rounded="lg"
      shadow="base"
      mx="auto"
      maxW="lg"
      py={6}
      px={6}
      flex="1">
      {/* <Stack align="center">
        <Heading>Debts</Heading>
        <Text fontSize="lg"
          align="center"
          color="gray.600">
          Enter your email address to request a password reset 📧
        </Text>
      </Stack> */}

      <Formik initialValues={{
        title: "",
        category: "",
        debtor: "",
        amount: undefined,
        repeat: false,
        installments: undefined,
      }}
      validationSchema={FormSchema}
      onSubmit={submit}>
        {({ isSubmitting, }) => (
          <Form>
            <Stack spacing={4}>

              {/* <Field name="title">
                {({ field, form, }) => (
                  <FormControl isInvalid={form.errors.title && form.touched.title}>
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <Input {...field}
                      type="text"
                      id="title" />
                    <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                  </FormControl>
                )}
              </Field> */}

              <InputCustom name="title"
                type="text" />

              <Field name="category">
                {({ field, form, }) => (
                  <FormControl isInvalid={form.errors.category && form.touched.category}>
                    <FormLabel htmlFor="category">Category</FormLabel>
                    <Select {...field}
                      id="category"
                      placeholder="Select a category">
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </Select>
                    <FormErrorMessage>{form.errors.category}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="debtor">
                {({ field, form, }) => (
                  <FormControl isInvalid={form.errors.debtor && form.touched.debtor}>
                    <FormLabel htmlFor="debtor">Debtor</FormLabel>
                    <Select {...field}
                      id="debtor"
                      placeholder="Select a debtor">
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </Select>
                    <FormErrorMessage>{form.errors.debtor}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <InputNumberCustom name="amount"
                precision={2}
                step={0.1} />

              {/* <Field name="amount">
                {({ field, form, }) => (
                  <FormControl isInvalid={form.errors.amount && form.touched.amount}>
                    <FormLabel htmlFor="amount">Amount</FormLabel>
                    <NumberInput {...field}
                      id="amount"
                      precision={2}
                      step={0.1}>
                      <NumberInputField />
                    </NumberInput>
                    <FormErrorMessage>{form.errors.amount}</FormErrorMessage>
                  </FormControl>
                )}
              </Field> */}

              <Field name="repeat">
                {({ field, form, }) => (
                  <FormControl isInvalid={
                    form.errors.repeat && form.touched.repeat
                  }>
                    <Checkbox {...field}
                      id="repeat"
                      onChange={handleRepeatChange}>
                      Monthly repeat
                    </Checkbox>
                  </FormControl>
                )}
              </Field>

              {withRepeat && (
                <InputNumberCustom name="amount"
                  min={1}
                  max={999} />
                // <Field name="installments">
                //   {({ field, form, }) => (
                //     <FormControl isInvalid={form.errors.installments && form.touched.installments}>
                //       <FormLabel htmlFor="installments">Installments</FormLabel>
                //       <NumberInput {...field}
                //         id="installments"
                //         min={1}
                //         max={999}>
                //         <NumberInputField />
                //       </NumberInput>
                //       <FormErrorMessage>{form.errors.installments}</FormErrorMessage>
                //     </FormControl>
                //   )}
                // </Field>
              )}

              <Stack spacing={5}
                direction={{ base: "column", md: "row", }}>
                <Button variant="primary"
                  isLoading={isSubmitting}
                  flex={{ base: "none", md: "1", }}
                  type="submit">
                  Save
                </Button>

                <Button as={LinkRouter}
                  to="/"
                  flex={{ base: "none", md: "1", }}
                  variant="secondary"
                  disabled={isSubmitting}>
                  Back
                </Button>

                {/* <Text align="right">
                    🔙
                    <Link as={LinkRouter}
                      to="/"
                      variant="primary">
                      Back
                    </Link>
                  </Text> */}
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  </>;
};

export default DebtFormPage;

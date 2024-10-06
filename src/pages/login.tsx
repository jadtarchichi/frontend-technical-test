import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Text,
  Input,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Navigate } from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuthentication } from "../contexts/authentication";
import { Inputs } from "../services/types/user";
import { UnauthorizedError } from "../services/common";
import { Route } from "../routes/login";
import { useLogin } from "../services/tanstack/useLogin";

const renderError = (error: Error) => {
  if (error instanceof UnauthorizedError) {
    return <FormErrorMessage>Wrong credentials</FormErrorMessage>;
  }
  return (
    <FormErrorMessage>
      An unknown error occured, please try again later
    </FormErrorMessage>
  );
}

export const LoginPage: React.FC = () => {
  const { redirect } = Route.useSearch();
  const { state, authenticate } = useAuthentication();
  const { mutate, isPending, error } = useLogin();
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    mutate(data, {
      onSuccess: ({ jwt }) => {
        authenticate(jwt);
      }
    });
  };

  if (state.isAuthenticated) {
    return <Navigate to={redirect ?? '/'} />;
  };

  return (
    <Flex
      height="full"
      width="full"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        direction="column"
        bgGradient="linear(to-br, cyan.100, cyan.200)"
        p={8}
        borderRadius={16}
      >
        <Heading as="h2" size="md" textAlign="center" mb={4}>
          Login
        </Heading>
        <Text textAlign="center" mb={4}>
          Welcome back! 👋
          <br />
          Please enter your credentials.
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="Enter your username"
              bg="white"
              size="sm"
              {...register("username")}
            />
          </FormControl>
          <FormControl isInvalid={error !== null}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              bg="white"
              size="sm"
              {...register("password")}
            />
            {error !== null && renderError(error)}
          </FormControl>
          <Button
            color="white"
            colorScheme="cyan"
            mt={4}
            size="sm"
            type="submit"
            width="full"
            isLoading={isPending}
          >
            Login
          </Button>
        </form>
      </Flex>
    </Flex>
  );
};
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/user";
import { Inputs } from "../types/user";

export function useLogin() {
  return useMutation({
    mutationFn: (data: Inputs) => login(data.username, data.password)
  });
}
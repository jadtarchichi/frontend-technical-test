import { createFileRoute } from "@tanstack/react-router";
import { SearchParams } from "../services/types/user";
import { LoginPage } from "../pages/login";

export const Route = createFileRoute("/login")({
  validateSearch: (search): SearchParams => {
    return {
      redirect: typeof search.redirect === "string" ? search.redirect : undefined,
    }
  },
  component: LoginPage,
});

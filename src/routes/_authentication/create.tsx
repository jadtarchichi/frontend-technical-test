import { createFileRoute } from "@tanstack/react-router";
import { CreateMemePage } from "../../pages/create-meme";

export const Route = createFileRoute("/_authentication/create")({
  component: CreateMemePage,
});

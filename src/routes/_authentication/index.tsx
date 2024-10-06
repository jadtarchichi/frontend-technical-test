import { createFileRoute } from "@tanstack/react-router";
import { MemeFeedPage } from "../../pages/meme-feed";

export const Route = createFileRoute("/_authentication/")({
  component: MemeFeedPage,
});

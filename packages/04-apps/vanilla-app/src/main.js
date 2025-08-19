import { sessionService } from "@project/data";
import { router } from "./router.js";

document.body.addEventListener("login-success", () => {
  router.navigate("/app");
});

sessionService.onChange((event) => {
  if (event === "logged-out") {
    router.navigate("/login");
  }
});

router._handleRouteChange();

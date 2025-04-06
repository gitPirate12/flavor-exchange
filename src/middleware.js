import { auth } from "./auth";
export { auth as middleware };

export const config = {
  matcher: ["/dashboard", "/protected"], // Protect specific routes
};

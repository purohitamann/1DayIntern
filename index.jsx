import React from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";

const root = createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain="dev-v2aqp4mriqdu7mhj.us.auth0.com"
    clientId="kiMWrUAMzlo7bkhjV6oWadm6rWSYwk9t"
    authorizationParams={{
      redirect_uri: "http://localhost:3000/callback", // Match this with the Auth0 settings
    }}
  >
    <App />
  </Auth0Provider>
);

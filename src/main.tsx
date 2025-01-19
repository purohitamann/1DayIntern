// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
// import "./index.css";
// import { BrowserRouter } from "react-router-dom";
// import { Auth0Provider } from "@auth0/auth0-react";

// import { TempoDevtools } from "tempo-devtools";
// TempoDevtools.init();
// const domain = import.meta.env.VITE_OKTA_DOMAIN;
// const clientId = import.meta.env.VITE_CLIENT_ID;
// const basename = import.meta.env.BASE_URL;

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Auth0Provider
//         domain={domain}
//         clientId={clientId}
//         authorizationParams={{
//           redirect_uri: window.location.origin + "/callback",
//         }}
//       >
//         <App />
//       </Auth0Provider>
//     </BrowserRouter>
//   </React.StrictMode>
// );
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { UserProvider } from "./contexts/UserContext";

import { TempoDevtools } from "tempo-devtools";
TempoDevtools.init();
const domain = import.meta.env.VITE_OKTA_DOMAIN;
const clientId = import.meta.env.VITE_CLIENT_ID;
const basename = import.meta.env.BASE_URL;
const backend = import.meta.env.VITE_BACKEND_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider domain={domain} clientId={clientId} authorizationParams={{ redirect_uri: window.location.origin + "/callback" }}>
      <UserProvider>
        <BrowserRouter basename={basename}>
          <App />
        </BrowserRouter>
      </UserProvider>
    </Auth0Provider>
  </React.StrictMode>
);
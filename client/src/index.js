import ReactDOM from "react-dom/client";

import App from "./Components/App";

import { UserProvider } from "./Components/Reused/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <UserProvider>
    <App />
  </UserProvider>
);

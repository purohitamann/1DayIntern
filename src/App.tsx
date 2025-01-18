import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components";
import routes from "tempo-routes";
import Task from "./components/index";
import AIManagerChat from "./components/dashboard/AIManagerChat";
function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task" element={<Task />} />
          <Route path="*" element={<h1>404</h1>} />
          <Route path="/bot" element={<AIManagerChat />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;

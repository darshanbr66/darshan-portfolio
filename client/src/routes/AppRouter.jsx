import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import AppLayout from "../layouts/AppLayout";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<App />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import TicketListPage from "./pages/TicketListPage";
import TicketCreatePage from "./pages/TicketCreatePage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/tickets" replace />} />
        <Route path="/tickets" element={<TicketListPage />} />
        <Route path="/tickets/new" element={<TicketCreatePage />} />
        <Route path="*" element={<Navigate to="/tickets" replace />} />
      </Route>
    </Routes>
  );
}

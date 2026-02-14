import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import TicketListPage from "./pages/TicketListPage";
import TicketCreatePage from "./pages/TicketCreatePage";
import TicketDetailPage from "./pages/TicketDetailPage";
import TicketEditPage from "./pages/TicketEditPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/tickets" replace />} />
        <Route path="/tickets" element={<TicketListPage />} />
        <Route path="/tickets/new" element={<TicketCreatePage />} />
        <Route path="/tickets/:id" element={<TicketDetailPage />} />
        <Route path="/tickets/:id/edit" element={<TicketEditPage />} />
        <Route path="*" element={<Navigate to="/tickets" replace />} />
      </Route>
    </Routes>
  );
}

import { Link, NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h1 style={{ margin: 0 }}>Ticketing System</h1>
        </Link>

        <nav style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
          <NavLink
            to="/tickets"
            style={({ isActive }) => ({
              textDecoration: "none",
              fontWeight: isActive ? 700 : 400,
            })}
          >
            Tickets
          </NavLink>
          <NavLink
            to="/tickets/new"
            style={({ isActive }) => ({
              textDecoration: "none",
              fontWeight: isActive ? 700 : 400,
            })}
          >
            Neues Ticket
          </NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

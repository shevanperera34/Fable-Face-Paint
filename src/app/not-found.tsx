import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        background: "#0F2A1D",
        color: "#fff",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 420 }}>
        <h1 style={{ fontSize: "1.75rem", marginBottom: 12 }}>Page not found</h1>
        <p style={{ opacity: 0.85, marginBottom: 24 }}>That URL does not exist. Head back to the home page.</p>
        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "12px 22px",
            borderRadius: 12,
            background: "#931C62",
            color: "#fff",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

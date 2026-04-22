function Footer() {
  return (
    <div
      style={{
        background: "#4E598C",
        color: "white",
        padding: "30px",
        textAlign: "center",
        marginTop: "50px",
      }}
    >
      <p>ROOMEO © 2026</p>

      <div style={{ marginTop: "10px" }}>
        <span style={{ marginRight: "15px", cursor: "pointer" }}>Help</span>
        <span style={{ marginRight: "15px", cursor: "pointer" }}>Contact</span>
        <span style={{ cursor: "pointer" }}>Privacy</span>
      </div>
    </div>
  );
}

export default Footer;
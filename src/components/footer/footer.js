import styles from "./footer.css";

function Footer() {
  return (
    <div className="footer-box">
      <span className="footer-text">
        Developed by John Gaynor
        <a
          href="https://github.com/johngaynor/calorie-tracker"
          style={{ marginLeft: "5px" }}
          target="_blank"
        >
          (view the repository here)
        </a>
      </span>

      <span className="footer-text footer-light">Version: 2.1.2</span>
    </div>
  );
}

export default Footer;

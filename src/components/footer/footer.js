import {
  MDBInput,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBProgress,
  MDBProgressBar,
  MDBTextArea,
  MDBTabsContent,
  MDBTableBody,
} from "mdb-react-ui-kit";
import styles from "./footer.css";

function Footer() {
  return (
    <div className="footer-box">
      <span className="footer-text">Developed by John Gaynor</span>
      <span className="footer-text footer-light">Last updated: 1/8/23</span>
    </div>
  );
}

export default Footer;

import clubLogo from "@assets/icons/club_logo.png";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <a className="brand" href="/">
          <img src={clubLogo} alt="" className="brand__logo" />
          <span className="brand__name">CS Careers</span>
        </a>
        <p className="footer-contact">
          Business inquiries: <a href="mailto:cscareersvt@gmail.com">cscareersvt@gmail.com</a>
        </p>
        <p className="footer-meta">© 2026 CS Careers at Virginia Tech</p>
      </div>
    </footer>
  );
}

export default Footer;

import companyLogo from '../pexipLogo.png';
import './Footer.css';

function Footer() { 


  return (
    <div className="Footer">
       <div className="CompanyLogo"><img src={companyLogo} alt="Pexip Logo" width="100"/></div>
       <div className="FooterText"></div>
       
    </div>
  );
}

export default Footer;

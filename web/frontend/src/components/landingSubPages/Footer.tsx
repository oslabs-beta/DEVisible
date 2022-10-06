import React from 'react';
import '../../stylesheets/footer.css';
import theme from '../../theme';

function Footer() {
  return (
    <div
      className="footer"
      style={{
        backgroundColor: `${theme.palette.secondary.dark}`,
      }}
    >
      <div className="contactUs">
        <ul>
          <li className="contactList">Justin GH</li>
          <li className="contactList">Tanner GH</li>
          <li className="contactList">Michael GH</li>
          <li className="contactList">Eden GH</li>
        </ul>
      </div>
      <div className="contactUs">Project Github</div>
      <div className="contactUs">
        <ul>
          <li className="contactList">Justin LI</li>
          <li className="contactList">Tanner LI</li>
          <li className="contactList">Michael LI</li>
          <li className="contactList">Eden LI</li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;

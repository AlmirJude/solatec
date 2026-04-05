import React from "react";
function Footer({ className = "footer", as = "div" }) {
  const Container = as;

  return (
    <Container className={className}>
      <h3>CONTACT US:</h3>
      <h3>
        <i className="fas fa-phone"></i> 09123456789
      </h3>
      <h3>
        <i className="fas fa-envelope"></i> solatecenergy@gmail.com
      </h3>
    </Container>
  );
}

export default Footer;

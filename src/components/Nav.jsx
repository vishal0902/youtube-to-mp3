import React from "react";

function Nav() {
  return (
    <nav style={{color:'white'}} className="navbar ">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src="ytb.svg"
            alt="logo"
            style={{
              maxHeight: "50px",
              maxWidth: "70px",
              marginRight: "10px",
              marginLeft: "5px",
              paddingBottom: "5px"
            }}
          />
          <span style={{ fontSize: "30px", marginTop:'15px' }}>Youtube to MP3 Converter</span>
        </a>
      </div>
    </nav>
  );
}

export default Nav;

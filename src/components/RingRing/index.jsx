import React from "react";
import "./style.scss";
function RingRing() {
  // const handleShowHideIcon = () => {
  //   let iconPhone = document.querySelector(".ring");
  //   let iconMess = document.querySelector(".fb-customerchat");

  //   if (
  //     iconPhone.style.display === "none" ||
  //     iconMess.style.display === "none"
  //   ) {
  //     iconPhone.style.display = "block";
  //     iconMess.style.display = "block";
  //     return;
  //   }
  //   iconPhone.style.display = "none";
  //   iconMess.style.display = "none";
  // };
  return (
    <>
      {/* <div onClick={handleShowHideIcon} className="visible-phone-mess">
        <i className="fas fa-eye-slash"></i>
      </div> */}
      <div className="ring">
        <a href="tel:0703239783" className="coccoc-alo-phone coccoc-alo-green ">
          <div className="coccoc-alo-ph-circle"></div>
          <div className="coccoc-alo-ph-circle-fill"></div>
          <div className="coccoc-alo-ph-img-circle flex jf-al-center">
            <i className="fa fa-phone-alt"></i>
          </div>
        </a>
      </div>
    </>
  );
}

export default RingRing;

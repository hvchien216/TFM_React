import React from "react";
import "./style.scss";
function RingRing(props) {
  return (
    <div className="ring">
      <a href="tel:0703239783" className="coccoc-alo-phone coccoc-alo-green ">
        <div className="coccoc-alo-ph-circle"></div>
        <div className="coccoc-alo-ph-circle-fill"></div>
        <div className="coccoc-alo-ph-img-circle flex jf-al-center">
          <i className="fa fa-phone-alt"></i>
        </div>
      </a>
    </div>
  );
}

export default RingRing;

import { CircularProgress } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../commons/utils";
import {
  SUMMARY_ORDER_COLUMNS,
  TRANSPORT_STATUSES,
} from "./../../commons/constant";
import "./style.scss";

function DashBoardOrder(props) {
  const { order, isFetchingData } = props;

  const mapHeadingTable = () => {
    return SUMMARY_ORDER_COLUMNS.map(({ label }) => {
      return (
        <th
          className={label === "TT người nhận" ? "visible-mb" : ""}
          key={"thead-" + label}
        >
          {label}
        </th>
      );
    });
  };
  const mapDataRowTable = () => {
    let xhtml = null;
    if (order.length > 0) {
      xhtml = order.map(
        ({ code, created, shipping_address, total, status, subtotal }) => {
          // const { full_name, phone, address } = shipping_address;
          console.log(shipping_address);
          return (
            <tr key={"row-order-" + code}>
              <td>
                <Link to={`/order-detail/${code}`}>
                  <span>{code}</span>
                </Link>
              </td>
              <td>{created}</td>
              {/* <td>{address}</td> */}
              <td>{formatCurrency(total, "₫")}</td>
              <td className="visible-mb">
                <p>{shipping_address?.full_name}</p>
                <p>{shipping_address?.phone}</p>
                <p>{shipping_address?.address}</p>
              </td>
              <td>{status && TRANSPORT_STATUSES[status]}</td>
            </tr>
          );
        }
      );
    }

    return xhtml;
  };
  return (
    <>
      <table className="table-order">
        <thead className="table-order-thead">
          <tr>{mapHeadingTable()}</tr>
        </thead>
        <tbody>{mapDataRowTable()}</tbody>
      </table>
      {isFetchingData ? (
        <div className="flex jf-center mtb100" style={{ width: "100%" }}>
          <CircularProgress size={80} color="secondary" />
        </div>
      ) : (
        order.length === 0 && (
          <div className="text-warning" style={{ width: "100%" }}>
            Không có đơn hàng nào.
          </div>
        )
      )}
    </>
  );
}

export default DashBoardOrder;

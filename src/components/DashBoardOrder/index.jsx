import { CircularProgress } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../commons/utils";
import { SUMMARY_ORDER_COLUMNS } from "./../../commons/constant";
import "./style.scss";

function DashBoardOrder(props) {
  const { order, isFetchingData } = props;

  const mapHeadingTable = () => {
    return SUMMARY_ORDER_COLUMNS.map(({ label }) => {
      return <th key={"thead-" + label}>{label}</th>;
    });
  };
  const mapDataRowTable = () => {
    return order.map(({ code, created, shipping_address, total, subtotal }) => {
      const { full_name, phone, address } = shipping_address;
      return (
        <tr key={"row-order-" + code}>
          <td>
            <Link to={`/order-detail/${code}`}>{code}</Link>
          </td>
          <td>{created}</td>
          <td>{address}</td>
          <td>{formatCurrency(total, "₫")}</td>
          <td>
            <p>{full_name}</p>
            <p>{phone}</p>
            <p>{address}</p>
          </td>
          <td>Techcombank</td>
        </tr>
      );
    });
  };
  return (
    <>
      <table className="table-order">
        <thead className="table-order-thead">
          <tr>{mapHeadingTable()}</tr>
        </thead>
        <tbody>{mapDataRowTable()}</tbody>
      </table>
      {isFetchingData && (
        <div className="flex jf-center mtb100" style={{ width: "100%" }}>
          <CircularProgress size={80} color="secondary" />
        </div>
      )}
    </>
  );
}

export default DashBoardOrder;

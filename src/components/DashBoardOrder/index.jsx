import React, { useEffect } from "react";
import "./style.scss";
import { formatCurrency } from "../../commons/utils";
import ProductItem from "../ProductItem";
import imgTemp from "./../../assets/stan-smith-shoes-white-m20605-01-standard.jpg";
import { SUMMARY_ORDER_COLUMNS } from "./../../commons/constant";
import { Link } from "react-router-dom";
function DashBoardOrder(props) {
  const { order } = props;

  const mapHeadingTable = () => {
    return SUMMARY_ORDER_COLUMNS.map(({ label }) => {
      return <th key={"thead-" + label}>{label}</th>;
    });
  };
  const mapDataRowTable = () => {
    return order.map(({ code, created, shipping_address, total, subtotal }) => {
      const { full_name, phone, address } = shipping_address;
      console.log("total===>", total);
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
    </>
  );
}

export default DashBoardOrder;

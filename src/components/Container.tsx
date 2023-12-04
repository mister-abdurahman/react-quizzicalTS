import React from "react";
import { Outlet } from "react-router-dom";

export default function Container() {
  return (
    <div className="container">
      <div className="top-blob"></div>
      <div className="bottom-blob"></div>
      <Outlet />
    </div>
  );
}

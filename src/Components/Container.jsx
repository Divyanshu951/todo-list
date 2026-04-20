import React, { Children } from "react";

function Container({ children }) {
  return <div className="mx-auto min-h-screen max-w-225 py-10">{children}</div>;
}

export default Container;

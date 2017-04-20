import * as React from "react";
import { Link } from "react-router";

export default (): JSX.Element => (
  <div className="col-md-12">
    <Link to="/static-page">Go to static page</Link>
  </div>
);
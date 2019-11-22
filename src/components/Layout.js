import React, { Fragment } from "react"
//Icons
import { FaSeedling } from "react-icons/fa"
//Styles
import "./Layout.css"
import classNames from "classnames"

export default ({ children, footer = true }) => (
  <Fragment>
    <div>{children}</div>{" "}
    {footer && (
      <footer>
        <hr className={"divider"} />
        <FaSeedling className={classNames("icon", "seedIcon")} />
        <p className="footerText">
          <p>Created By CSCI 4169 Group 11</p>
        </p>
      </footer>
    )}
  </Fragment>
)

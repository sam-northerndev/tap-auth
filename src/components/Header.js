import React, { Fragment } from "react"
import styles from "./Header.module.css"

//Utils
import { Link } from "gatsby"
import classNames from "classnames"

import logo from "../images/logo.png"

const Header = ({ collapsed, title }) => (
  <Fragment>
    <div className={styles.container}>
      {!collapsed ? (
        <div className={styles.contentContainer}>
          <img alt="logo" src={logo} className={styles.logo} />
          <h1 className={styles.title}>Tap Authentication</h1>
        </div>
      ) : (
        <div className={styles.collapsedContainer}>
          <Link className={classNames("noStyleLink")} to="/">
            <img
              alt="Return Home"
              src={logo}
              className={classNames(styles.logo, styles.collapsedLogo)}
            />
          </Link>
          <h1 className={classNames(styles.title, styles.collapsedTitle)}>
            Tap Auth
          </h1>
        </div>
      )}
    </div>
    {!!title && <h2 className={styles.centerTitle}>{title}</h2>}
  </Fragment>
)

export default Header

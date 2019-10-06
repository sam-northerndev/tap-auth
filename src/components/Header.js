import React from "react"
import styles from "./Header.module.css"

import image from "../images/logo.png"

const Header = () => (
  <div className={styles.container}>
    <div className={styles.contentContainer}>
      <img alt="logo" src={image} className={styles.logo} />
      <h1 className={styles.title}>Tap Authentication</h1>
    </div>
  </div>
)

export default Header

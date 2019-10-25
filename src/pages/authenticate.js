import React, { Fragment } from "react"
import classNames from "classnames"
import { navigate } from "gatsby"

// Components
import Header from "../components/Header"
import TapAuth from "../components/TapAuth"

import { FaFingerprint as TouchIcon } from "react-icons/fa"
import { FiActivity as VibrationIcon } from "react-icons/fi"

//Styling
import Layout from "../components/Layout"
import styles from "./authenticate.module.css"

// Import Pattern Data
import Patterns from "../utils/patterns"
import database from "../utils/firebase"

class Authenticate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      routeA: false,
      routeB: false,
      hasRegistered: false,
      authenticating: false,
      selectVibPattern: false,
      selectedPattern: null,
    }
  }

  componentWillMount() {
    let isUser

    if (typeof window !== "undefined") {
      isUser = localStorage.getItem("user")
    }

    if (isUser) {
      //Check if they have chosen an auth method
    } else if (typeof window !== "undefined") {
      navigate("/login")
    }

    // Check if user has an auth method chosen
    database
      .ref("users/" + isUser)
      .once("value")
      .then(snapshot => {
        const method = snapshot.val().method
        const masterTap = snapshot.val().masterTap

        if (masterTap || {}.TAPS || [].length !== 0) {
          this.setState({ hasSetPassword: true })
        }
        switch (method) {
          case "A":
            this.setState({ routeA: true })
            break
          case "B":
            this.setState({ routeB: true })
            break
          default:
            break
        }
      })
  }

  //On Click Handlers
  onClickA = () => this.setState({ routeA: true })
  onClickB = () => this.setState({ routeB: true })

  onStart = () => {
    this.setState({ authenticating: true })
  }

  onSelectVibPattern = pattern => {
    // cancel any ongoing vibrations
    window.navigator.vibrate(0)
    if (pattern.name) {
      window.navigator.vibrate(pattern.sequence)
      this.setState({ selectedPattern: pattern.name })
    } else {
      this.setState({ selectVibPattern: true })
    }
  }

  render() {
    const {
      routeA,
      routeB,
      authenticating,
      selectVibPattern,
      selectedPattern,
      hasSetPassword,
    } = this.state

    const chooseRoute = (
      <div className={styles.authContainer}>
        <h3>Select your preferred method</h3>
        <button
          onClick={this.onClickA}
          className={classNames("button", styles.optionButton)}
        >
          Option A
        </button>
        <button
          onClick={this.onClickB}
          className={classNames("button", styles.optionButton)}
        >
          Option B
        </button>

        <p>
          The option should be provided to you by the researcher. Otherwise you
          are free to choose either.
        </p>
      </div>
    )

    const tap = (
      <div className={styles.authContainer}>
        <h3 className={styles.seperatorText}>
          {hasSetPassword
            ? "You've set your password, please attempt to re-enter"
            : "Lets create your password"}
        </h3>
        <ul className={styles.list}>
          <li>Your password will be based on a series of taps</li>
          <li>The taps must be recorded in the highlighted square</li>
          <li>The taps may be held, or simple presses</li>
          <li>When you are finished tap the complete button</li>
        </ul>
        <button
          style={{ marginTop: "0px" }}
          onClick={this.onStart}
          className={classNames("button", styles.optionButton)}
        >
          <TouchIcon className={"icon"} /> Proceed
        </button>
      </div>
    )

    const vib = (
      <div className={styles.authContainer}>
        <Fragment>
          <h3 className={styles.seperatorText}>
            {hasSetPassword
              ? "You've set your password, please attempt to re-enter"
              : "Lets create your password"}
          </h3>
          <ul className={styles.list}>
            <li>Your password will be based on a series of taps</li>
            <li>
              When you start a tap, the phone will vibrate to signal you are
              recording a tap entry
            </li>
            <li>The taps must be recorded in the highlighted square</li>
            <li>When you are finished tap the complete button</li>
          </ul>
          <button
            style={{ marginTop: "0px" }}
            onClick={this.onStart}
            className={classNames("button", styles.optionButton)}
          >
            <TouchIcon className={"icon"} /> Proceed
          </button>
        </Fragment>
      </div>
    )

    return (
      <Layout>
        {!authenticating && (
          <Header collapsed title={authenticating ? "" : "Authentication"} />
        )}
        {authenticating ? (
          routeA ? (
            <TapAuth method="A" />
          ) : (
            <TapAuth method="B" />
          )
        ) : (
          <div className={classNames("card")}>
            {routeA ? tap : routeB ? vib : chooseRoute}
          </div>
        )}
      </Layout>
    )
  }
}

export default Authenticate

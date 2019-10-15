import React, { Fragment } from "react"
import classNames from "classnames"

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

class Authenticate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      routeA: false,
      routeB: false,
      authenticating: false,
      selectVibPattern: false,
      selectedPattern: null,
    }
  }
  //On Click Handlers
  onClickA = () => this.setState({ routeA: true })
  onClickB = () => this.setState({ routeB: true })

  // On Start Auth Methods
  onStartTap = () => {
    this.setState({ authenticating: true })
  }

  onStartVib = () => {
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
        <h3 className={styles.seperatorText}>Lets create your password</h3>
        <ul className={styles.list}>
          <li>Your password will be based on a series of taps</li>
          <li>The taps must be recorded in the highlighted square</li>
          <li>The taps may be held, or simple presses</li>
          <li>When you are finished tap the complete button</li>
        </ul>
        <button
          style={{ marginTop: "0px" }}
          onClick={this.onStartTap}
          className={classNames("button", styles.optionButton)}
        >
          <TouchIcon className={"icon"} /> Proceed
        </button>
      </div>
    )

    const vib = (
      <div className={styles.authContainer}>
        {selectVibPattern ? (
          <Fragment>
            <h3 className={styles.seperatorText}>Select a vibration pattern</h3>
            <button
              style={{ marginTop: "0px" }}
              onClick={() => {
                this.onSelectVibPattern(Patterns.pattern1)
              }}
              className={classNames("button", styles.optionButton)}
            >
              <VibrationIcon className={"icon"} /> Pattern 1
            </button>
            <button
              style={{ marginTop: "0px" }}
              onClick={() => {
                this.onSelectVibPattern(Patterns.pattern2)
              }}
              className={classNames("button", styles.optionButton)}
            >
              <VibrationIcon className={"icon"} /> Pattern 2
            </button>
            <button
              style={{ marginTop: "0px" }}
              onClick={() => {
                this.onSelectVibPattern(Patterns.pattern3)
              }}
              className={classNames("button", styles.optionButton)}
            >
              <VibrationIcon className={"icon"} /> Pattern 3
            </button>
            {selectedPattern && (
              <Fragment>
                <div className={styles.patternContainer}>
                  <h3>
                    Chosen Pattern:{" "}
                    <span className={"loginID"}>{selectedPattern}</span>
                  </h3>
                  <br></br>
                  <p>
                    This vibration pattern will be used for all future login
                    attempts
                  </p>
                </div>
                <button
                  style={{ marginTop: "0px" }}
                  onClick={this.onStartVib}
                  className={classNames("button", styles.optionButton)}
                >
                  <TouchIcon className={"icon"} /> Proceed
                </button>
              </Fragment>
            )}
          </Fragment>
        ) : (
          <Fragment>
            <h3 className={styles.seperatorText}>Lets create your password</h3>
            <ul className={styles.list}>
              <li>Your password will be based on a series of taps</li>
              <li>You will select a vibration pattern</li>
              <li>
                The vibration pattern will play and you can choose where to
                place your taps
              </li>
              <li>The taps must be recorded in the highlighted square</li>
              <li>When you are finished tap the complete button</li>
            </ul>
            <button
              style={{ marginTop: "0px" }}
              onClick={this.onSelectVibPattern}
              className={classNames("button", styles.optionButton)}
            >
              <VibrationIcon className={"icon"} /> Select Pattern
            </button>
          </Fragment>
        )}
      </div>
    )

    return (
      <Layout>
        {!authenticating && (
          <Header collapsed title={authenticating ? "" : "Authentication"} />
        )}
        {authenticating ? (
          routeA ? (
            <TapAuth />
          ) : (
            <div>Option B</div>
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

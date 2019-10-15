import React from "react"
import classNames from "classnames"

// Components
import Header from "../components/Header"
import TapAuth from "../components/TapAuth"

import { FaFingerprint as TouchIcon } from "react-icons/fa"
//Styling
import Layout from "../components/Layout"
import styles from "./authenticate.module.css"

class Authenticate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      routeA: false,
      routeB: false,
      authenticating: false,
    }
  }
  //On Click Handlers
  onClickA = () => this.setState({ routeA: true })
  onClickB = () => this.setState({ routeB: true })

  // On Start Auth Methods
  onStartTap = () => {
    this.setState({ authenticating: true })
  }

  onStartVib = () => {}

  render() {
    const { routeA, routeB, authenticating } = this.state

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
        <h3>Lets create your password</h3>
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

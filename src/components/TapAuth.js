import React from "react"
import { navigate } from "gatsby"

//Components
import {
  FaHourglassStart as Start,
  FaHourglass as End,
  FaHome as Home,
} from "react-icons/fa"
import { FaFingerprint as TouchIcon } from "react-icons/fa"

import styles from "./TapAuth.module.css"
import classnames from "classnames"

class TapAuth extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collecting: false,
      collected: false,
      timer: 3,
      displayTimer: false,
    }
  }

  onStart = () => {
    const time = () => {
      if (this.state.timer === 0)
        this.setState(
          { collecting: true, displayTimer: false },
          clearInterval(startTimer)
        )
      else
        this.setState({
          timer: this.state.displayTimer
            ? this.state.timer - 1
            : this.state.timer,
          displayTimer: true,
        })
    }

    const startTimer = () => setInterval(time, 1000)

    startTimer()
  }

  onComplete = () => this.setState({ collected: true })

  render() {
    const { collecting, collected, displayTimer, timer } = this.state
    return (
      <div>
        <div className={styles.touchCanvas}>
          <div className={styles.canvasContent}>
            {collected ? (
              <Home
                onClick={() => navigate("/")}
                className={classnames(styles.canvasIcon, styles.homeIcon)}
              />
            ) : (
              <TouchIcon className={styles.canvasIcon} />
            )}
            {displayTimer && <h1 className={styles.timer}>{timer}</h1>}
          </div>
        </div>

        {!collected && (
          <div className={styles.buttonContainer}>
            <button
              onClick={collecting ? this.onComplete : this.onStart}
              className={classnames("button", styles.startButton)}
            >
              {collecting ? (
                <span className={styles.innerIcon}>
                  <End className={"icon"} /> Complete
                </span>
              ) : (
                <span className={styles.innerIcon}>
                  <Start className={"icon"} /> Start
                </span>
              )}
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default TapAuth

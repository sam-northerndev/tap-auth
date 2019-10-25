import React, { Fragment } from "react"
import { Link } from "gatsby"
import database from "../utils/firebase"

//Components
import Header from "./Header"
import {
  FaHourglassStart as Start,
  FaHourglass as End,
  FaHome as Home,
  FaFingerprint as TouchIcon,
} from "react-icons/fa"

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

    // CLass Variables
    this.ONGOING_TOUCH = null
    this.TAPS = []
    this.TIME_SINCE_TOUCH = null
  }

  componentDidUpdate(prevProps, prevState) {
    const canvas = document.getElementById("canvas")
    //Add event listeners to canvas
    if (this.state.collecting && !prevState.collecting) {
      canvas.addEventListener("touchstart", this.handleStart, false)
      canvas.addEventListener("touchend", this.handleEnd, false)
    } else if (!this.state.collecting && prevState.collecting) {
      canvas.removeEventListener("touchstart", this.handleStart)
      canvas.removeEventListener("touchend", this.handleEnd)
    }
  }

  handleStart = event => {
    event.stopPropagation()
    if (this.props.method === "B") navigator.vibrate(100000)
    // overwrite the ongoing touch event
    // Capture time since last tapped before overwritting ongoing touch
    if (this.ONGOING_TOUCH)
      this.TIME_SINCE_TOUCH = event.timeStamp - this.ONGOING_TOUCH.timeStamp

    this.ONGOING_TOUCH = event
  }

  handleEnd = event => {
    event.stopPropagation()
    if (this.props.method === "B") navigator.vibrate(0)
    // get the time of the event
    const timeElapsed = event.timeStamp - this.ONGOING_TOUCH.timeStamp

    this.TAPS.push({
      event,
      timeElapsed,
      timeSinceLastTap: this.TIME_SINCE_TOUCH
        ? this.TIME_SINCE_TOUCH - timeElapsed
        : "Start",
    })
  }

  onStart = () => {
    const time = () => {
      if (this.state.timer === "Start")
        this.setState(
          { collecting: true, displayTimer: false },
          clearInterval(startTimer)
        )
      else
        this.setState({
          timer: this.state.displayTimer
            ? this.state.timer - 1 === 0
              ? "Start"
              : this.state.timer - 1
            : this.state.timer,
          displayTimer: true,
        })
    }

    const startTimer = () => setInterval(time, 1000)

    startTimer()
  }

  onComplete = event => {
    event.stopPropagation()

    //Register user with auth A method
    if (this.TAPS.length > 0) {
      // Pop the last element off the array (it is the complete click)
      if (this.TAPS.length > 1) this.TAPS.pop()

      // The total time is calculated from the first tap to the last tap
      const totalTime =
        this.TAPS.length !== 1
          ? this.TAPS[this.TAPS.length - 1].event.timeStamp -
            this.TAPS[0].event.timeStamp
          : this.TAPS[0].timeElapsed

      const taps = {
        totalTime,
        TAPS: this.TAPS,
      }

      console.log(taps)

      // CHECK if the master tap has been created
      database
        .ref("users/" + localStorage.getItem("user"))
        .once("value")
        .then(snapshot => {
          const exists = snapshot.hasChild("masterTap")
          if (!exists) {
            database.ref("users/" + localStorage.getItem("user")).update(
              {
                method: this.props.method === "A" ? "A" : "B",
                auth: true,
                masterTap: taps,
              },
              error => {
                if (error) {
                  console.log("Error setting auth method" + error)
                }
              }
            )
          } else {
            database
              .ref("users/" + localStorage.getItem("user") + "/tapAttempts")
              .push(taps, error => {
                if (error) {
                  console.log("Error setting auth method" + error)
                }
              })
          }
        })
    }

    this.setState({ collected: true })
  }

  render() {
    const { collecting, collected, displayTimer, timer } = this.state
    return (
      <div>
        {!collecting && <Header collapsed />}
        <div
          id="canvas"
          className={classnames(
            styles.touchCanvas,
            collecting && styles.fullPageCanvas
          )}
        >
          <div className={styles.canvasContent}>
            {collected ? (
              <Fragment>
                <Link
                  to="/"
                  className={classnames("noStyleLink", styles.returnHome)}
                >
                  <Home
                    className={classnames(styles.canvasIcon, styles.homeIcon)}
                  />
                  <h1 className={styles.timer}>Return Home</h1>
                </Link>
                <p>Thank you for participating in our study</p>
              </Fragment>
            ) : (
              <TouchIcon className={styles.canvasIcon} />
            )}
            {displayTimer && <h1 className={styles.timer}>{timer}</h1>}
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
      </div>
    )
  }
}

export default TapAuth

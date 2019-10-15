import React, { Fragment } from "react"
import classNames from "classnames"

//Icons
import {
  FaSignInAlt,
  FaFileSignature,
  FaArrowAltCircleLeft as Return,
  FaArrowAltCircleRight as Forward,
} from "react-icons/fa"

//Components
import Header from "../components/Header"
import Layout from "../components/Layout"

// Style
import styles from "./login.module.css"

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      setRegister: false,
      setLogin: false,
      netID: "",
      studentID: "",
      loginID: "",
    }
  }

  // OnClick event handlers
  onClickLogin = () => this.setState({ setLogin: true, setRegister: false })

  onClickRegister = () => this.setState({ setRegister: true, setLogin: false })

  onReset = () => this.setState({ setRegister: false, setLogin: false })

  onLogin = () => {
    //Handle the login logic
  }

  //Input Handlers
  handleLoginIDChange = event => this.setState({ loginID: event.target.value })

  handleStudentIDChange = event =>
    this.setState({ studentID: event.target.value }, this.calcID())

  handleNetIDChange = event =>
    this.setState({ netID: event.target.value }, this.calcID())

  //Calculate Unique ID
  calcID = () => {
    const { studentID, netID } = this.state

    const loginID = studentID > netID ? studentID % netID : netID % studentID

    this.setState({ loginID })
  }

  render() {
    const { setRegister, setLogin, loginID, netID, studentID } = this.state

    const chooseRoute = (
      <Fragment>
        <button
          onClick={this.onClickRegister}
          className={classNames("button", styles.loginButton)}
        >
          <FaFileSignature className={"buttonIcon"} /> Register
        </button>
        <h3 className={styles.seperatorText}>or</h3>
        <button
          onClick={this.onClickLogin}
          className={classNames("button", styles.loginButton)}
        >
          <FaSignInAlt className={"buttonIcon"} /> Login
        </button>
      </Fragment>
    )

    const login = (
      <Fragment>
        <h3 className={styles.seperatorText}>Enter your unique identifier</h3>
        <form className={styles.form} onSubmit={this.onLogin}>
          <label className={styles.label}>
            <span className={styles.labelText}>ID</span>
            <input
              onChange={this.handleLoginIDChange}
              value={loginID}
              className={"tallInput"}
              required
              type="number"
              name="id"
            />
          </label>
          <div className={styles.buttonContainer}>
            <button
              onClick={this.onReset}
              className={classNames(
                "button",
                styles.loginOrBack,
                styles.loginButton
              )}
            >
              <Return className={"buttonIcon"} /> Return
            </button>
            <button
              type="submit"
              className={classNames(
                "button",
                styles.loginOrBack,
                styles.loginButton
              )}
            >
              Continue <Forward className={"buttonIcon"} />
            </button>
          </div>
        </form>
      </Fragment>
    )

    const register = (
      <Fragment>
        <h3 className={styles.seperatorText}>Lets generate your unique ID</h3>
        <form className={styles.form} onSubmit={this.onLogin}>
          <label className={styles.label}>
            <div className={styles.labelContainer}>
              <span className={styles.labelText}>Net ID</span>
            </div>
            <input
              onChange={this.handleNetIDChange}
              value={netID}
              className={"tallInput"}
              required
              type="text"
              pattern="\d*"
              maxlength="6"
              minLength="6"
              name="id"
            />
          </label>
          <label className={styles.label}>
            <div className={styles.labelContainer}>
              <span className={styles.labelText}>Student ID</span>
            </div>
            <input
              onChange={this.handleStudentIDChange}
              value={studentID}
              className={"tallInput"}
              required
              type="text"
              pattern="\d*"
              maxlength="6"
              minLength="6"
            />
          </label>

          {loginID >= 1 && (
            <div>
              <h3>
                Your ID: <span className={styles.loginID}>{loginID}</span>
              </h3>
              <br></br>
              <p>
                Please store your ID for future use, this is the only way we can
                identify you.
              </p>
            </div>
          )}

          <div className={styles.buttonContainer}>
            <button
              onClick={this.onReset}
              className={classNames(
                "button",
                styles.loginOrBack,
                styles.loginButton
              )}
            >
              <Return className={"buttonIcon"} /> Return
            </button>
            <button
              type="submit"
              className={classNames(
                "button",
                styles.loginOrBack,
                styles.loginButton
              )}
            >
              Continue <Forward className={"buttonIcon"} />
            </button>
          </div>
        </form>
      </Fragment>
    )

    return (
      <Layout>
        <Header
          collapsed
          title={setRegister ? "Register" : setLogin ? "Login" : "Sign Up"}
        />
        <div className={styles.loginContainer}>
          <div className={classNames("card", styles.loginCard)}>
            <div className={styles.infoContainer}>
              {setRegister ? register : setLogin ? login : chooseRoute}
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Login

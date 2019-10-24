import React, { Fragment } from "react"
import classNames from "classnames"
import { navigate } from "gatsby"

import database from "../utils/firebase"

//Icons
import {
  FaSignInAlt,
  FaFileSignature,
  FaArrowAltCircleLeft as Return,
  FaArrowAltCircleRight as Forward,
  FaFingerprint as TouchIcon,
} from "react-icons/fa"

import { MdExitToApp as Logout } from "react-icons/md"

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

  componentDidMount() {
    // Get the currently logged in user
    let isUser
    if (typeof window !== "undefined") {
      isUser = localStorage.getItem("user")
    }

    if (isUser) {
      this.setState({ isLoggedIn: true })
    }
  }

  // OnClick event handlers
  onClickLogin = () => this.setState({ setLogin: true, setRegister: false })

  onClickRegister = () => this.setState({ setRegister: true, setLogin: false })

  onLogout = () => {
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user")
      this.setState({
        setRegister: false,
        setLogin: false,
        isLoggedIn: false,
        netID: "",
        studentID: "",
        loginID: "",
      })
    }
  }

  onReset = () =>
    this.setState({ setRegister: false, setLogin: false, error: "" })

  onLogin = event => {
    event.preventDefault()
    //Handle the login logic
    const loginString = this.state.loginID.toString()
    // Check if the id already exists
    database
      .ref("users")
      .once("value")
      .then(snapshot => {
        const exists = snapshot.hasChild(loginString)

        if (exists) {
          //store user session in local storage
          localStorage.setItem("user", loginString)
          // Navigate
          navigate("/authenticate")
        } else {
          // The ID does not exist, print error message
          this.setState({
            error: "You have not created an account, please register.",
          })
        }
      })
  }

  onRegister = event => {
    event.preventDefault()
    // Handle registration logic

    const loginString = this.state.loginID.toString()
    // Check if the id already exists
    database
      .ref("users")
      .once("value")
      .then(snapshot => {
        const exists = snapshot.hasChild(loginString)

        if (!exists) {
          // write the id to the database, handle login logic
          database
            .ref("users/" + loginString)
            .set({ registered: true, auth: false }, error => {
              if (error) {
                console.log("Error Registering" + error)
              } else {
                //store user session in local storage
                localStorage.setItem("user", loginString)
                // Navigate
                navigate("/authenticate")
              }
            })
        } else {
          // The ID exists print error message
          this.setState({
            error:
              "You have already created an account, please proceed to login.",
          })
        }
      })
  }

  navIfAuth = () => {
    if (localStorage.getItem("user")) {
      navigate("/authenticate")
    }
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
    const {
      setRegister,
      setLogin,
      loginID,
      netID,
      studentID,
      error,
      isLoggedIn,
    } = this.state

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
          {error && (
            <h4 className={styles.errorText} style={{ marginTop: "0px" }}>
              {error}
            </h4>
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

    const logged = (
      <Fragment>
        <h3 className={styles.seperatorText}>
          You're logged in as user{" "}
          <span className={"loginID"}>
            {typeof window !== "undefined" && localStorage.getItem("user")}
          </span>
        </h3>
        <div className={styles.loggedButtonContainer}>
          <button
            onClick={this.onLogout}
            className={classNames(
              "button",
              styles.loginOrBack,
              styles.loginButton,
              styles.logoutButton
            )}
          >
            <Logout className={"buttonIcon"} /> Logout
          </button>
          <button
            onClick={this.navIfAuth}
            className={classNames(
              "button",
              styles.loginOrBack,
              styles.loginButton,
              styles.authButton
            )}
          >
            Auth <TouchIcon className={"buttonIcon"} />
          </button>
        </div>
      </Fragment>
    )

    const register = (
      <Fragment>
        <h3 className={styles.seperatorText}>Lets generate your unique ID</h3>
        <form className={styles.form} onSubmit={this.onRegister}>
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
                Your ID: <span className={"loginID"}>{loginID}</span>
              </h3>
              <br></br>
              <p>
                Please store your ID for future use, this is the only way we can
                identify you.
              </p>
            </div>
          )}
          {error && <h4 className={styles.errorText}>{error}</h4>}
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
          title={
            isLoggedIn
              ? "Your Info"
              : setRegister
              ? "Register"
              : setLogin
              ? "Login"
              : "Sign Up"
          }
        />
        <div className={styles.loginContainer}>
          <div className={classNames("card", styles.loginCard)}>
            <div className={styles.infoContainer}>
              {isLoggedIn
                ? logged
                : setRegister
                ? register
                : setLogin
                ? login
                : chooseRoute}
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Login

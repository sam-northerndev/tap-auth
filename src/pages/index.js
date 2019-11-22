import React from "react"
// Components
import Layout from "../components/Layout"
import Header from "../components/Header.js"
import { Link } from "gatsby"
//Styles

import phone from "../images/phone.png"

const IndexPage = () => (
  <Layout>
    <Header />
    <div className="content">
      <p className={"description"}>Authentication for the visually impaired.</p>
      <img alt="phone" src={phone} className="phoneLogo" />
      <hr className={"divider"} />
      <div className={"card"}>
        <p>
          This Prototype was developed for research purposes. Data stored in
          this project will not contain any identifying information, only data
          collected for tap entries will be recorded.
        </p>
      </div>
      <Link className={"button loginButton noStyleLink"} to="/login/">
        {typeof window !== "undefined"
          ? localStorage.getItem("user")
            ? "Continue to Dashboard"
            : "Continue to Login"
          : "Continue to Login"}
      </Link>
    </div>
  </Layout>
)

export default IndexPage

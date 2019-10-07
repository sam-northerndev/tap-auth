import React from "react"
// Components
import Layout from "../components/Layout"
import Header from "../components/Header.js"
import { Link } from "gatsby"
//Styles

const IndexPage = () => (
  <Layout>
    <Header />
    <div className="content">
      <p className={"description"}>Authentication for the visually impaired.</p>

      <hr className={"divider"} />
      <div className={"card"}>
        <p>
          This Prototype was developed for research purposes. Data stored in
          this project will not contain any identifying information, only data
          collected for tap entries will be recorded.
        </p>
      </div>
      <Link className={"loginButton"} to="/login/">
        Continue to Login
      </Link>
    </div>
    <footer>
      <hr className={"divider"} />
      <p className="footerText">Created By CSCI 4169 Group 11</p>
    </footer>
  </Layout>
)

export default IndexPage

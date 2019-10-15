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
      <Link className={"button loginButton noStyleLink"} to="/login/">
        Continue to Login
      </Link>
    </div>
  </Layout>
)

export default IndexPage

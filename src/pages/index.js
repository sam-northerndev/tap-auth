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
      <p>Authentication for the visually impaired.</p>

      <hr className={"divider"} />
      <div className={"card"}>
        <p>This will contain info about the project</p>
      </div>
      <Link to="/page-2/">Group A</Link>
      <Link to="/page-2/">Group B</Link>
    </div>
  </Layout>
)

export default IndexPage

import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => (
  <div className="home-page-container">
    <Header />
    <div className="home-content">
      <h1>Find The Job That Fits Your Life</h1>
      <p>
        Millions of people are searching for jobs, salary information, company
        reviews. Find the jobs that fits your abilites and potential.
      </p>
      <Link className="nav-link" to="jobs">
        <button className="find-job-btn" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home

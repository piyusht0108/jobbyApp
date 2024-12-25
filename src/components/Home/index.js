import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  const onClickFindJob = () => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-description-container">
          <h1 className="home-title">Find The Job That Fits Your Life</h1>
          <p className="home-description">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abitlities and
            potential.
          </p>
          <Link to="/jobs">
            <button
              className="home-find-jobs-button"
              type="button"
              onClick={onClickFindJob}
            >
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home

import {Link} from 'react-router-dom'

import Header from '../Header'
import styles from './index.module.css'

const HomeRoute = () => (
  <>
    <Header />
    <div className={styles.homeContainer}>
      <div className={styles.homeContent}>
        <h1 className={styles.homeHeading}>Find The Job That Fits Your Life</h1>
        <p className={styles.homeDescription}>
          Millions of people are searching for jobs, salary information,company
          reviews.Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className={styles.findJobsButton}>
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default HomeRoute

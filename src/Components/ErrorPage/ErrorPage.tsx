import { FC } from "react"

import "./_ErrorPage.scss"

const ErrorPage: FC = () => {
  return <h1 className="error-message">Sorry, something went wrong on our end. Please try again later.</h1>
}

export default ErrorPage
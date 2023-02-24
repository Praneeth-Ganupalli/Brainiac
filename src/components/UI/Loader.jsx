import React from 'react'
import "./Loader.css"
function Loader() {
  return (
    <div className="d-flex justify-content-center">
  <div className="spinner-border site-loader text-info" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>
  )
}

export default Loader
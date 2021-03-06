import React from 'react'
import { NavLink } from 'react-router-dom'
import './PageNotFound.scss'

export default function PageNotFound() {
  return (
    <div>
      <section className="page_404">
        <div className="container">
          <div className="row">
            <div className="four_zero_four_bg">
              <h1 className="text-center text_404">404</h1>
            </div>
            <div className="contant_box_404">
              <h3 className="h2">Look like you're lost</h3>
              <p>the page you are looking for not available!</p>
              <NavLink to="./" className="link_404">
                Go to Home
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

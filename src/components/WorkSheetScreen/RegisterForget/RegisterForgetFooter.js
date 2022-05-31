import React from 'react'

const RegisterForgetFooter = ({ setVisible }) => {
  return (
    <div className="register-forget-footer">
      <button className="register-button">Register</button>
      <button onClick={() => setVisible(false)} className="cancel-button">
        Cancel
      </button>
    </div>
  )
}

export default RegisterForgetFooter

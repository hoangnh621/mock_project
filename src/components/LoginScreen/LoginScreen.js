import './grid.scss'
import logo from './LoginImage.png'
import './LoginScreen.scss'

const LoginScreen = () => {
  return (
    <div className="content">
      <div className="grid wide">
        <div className="row">
          <div className="col l-6 m-6 c-12">
            <div className="form_image">
              <img src={logo} alt="logo" />
            </div>
          </div>
          <div className="col l-6 m-6 c-12">
            <div className="col-md-8 col-m6">
              <div className="mb-4">
                <h3>Sign In</h3>
                <p className="mb-4">Welcome to Repila Portal !</p>
              </div>
              <div className="form_group">
                <input
                  type="text"
                  placeholder="Email"
                  className="form-control"
                />
              </div>
              <div className="form_group mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control"
                />
              </div>
              <input
                type="submit"
                value="Log In"
                className="btn btn-block btn-primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen

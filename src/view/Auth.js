import React from "react";
import "../assets/form.css";
import form_layer from "../assets/img/form_layer.png";
import Header from "../components/Header";
import keys from "../constant/keys";
import Services from "../services";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      LoggedIn: false,
      email: "",
      password: "",
      username: "",
      useravatar: "",
      message: "",
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem(keys.Preference.ACCESS_TOKEN);
    if (accessToken) {
      this.setState({
        loading: true,
      });
      Services.admin
        .getProfile()
        .then((response) => {
          this.setState({
            LoggedIn: true,
          });
        })
        .catch((error) => {
          this.setState({
            message: error.message,
          });
        })
        .finally(() => {
          this.setState({
            loading: false,
          });
        });
    }
  }

  onLogin = () => {
    const { email, password, loading } = this.state;

    // TODO validate email and password

    if (loading) return;

    this.setState({
      loading: true,
    });
    Services.admin
      .login(email, password)
      .then((response) => {
        const json = response.data;
        const { tokens, user } = json;
        localStorage.setItem(keys.Preference.ACCESS_TOKEN, tokens.access.token);
        localStorage.setItem(
          keys.Preference.REFRESH_TOKEN,
          tokens.refresh.token
        );
        localStorage.setItem(
          "User",
          JSON.stringify(user)
        );
        this.setState({
          LoggedIn: true,
          username: json.user.fullName,
          useravatar: json.user.image,
        });
      })
      .catch((error) => {
        const { response } = error;
        if (response.status == 401) {
          this.setState({
            message: response.data.message,
          });
          // TODO show error from
          // response.data.message
        } else if (response.status == 400) {
          this.setState({
            message: response.data.message,
          });
          // TODO show error from
          // response.data.message
        } else {
          this.setState({
            message: response.data.message,
          });
          // An error occurred
        }
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    return (
      <div className="main-login-wrap">
        {(() => {
          if (this.state.loading == true) {
            return <div class="loading-container">Loading&#8230;</div>;
          }
          if (this.state.LoggedIn == false) {
            return (
              <div className="limiter">
                <div className="container-login100">
                  <div className="wrap-login100 position-relative">
                    {this.state.message !== "" ? (
                      <div
                        className="alert custom-alert text-center br-tb-0 w-100 position-absolute alert-danger"
                        role="alert"
                      >
                        <strong>{this.state.message}</strong>
                      </div>
                    ) : null}
                    <div className="login100-pic js-tilt">
                      <img src={form_layer} alt="Dx Form Layer" />
                    </div>
                    <div className="login100-form validate-form">
                      <span className="login100-form-title">Member Login</span>
                      <div className="wrap-input100 validate-input">
                        <input
                          className="input100"
                          type="text"
                          name="email"
                          onChange={(input) =>
                            this.setState({ email: input.target.value })
                          }
                          placeholder="Email"
                        />
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                          <i className="fa fa-envelope" aria-hidden="true"></i>
                        </span>
                      </div>
                      <div className="wrap-input100 validate-input">
                        <input
                          className="input100"
                          type="password"
                          name="pass"
                          onChange={(input) =>
                            this.setState({ password: input.target.value })
                          }
                          placeholder="Password"
                        />
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                          <i className="fa fa-lock" aria-hidden="true"></i>
                        </span>
                      </div>
                      <div className="container-login100-form-btn">
                        <button
                          className="login100-form-btn"
                          onClick={this.onLogin}
                        >
                          Login
                        </button>
                      </div>
                      <div className="text-center p-t-12">
                        <span className="txt1">Forgot</span>
                        <a className="txt2" href="#">
                          Username / Password?
                        </a>
                      </div>
                      <div className="text-center p-t-136">
                        <a className="txt2" href="#">
                          Create your Account
                          <i className="fa fa-long-arrow-right m-l-5"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <Header
                username={this.state.username}
                useravatar={this.state.useravatar}
              />
            );
          }
        })()}
      </div>
    );
  }
}
export default Login;

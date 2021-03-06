import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Input from "./Input";
import Main from "../../Pages/Main/Main";
import "../../Styles/accountForm.scss";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      checkForm: false,
      retry: false
    };
  }
  goToHome = () => {
    this.props.history.push("/");
  };

  postData = () => {
    // ! 요청보내기

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      email: this.state.email,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      password: this.state.password
    });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://10.58.7.185:8000/account/signup", requestOptions)
      .then(response => response.json())
      .then(result => {
//         console.log("결과", result.message);
        if (result.message === "success") {
          // 결과에 message 있으면, 200일때 다음 창으로 넘어가기
//           console.log(result.message);
          return this.goToHome();
        } else {
          return this.setState({ retry: true });
        }
      })
      .catch(error => console.log("error", error));
  };
  handleFirstNameValue = e => {
    this.setState({ firstName: e.target.value });
    // console.log(this.state.firstName);
  };
  handleLastNameValue = e => {
    this.setState({ lastName: e.target.value });
    // console.log(this.state.lastName);
  };
  handleEmailValue = e => {
    this.setState({ email: e.target.value });
    // console.log(this.state.email);
  };
  handlePasswordValue = e => {
    this.setState({ password: e.target.value });
    // console.log(this.state.password);
  };

  handleClickBtn = e => {
    this.setState({ checkForm: true, retry: false });
    if (
      this.state.firstName.length > 1 &&
      !this.state.firstName.includes(" ") &&
      this.state.lastName.length > 1 &&
      !this.state.lastName.includes(" ") &&
      this.state.email.indexOf("@") > 0 &&
      this.state.email.indexOf(".") > 2 &&
      !this.state.email.includes(" ") &&
      this.state.password.length > 6 &&
      !this.state.password.includes(" ")
    ) {
      // this.setState({ checkForm: true });
      console.log("클릭");
      this.postData();
      // console.log("입력이 완벽하군 ! 버튼을 클릭했으니 POST 요청!");
    }
  };
  handleEnterKey = e => {
    if (e.key === "Enter") {
      console.log("엔터키 실행! > 1");
      this.setState({ checkForm: true, retry: false });
      if (
        this.state.firstName.length > 1 &&
        !this.state.firstName.includes(" ") &&
        this.state.lastName.length > 1 &&
        !this.state.lastName.includes(" ") &&
        this.state.email.indexOf("@") > 0 &&
        this.state.email.indexOf(".") > 2 &&
        !this.state.email.includes(" ") &&
        this.state.password.length > 6 &&
        !this.state.password.includes(" ")
      ) {
        console.log("엔터키 실행!");
        this.postData();
        // console.log("입력이 완벽하군 ! ENTER를 눌렀으니 POST 요청!");
      }
    }
  };
  handleDisplay = () => {
    this.setState({
      checkForm: false
    });
  };

  render() {
    return (
      <Main>
        <div className="account-form-container">
          <div className="title-container">
            <p className="title">create account</p>
            <p className="sub-title">
              to take advantage of personalized shopping
            </p>
          </div>
          <div className="form-container">
            <Input
              Label={"First name"} // placeholder 내용
              Value={this.state.firstName} // 인풋 벨류 공유
              Type={"text"} // 인풋 타입 지정 text, password, email
              HtmlFor={"first"} // label 붙이기 용
              OnChange={this.handleFirstNameValue}
              OnKeyUp={this.handleEnterKey} // 이벤트 공유
              OnDisplay={this.handleDisplay}
              CheckForm={this.state.checkForm} // ! 버튼클릭하면 변경
            />
            <Input
              Label={"Last name"}
              Value={this.state.lastName}
              Type={"text"}
              HtmlFor={"last"}
              OnChange={this.handleLastNameValue}
              OnKeyUp={this.handleEnterKey}
              CheckForm={this.state.checkForm}
            />
            <Input
              Label={"Email"}
              Value={this.state.email}
              Type={"email"}
              HtmlFor={"email"}
              OnChange={this.handleEmailValue}
              OnKeyUp={this.handleEnterKey}
              CheckForm={this.state.checkForm}
            />
            <Input
              Label={"Password"}
              Value={this.state.password}
              Type={"password"}
              HtmlFor={"password"}
              OnChange={this.handlePasswordValue}
              OnKeyUp={this.handleEnterKey}
              CheckForm={this.state.checkForm}
              OnFocus={this.handleOnFocus}
              OnBlur={this.handleOnBlur}
            />

            <div className="btn-wrap">
              <div
                className={
                  this.state.retry ? "notice-retry-block" : "notice-retry-none"
                }
              ></div>
              <button type="button" onClick={this.handleClickBtn}>
                re create my account
              </button>
            </div>
            <div className="text-container">
              <p>
                <span className="mid-red" onClick={this.goToHome}>
                  Return to store
                </span>
              </p>
            </div>
          </div>
        </div>
      </Main>
    );
  }
}

export default withRouter(Register);

import React, { Component } from "react";
import { connect } from "react-redux";
import { route } from "../../../../../Actions/Components/Navigation/";
import { routsName } from "../../../../../Router/RouterList";
class Header extends Component {
  constructor(props) {
    super(props);
  }
  getActiveTab() {
    return this.props.location.pathname.split("/")[2];
  }

  render() {
    const activeTab = this.getActiveTab();

    return (
      <div className="user-account__nav">
        {/* <div className="user-account__deposit">
                    <button
                        onClick={() =>
                            this.props.navigate(
                                routsName.dict.moj_schet +
                                    "/" +
                                    routsName.dict.popolnenie
                            )
                        }
                    >
                        {this.props.lang.deposit}
                    </button>
                </div>
                 */}
        <div className="user-account__titles">
          <div
            className={
              "user-account__title " +
              (activeTab === routsName.dict["moi_stavki"] ? "active" : "")
            }
            onClick={() => this.props.navigate(routsName.dict.moi_stavki)}
          >
            {this.props.lang.myBets}
          </div>
          <div
            className={
              "user-account__title " +
              (activeTab === routsName.dict["moj_akkaunt"] ? "active" : "")
            }
            onClick={
              () => this.props.navigate(routsName.dict.moj_akkaunt)
              //   routsName.getRoutsUrl(routsName.dict.moj_akkaunt)
              // )
            }
          >
            {this.props.lang.account}
          </div>
          <div
            className={
              "user-account__title " +
              (activeTab === routsName.dict["moj_schet"] ? "active" : "")
            }
            onClick={
              // () => this.props.navigate("/moj_schet")
              () => this.props.navigate(routsName.dict.moj_schet)
              // routsName.getRoutsUrl(routsName.dict.moj_schet)
              // )
            }
          >
            {this.props.lang.header.money}
          </div>

          {this.props.settingApp.isOffers ? (
            <div
              className={
                "user-account__title " +
                (activeTab === routsName.dict["loyalijnostij"] ? "active" : "")
              }
              onClick={() => this.props.navigate(routsName.dict.loyalijnostij)}
            >
              {this.props.lang.loality}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lang: state.user.language_user.dict,
    settingApp: state.mainSetting
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigate: url =>
      dispatch(route("push", "/" + routsName.dict["kabinet"] + "/" + url))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

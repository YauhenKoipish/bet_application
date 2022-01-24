import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./Header/";
import BetHistory from "./BetHistory/";
import MyScore from "./MyScore/";
import MyAccount from "./MyAccount/";
import Alfaclub from "./Alfaclub/";
import Verification from "./Verification/";
// import "./style/calendar.css";
// import "./style/user-account.css";
// import "./style/user-balance.css";
// import "./style/user-data.css";
// import "./style/user-settings.css";
// import "./style/user-replenishment.css";
import { connect } from "react-redux";
import { routsName } from "../../../../Router/RouterList";
function Cabinet(props) {
    if (
        !props.isAuthorize &&
        window.location.pathname !== "/kabinet/loyalijnostij"
    )
        return (
            <Redirect
                from={routsName.getRoutsUrl(routsName.dict.kabinet)}
                to={routsName.getRoutsUrl(routsName.dict.prematch)}
            />
        );

    const isVerificated = () => {
        return (
            (props.verificationInfo.scriptFlag === "OpenAccount" &&
                props.verificationInfo.identStatus &&
                props.verificationInfo.identStatus !== "None") ||
            props.verificationInfo.personalDataStatus === 3
        );
    };

    return (
        <div className="user-account">
            {props.isAuthorize ? (
                <Route
                    path={routsName.getRoutsUrl(routsName.dict.kabinet)}
                    component={Header}
                />
            ) : (
                ""
            )}
            {!isVerificated() &&
            window.location.pathname !==
                routsName.getRoutsUrl(
                    routsName.dict.kabinet,
                    routsName.dict.loyalijnostij
                ) ? (
                <Verification />
            ) : (
                <Switch>
                    <Route
                        path={routsName.getRoutsUrl(
                            routsName.dict.kabinet,
                            routsName.dict.moj_schet
                        )}
                        component={MyScore}
                    />
                    <Route
                        path={routsName.getRoutsUrl(
                            routsName.dict.kabinet,
                            routsName.dict.moj_akkaunt
                        )}
                        component={MyAccount}
                    />
                    <Route
                        path={routsName.getRoutsUrl(
                            routsName.dict.kabinet,
                            routsName.dict.moi_stavki
                        )}
                        component={BetHistory}
                    />
                    {props.settingApp.isOffers ? (
                        <Route
                            path={routsName.getRoutsUrl(
                                routsName.dict.kabinet,
                                routsName.dict.loyalijnostij
                            )}
                            component={Alfaclub}
                        />
                    ) : (
                        ""
                    )}

                    {/* <Redirect
            from={routsName.getRoutsUrl(routsName.dict.kabinet)}
            to={routsName.getRoutsUrl(
              routsName.dict.kabinet,
              routsName.dict.moi_stavki
            )}
          /> */}
                </Switch>
            )}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isAuthorize: state.user.isAuthorize,
        verificationInfo: state.verification.ident,
        settingApp: state.mainSetting
    };
};

export default connect(mapStateToProps)(Cabinet);

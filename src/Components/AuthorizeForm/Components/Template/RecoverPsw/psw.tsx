import React from "react";

export default function PswArea(state) {
    const {
        errorPswNew,
        errorPswConfirm,
        errorPswNewText,
        errorPswConfirmText
    } = state.stateMain;
    return (
        <>
            <div className={"psw " + (errorPswNew ? " error" : "")}>
                <label className="login__label ">
                    <span>
                        {state.props.lang.header.recoverPas.acceptNewPsw}
                    </span>
                </label>
                <input
                    type="text"
                    ref={state.refNewPsw}
                    onChange={e => state.changePsw(1, e)}
                />
                <div className="text">
                    {errorPswNew
                        ? errorPswNewText
                        : state.props.lang.header.registration.errors
                              .lengthSizePassword}
                </div>
            </div>
            <div className={"psw" + (errorPswConfirm ? " error" : "")}>
                <label className="login__label ">
                    <span>
                        {
                            state.props.lang.header.recoverPas
                                .recoverPasacceptNewPsw
                        }
                    </span>
                </label>
                <input
                    type="text"
                    ref={state.refConfirmNewPsw}
                    onChange={e => state.changePsw(0, e)}
                />
                <span className="text">
                    {errorPswConfirm
                        ? errorPswConfirmText
                        : state.props.lang.header.registration.errors
                              .lengthSizePassword}
                </span>
            </div>
            <div
                className={
                    "flex button" +
                    (state.stateMain.savePsw ? "" : " opacity50")
                }
                onClick={
                    state.stateMain.savePsw
                        ? () => state.testAndSaveNewPsw()
                        : f => f
                }
            >
                <button className="savePsw">
                    {state.props.lang.header.recoverPas.save}
                </button>
            </div>
        </>
    );
}

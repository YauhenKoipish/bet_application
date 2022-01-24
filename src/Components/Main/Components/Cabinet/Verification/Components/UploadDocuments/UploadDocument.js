import React from "react";
import Loading from "../../../../../../Loading/";

export default function UploadDocument(props) {
    return (
        <>
            <div
                className={
                    "verification__row " + getClassByStatus(props.status)
                }
            >
                <div className="verification__active">
                    <div className="verification__left">{props.text}</div>
                    <div className="verification__right">
                        <div className="verification__button">
                            <div className="verification__text">
                                {props.status === "NotLoaded" ? (
                                    props.lang.ChooseaFile
                                ) : props.status === "Loading" ? (
                                    <Loading />
                                ) : props.status === "Loaded" ? (
                                    props.lang.FileHasBeenUploaded
                                ) : props.status === "NotChecked" ? (
                                    props.lang.InProcessing
                                ) : props.status === "Valid" ? (
                                    props.lang.Accepted
                                ) : props.status === "Invalid" ? (
                                    props.lang.Declined
                                ) : (
                                    ""
                                )}
                            </div>
                            {props.status === "NotLoaded" ? (
                                <input
                                    type="file"
                                    className="verification__file"
                                    accept=".jpg, .jpeg, .png"
                                    onChange={props.onInputChange}
                                />
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
                {props.error ? (
                    <div className="verification__mistake">{props.error}</div>
                ) : (
                    ""
                )}
            </div>
        </>
    );
}

const getClassByStatus = status => {
    switch (status) {
        case "Loading":
            return "loading";
        case "Valid":
        case "Loaded":
            return "done";
        case "Invalid":
            return "error";
        case "NotChecked":
            return "checking";
        default:
            return "";
    }
};

import React from "react";
import { getLocalStorageData } from "../../../Services/LocalStorage";
import { getSportIcon } from "../../../Services/Shared";

export default function SwitherLang(props) {
    const [stateOpen, setstateOpen] = React.useState(false);

    function changeState() {
        setstateOpen(!stateOpen);
    }
    return (
        <div className="language_swither">
            <div
                className={"main" + (stateOpen ? " open" : "")}
                onClick={() => changeState()}
            >
                {getLocalStorageData("Language")} {getSportIcon("tringle")}
            </div>
            {stateOpen ? (
                <div className="list">
                    <span
                        className={
                            getLocalStorageData("Language") === "ru"
                                ? "active"
                                : ""
                        }
                        onClick={
                            getLocalStorageData("Language") === "ru"
                                ? f => f
                                : () => props.changeInfo("ru")
                        }
                    >
                        ru
                    </span>
                    <span
                        className={
                            getLocalStorageData("Language") === "en"
                                ? "active"
                                : ""
                        }
                        onClick={
                            getLocalStorageData("Language") === "en"
                                ? f => f
                                : () => props.changeInfo("en")
                        }
                    >
                        en
                    </span>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

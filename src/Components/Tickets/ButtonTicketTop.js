import React from "react";
import { getIcon } from "../../Services/Shared";

export default function ButtonTicketTop(props) {
    console.log(props.text);
    return (
        <div className="bet-service__button">
            {props.status ? (
                <div
                    className="bet-service__open "
                    onClick={props.toggleTicket}
                >
                    {getIcon("arrowTicket", "#ffffff")}
                </div>
            ) : (
                <button
                    className="bet-service__main-button"
                    onClick={props.handleClick}
                >
                    {props.text}
                </button>
            )}
        </div>
    );
}

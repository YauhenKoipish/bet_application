import React from "react";

export default function Fastbet(
    state = { array: [1, 2, 3, 4, 5], callback: f => f }
) {
    const { array, callback } = state;
    return (
        <div className="moduls__fastbet_keyboards">
            <ul>
                {array.map(bet => (
                    <li
                        key={bet}
                        className="fastBet"
                        onClick={() => callback(bet)}
                    >
                        {bet}
                    </li>
                ))}
            </ul>
        </div>
    );
}

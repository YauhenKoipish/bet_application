import React from "react";

export default function InputSum(state) {
    const { refElement, curentValue } = state;
    return (
        <div className="moduls__input_keyboards">
            <input
                ref={refElement}
                defaultValue={curentValue}
                disabled={true}
            />
        </div>
    );
}

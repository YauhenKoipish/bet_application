import React from "react";

const TopBar = props => {
    const { activeTab, tabLines, changeTab } = props;
    return (
        <ul className="painting__nav nav-painting">
            {[...tabLines.keys()].map((tab, i) => {
                return (
                    <li
                        className={
                            "nav-painting__title " +
                            (activeTab === tab ? "active" : "")
                        }
                        onClick={() => changeTab(tab)}
                        key={i}
                    >
                        {tabLines.get(tab).rusName}
                    </li>
                );
            })}
        </ul>
    );
};

export default TopBar;

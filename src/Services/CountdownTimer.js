import React from "react";
import { getLocalStorageData, setLocalStorage } from "./LocalStorage";

class CountdownTimer {
    constructor() {
        this.interval = "";
    }

    setTimer(start, callback) {
        let startCounter = start - 1;
        let interval = setInterval(() => {
            if (getLocalStorageData("Timer") === 0) {
                setLocalStorage("Timer", 0);
                callback(0);
                clearInterval(interval);
            } else {
                setLocalStorage("Timer", startCounter);
                callback(startCounter);
            }
            startCounter = startCounter - 1;
        }, 1000);
    }
}

export const countdownTimer = new CountdownTimer();

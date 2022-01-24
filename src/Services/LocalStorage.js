export const getLocalStorageData = key => {
    const value = localStorage.getItem(key);
    if (!value) return null;
    return JSON.parse(value);
};

export const setLocalStorage = (key, value) => {
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
};

export const removeLocalStorageDate = key => {
    if (localStorage.getItem(key) !== null) {
        localStorage.removeItem(key);
        return true;
    }
    return false;
};

import React from "react";
import preloader from "../../img/preloader/gifPreloader.gif";

const Preloader = () => (
    <div className="preloader">
        <img src={preloader} className="preloaderImg" alt="preloader" />
        {/* {<Timer />}
    {<Version />} */}
  </div>
);

export default Preloader;

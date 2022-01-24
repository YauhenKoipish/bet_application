import React from "react";

const CreateNameBlock = name => {
  return (
    <React.Fragment>
      {name.name.map((item, i) => (
        <div className="painting__team" key={i}>
          {item}
        </div>
      ))}
    </React.Fragment>
  );
};
export default CreateNameBlock;

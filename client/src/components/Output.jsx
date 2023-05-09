import React from "react";

const Output = ({ srcDoc }) => {
  return (
    <div>
      <iframe
        className="w-full h-80"
        srcDoc={srcDoc}
        title="output"
        sandbox="allow-scripts"
      />
    </div>
  );
};

export default Output;

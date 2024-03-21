import React from "react";

const CustomInput = ({ customInput, setCustomInput }) => {
  return (
    <>
      {/* {" "} */}

      <textarea
        rows="5"
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder={`Custom input`}
        style={{
          width: "90%",
          borderColor:'#1E293B',
          borderWidth:"1px",
          height:"28rem",
          borderRadius: "0.375rem",
          padding: "0.5rem 1rem",
          transition: "box-shadow 0.2s ease",
          // backgroundColor: "white",
          marginTop: "1.5rem",
          
        }}

      ></textarea>
    </>
  );
};

export default CustomInput;

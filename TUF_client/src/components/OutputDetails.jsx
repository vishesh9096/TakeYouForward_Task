import { Button } from "@chakra-ui/react";
import React from "react";

const OutputDetails = ({ outputDetails }) => {
  
  return (
    <div style={{ marginTop: "3rem", display: "flex", flexDirection: "column", gap: "0.75rem"  , textAlign:"left"}}>
      <p style={{ fontSize: "0.875rem" }}>
        Status:{" "}
        <span style={{ fontWeight: "bold", padding: "0.25rem 0.5rem", borderRadius: "0.375rem", }}>
          {outputDetails?.status?.description}
        </span>
      </p>
      <p style={{ fontSize: "0.875rem" }}>
        Memory:{" "}
        <span style={{ fontWeight: "bold", padding: "0.25rem 0.5rem", borderRadius: "0.375rem",  }}>
          {outputDetails?.memory}
        </span>
      </p>
      
      <p style={{ fontSize: "0.875rem" }}>
        Time:{" "}
        <span style={{ fontWeight: "bold", padding: "0.25rem 0.5rem", borderRadius: "0.375rem", }}>
          {outputDetails?.time}
        </span>
      </p>
     
    </div>
  );
};

export default OutputDetails;

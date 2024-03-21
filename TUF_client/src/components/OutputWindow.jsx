import React from "react";

const OutputWindow = ({ outputDetails }) => {
  const getOutput = () => {
    console.log(outputDetails, " data is")
    let statusId = outputDetails?.status?.id;
    

    if (statusId === 6) {
      // compilation error
      return (
        <pre style={{ 
        
          padding: '0.5rem', 
          fontSize: '0.875rem', 
          color: 'red' 
        }}>
          {atob(outputDetails?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      return (
        <pre style={{ 
          padding: '0.5rem', 
          fontSize: '0.875rem', 
          color: 'white' 
        }}>
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      return (
        <pre style={{ 
          padding: '0.5rem', 
          fontSize: '0.875rem', 
          color: 'red' 
        }}>
          {`Time Limit Exceeded`}
        </pre>
      );
    } else {
      return (
        <pre style={{ 
          padding: '0.5rem', 
          fontSize: '0.875rem', 
          color: 'red',
        }}>
          {atob(outputDetails?.stderr)}
        </pre>
      );
    }
  };
  
  return (
    <>

<h1 style={{ 
        fontWeight: 'bold', 

        fontSize: '2rem', 
        // alignSelf:"center",
        marginBottom:"0.5rem",

        marginTop:"2rem",
      }}>
        Output
      </h1>
      
      <div style={{ 
        
        width: '90%', 
        height: '15rem', 
        backgroundColor: '#1E293B', 
        borderRadius: '0.375rem', 
        color: 'white', 
        fontFamily: 'inherit', 

        textAlign: 'left' ,
        paddingLeft:"0.5rem",
        fontSize: '0.875rem', 
        overflowY: 'auto' 
      }}>
        {outputDetails ? <>{getOutput()}</> : null}
      </div>
      
    </>
  );
};

export default OutputWindow;

import React, { useState } from "react";

import Editor from "@monaco-editor/react";

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  return (
    <div style={{ 
        marginTop:20,
        borderRadius: '0.375rem', overflow: 'hidden', width: '100%', height: '100%', boxShadow: '0px 0px 32px 4px rgba(0, 0, 0, 0.4)' }}>
      <Editor
        options={{fontSize:15,padding: {
            top: 20 
          } }}
        
        height="60vh"
        width={`100%`}
        language={language}
        value={value}
        theme={"vs-dark"}
        defaultValue="// Enter Your Code here"
        onChange={handleEditorChange}
      />
    </div>
  );
};
export default CodeEditorWindow;
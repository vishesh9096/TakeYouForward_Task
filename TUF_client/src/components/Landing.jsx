import React, { useEffect, useState } from "react";


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";
import LanguagesDropdown from "./LanguagesDropdown";

// Import Chakra UI components and styles
import { Box, Button } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";
import config from "../constants/config";
import urls from "../constants/urls";


const javascriptDefault = `// some comment`;
const languageOptions = [
    {
      id: 63,
      name: "JavaScript (Node.js 12.14.0)",
      label: "JavaScript (Node.js 12.14.0)",
      value: "javascript",
    },
    
    {
      id: 54,
      name: "C++ (GCC 9.2.0)",
      label: "C++ (GCC 9.2.0)",
      value: "cpp",
    },
    
    {
      id: 62,
      name: "Java (OpenJDK 13.0.1)",
      label: "Java (OpenJDK 13.0.1)",
      value: "java",
    }, 
    {
      id: 71,
      name: "Python (3.8.1)",
      label: "Python (3.8.1)",
      value: "python",
    }
  ];


const Landing = () => {
  const [code, setCode] = useState(javascriptDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);

  useEffect(() => {
    setTheme({ value: "oceanic-next", label: "Oceanic Next" });
  }, []);

  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  const [submission,setsubmission] = useState({})
  const postdata = async() =>{

    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
const token = await localStorage.getItem('accessToken')
myHeaders.append("Authorization", `Bearer ${token}`);

var raw = JSON.stringify(submission);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};
const url = config.baseurl+urls.postsubmission
fetch(url, requestOptions)
  .then(response => response.json())
  .then(result =>{ console.log(result)
    toast("Code Submitted")
  })
  .catch(error => console.log('error', error));






  }


  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: import.meta.env.VITE_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": import.meta.env.VITE_API_HOST,
        "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      console.log(response.data,"here is data")
      
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token)
        }, 2000)
        return
      } else {
        setProcessing(false)
        setOutputDetails(response.data)
        setsubmission(response.data)
        toast(`Compiled Successfully!`)
        console.log('response.data', response.data)
        return
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);

    }
  };
  

  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    console.log("formdata ", formData)
    const options = {
      method: "POST",
      url: import.meta.env.VITE_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": import.meta.env.VITE_API_HOST,
        "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setProcessing(false);
        console.log(error);
      });
  };

// console.log(import.meta.env.VITE_API_URL," here")

const steps = [
    {
      id: '0',
      message: 'Welcome to react chatbot!',
      trigger: '1',
    },
    {
      id: '1',
      message: 'Bye!',
      end: true,
    },
  ];

  return (
    <>
     
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />



      <Box style={{ display: "flex", flexDirection: "row" }}>
        <Box style={{ padding: "4px" }}>
          <LanguagesDropdown onSelectChange={onSelectChange} />
        </Box>
      </Box>
      <Box style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", padding: "4px" }}>
        <Box style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", justifyContent: "flex-start", alignItems: "baseline" , }}>
            <CodeEditorWindow
            code={code}
            onChange={onChange}
            language={language?.value}
            theme={theme.value}
          />
          <OutputWindow outputDetails={outputDetails} />
        </Box>

        <Box style={{ display: "flex", flexDirection: "column", flexShrink: 0, width: "30%", justifyContent: "flex-start" }}>
          <Box style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            />
          
            <Button
              onClick={handleCompile}
              disabled={!code}
              style={{
                alignSelf:"center",
                marginTop: "1rem",
                border: "2px solid #A9A9A9",
                borderRadius: "4px",
                borderWidth:"1px",
                padding: "8px",
                // boxShadow: "0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)",
                transition: "box-shadow 0.15s ease",
                cursor: "pointer",
                opacity: !code ? 0.5 : 1
              }}
            >
              {processing ? "Processing..." : "Compile & Execute"}
            </Button>
          </Box>
          {outputDetails && <><OutputDetails outputDetails={outputDetails} />
          <Button
          mt={"1rem"}
              onClick={()=>{ 
                // navigate("/Dash", );
                postdata()
            }
            
            }
              >Submit Code</Button></>}
        </Box>
      </Box>
    </>
  );
};

export default Landing;

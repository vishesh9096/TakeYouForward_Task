// Chakra imports
import {
  Card,
  CardBody,
  CardHeader,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components

import React,{useState,useEffect} from "react";
import TablesTableRow from "../components/TablesTableRow";

const Submissions = () => {
  var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdhdGhhdmlzaGVzaEBnbWFpbC5jb20iLCJpYXQiOjE3MTA5Njk1NzUsImV4cCI6MTcxMzU2MTU3NX0.PHGoGHGSAQDzq4g5cdhPwO9w4GijlYdqyD1BgRXtkV8");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

const[data,setdata] = useState([])
useEffect(() => {
  const getdata = ()=>{
    fetch("http://localhost:2525/api/v1/submission", requestOptions)
  .then(response => response.json())
  .then(result =>{ console.log(result)
  
  setdata(result)})
  .catch(error => console.log('error', error));
  }

  getdata()

  
}, [])




  //  const data = [
  //   {

  //     name: "alexa@simmmple.com",
  //     language: "Python",
  //     status: {
  //       "status":{"description":"TLE"},
          
  //         "memory":"2kb",
  //         "time":"1ms"
      
  //     },
  //     timestamp: "14/06/21",
  //     response:{
  //       "code":"hello  world",
  //       "input":"1 2 3",
  //       "output":"hello world"
  //     }
  //   },
  //   // {

  //   //   name: "alexa@simmmple.com",
  //   //   language: "Manager",
  //   //   status: "Online",
  //   //   timestamp: "14/06/21",
  //   //   response:{
  //   //     "code":"hello  world",
  //   //     "input":"1 2 3",
  //   //     "output":"hello world"
  //   //   }
  //   // },
  //   // {

  //   //   name: "alexa@simmmple.com",
  //   //   language: "Manager",
  //   //   status: "Online",
  //   //   timestamp: "14/06/21",
  //   //   response:{
  //   //     "code":"hello  world",
  //   //     "input":"1 2 3",
  //   //     "output":"hello world"
  //   //   }
  //   // },
  //   // {

  //   //   name: "alexa@simmmple.com",
  //   //   language: "Manager",
  //   //   status: "Online",
  //   //   timestamp: "14/06/21",
  //   //   response:{
  //   //     "code":"hello  world",
  //   //     "input":"1 2 3",
  //   //     "output":"hello world"
  //   //   }
  //   // },
   
  // ];

  const captions = ["UserName", "Language", "Status", "TIMESTAMP", "RESPONSE"]
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }} height={"5000"} paddingLeft={"1rem"}>
      <CardHeader p='6px 0px 22px 0px'>
        <Text fontSize='2xl' color={textColor} fontWeight='bold'>
          All Submissions 
        </Text>
      </CardHeader>
      <CardBody>
        <Table variant='simple' color={textColor}>
          <Thead>
            <Tr my='.8rem' pl='0px' color='gray.400'>
              {captions.map((caption, idx) => {
                return (
                  <Th color='gray.400' key={idx} ps={idx === 0 ? "0px" : null}>
                    {caption}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row) => {
              return (

                // name: "alexa@simmmple.com",
                // language: "Manager",
                // status: "Online",
                // timestamp: "14/06/21",
                // response:{
                <TablesTableRow
                data = {row}
                  

                />
              );
            })}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};



export default Submissions
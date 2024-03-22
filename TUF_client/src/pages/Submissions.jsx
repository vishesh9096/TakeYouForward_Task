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

import React, { useState, useEffect } from "react";
import TablesTableRow from "../components/TablesTableRow";
import config from "../constants/config";
import urls from "../constants/urls";

const Submissions = () => {
  

  const [data, setdata] = useState([])
  const[loader,setloader] = useState(true)
  useEffect(() => {
    const getdata = async () => {
      var myHeaders = new Headers();
    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
      const token = await localStorage.getItem('accessToken')
      const url =  config.baseurl+urls.submission
      myHeaders.append("Authorization", `Bearer ${token}`);
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)

          setdata(result)
        })
        .catch(error => console.log('error', error));
    }

    getdata()


  }, [])
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
                <TablesTableRow
                  data={row}
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
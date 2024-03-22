import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    PinInput,
    PinInputField,
    Stack,
    Text,Spinner
  } from '@chakra-ui/react'
import PasswordField from '../components/PasswordField'
import Logo from '../components/Logo'
import React, { useState } from "react";
import {  useNavigate} from 'react-router-dom'
import config from '../constants/config';
import urls from '../constants/urls';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

   const Login = () =>{
const[email,setemail] = useState("")

function isEmailInvalid(emailid) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return !emailRegex.test(emailid);
}

const generateotp =()=>{
  if(isEmailInvalid(email))
  {
    toast("Please enter a valid email")
    console.log("invalid email")
    return;
  }
  setloader(true)
  
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      var raw = JSON.stringify({
        "email": email
      });
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      const url = config.baseurl + urls.generateotp;
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {console.log(result)
          setloader(false)
          navigate("/Verify", { state: { email: email } });
        })
        .catch(error => {console.log('error', error)
      toast("Something went wrong!")
      setloader(false)
      }
        );

        // setloader(false)
    }



const [loader,setloader] = useState(false)
    const navigate = useNavigate();
    return  (
      <>
     
      <ToastContainer
        position="top-center"
        autoClose={2000}
        bodyStyle={{color:"black"}}
        newestOnTop={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    <Container
    height={"40rem"}
    maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo />
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={{ base: 'xl', md: 'xl' }}>Get Started</Heading>
          
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'transparent', sm: 'bg.surface' }}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl >
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                value={email}
                onChange={()=>{
                  setemail(event.target.value)
                }}
                id="email" type="email" />
              </FormControl>
            </Stack>
            {/* <HStack>
  <PinInput>
    <PinInputField />
    <PinInputField />
    <PinInputField />
    <PinInputField />
  </PinInput>
</HStack> */}
            
            <Stack spacing="6">
          {!loader?<Button
              onClick={()=>{  

                generateotp()
            
            }}

              >Continue</Button>:
              <Spinner size={"md"} justifyContent={"center"} alignSelf={"center"}/>}
              

              <HStack>
               
              </HStack>
              {/* <OAuthButtonGroup /> */}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
    </>
  )
        }

  export default Login
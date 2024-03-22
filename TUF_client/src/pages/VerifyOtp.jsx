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
    Link,
    PinInput,
    PinInputField,
    Stack,
    Text,
  } from '@chakra-ui/react'
import PasswordField from '../components/PasswordField'
import Logo from '../components/Logo'
import { useLocation, useNavigate } from 'react-router-dom'
import React, { useState ,useEffect} from "react";
import config from '../constants/config';
import urls from '../constants/urls';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
  
   const VerifyOtp = () => {
    const location = useLocation();
  const email = location.state?.email;
    


  
    
    
    const navigate = useNavigate();


    const [otp, setOtp] = useState('');


    const verify = () =>{
      var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "email": email,
  "otp": otp
});
console.log(raw)

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};
const url = config.baseurl+urls.verifyotp
fetch(url, requestOptions)
  .then(response => response.json())
  .then(result => {console.log(result)
    if (result.verified) {
      localStorage.setItem('accessToken', result.accessToken);
      console.log('Access token stored in local storage:', result.accessToken);
      navigate("/Dash");
    } else {
      toast("Invalid OTP")
    }
  
  })
  .catch(error => console.log('error', error));

    }

    const handleOtpChange = (value, index) => {
      const newOtp = otp.slice(0, index) + value + otp.slice(index + 1);
      setOtp(newOtp);
    };
    return (
    <Container
    height={"40rem"}
    maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <ToastContainer
        
        position="top-center"
        autoClose={2000}
        bodyStyle={{color:"black"}}
        newestOnTop={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo />
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={{ base: 'xl', md: 'xl' }}>Verify OTP {email} (use 2121)</Heading>
          
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'transparent', sm: 'bg.surface' }}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing="8">
            <Stack spacing="5">
              <FormControl >

                    <HStack 
                    
                    spacing={10} justifyContent={"center"} alignItems={"center"} >
  <PinInput type='number' size={"lg"}  focusBorderColor='black' otp={true}>
        {/* Render four PinInputFields */}
        {[0, 1, 2, 3].map((index) => (
          <PinInputField key={index} onChange={(e) => handleOtpChange(e.target.value, index)} />
        ))}
      </PinInput>
</HStack>

              </FormControl>
            </Stack>
        
            
            <Stack spacing="6">
              <Button
              onClick={()=>{ 
                // navigate("/Dash", );
                verify()
            }
            
            }
              >Continue</Button>
              <HStack>
               
              </HStack>
              {/* <OAuthButtonGroup /> */}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
    }

  export default VerifyOtp
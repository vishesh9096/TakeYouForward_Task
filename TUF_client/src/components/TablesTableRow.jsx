import {
    Avatar,
    Badge,
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Td,
    Text,
    ModalContent,
    Tr,
    useColorModeValue,
    useDisclosure,
    Box,
} from "@chakra-ui/react";
import React from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import CustomInput from "./CustomInput";
import OutputWindow from "./OutputWindow";
import OutputDetails from "./OutputDetails";
import { Editor } from "@monaco-editor/react";

function TablesTableRow(props) {
    const {  data} = props;
    const textColor = useColorModeValue("gray.700", "white");
    const bgStatus = useColorModeValue("gray.400", "#1a202c");
    const colorStatus = useColorModeValue("white", "gray.400");

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

     


    const { isOpen, onOpen, onClose } = useDisclosure()


    const handleSizeClick = (newSize) => {

        onOpen()
    }

    const languageObject = JSON.parse(data.language);

    const languageObject2 = languageOptions.find(option => option.id === languageObject.id);
    const languageValue = languageObject2 ? languageObject2.value : null;
    const statusObject = JSON.parse(data.status)
    // data.status = statusObject;
    const outputdata = {
        "compile_output" : data.compile_output,
        "stdout":data.stdout,
        "status":statusObject,
        "stderr":data.stderr,
    }

    
    console.log(outputdata, " here ")

    
    const dateTime = new Date(data.created_at);

// Get the date components
const year = dateTime.getFullYear();
const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
const date = dateTime.getDate().toString().padStart(2, '0');

// Get the time components
const hours = dateTime.getHours().toString().padStart(2, '0');
const minutes = dateTime.getMinutes().toString().padStart(2, '0');
const seconds = dateTime.getSeconds().toString().padStart(2, '0');

const outputDetailsobject = {
    "description":data.description,
    "memory":data.memory,
    "time":data.time,
    "status":statusObject
}

// Formatted date and time string
const formattedDateTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    return (
        <>
            <Tr>
                <Td minWidth={{ sm: "250px" }} pl="0px">
                    <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                        <Avatar src={"https://cdn-icons-png.flaticon.com/512/3177/3177440.png"} w="45px" borderRadius="12px" me="18px" />
                        <Flex direction="column">
                            <Text
                                fontSize="md"
                                color={textColor}
                                fontWeight="bold"
                                minWidth="100%"
                            >
                                {data.email}
                            </Text>

                        </Flex>
                    </Flex>
                </Td>

                <Td>
                    <Flex direction="column">
                        <Text fontSize="md" color={textColor} fontWeight="bold">
                            {languageObject.name}
                        </Text>

                    </Flex>
                </Td>
                <Td>
                    <Badge
                        bg={status === "Online" ? "green.400" : bgStatus}
                        color={status === "Online" ? "white" : colorStatus}
                        fontSize="16px"
                        p="3px 10px"
                        borderRadius="8px"
                    >
                        {statusObject?.description}
                    </Badge>
                </Td>
                <Td>
                    <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
                        {formattedDateTime}
                    </Text>
                </Td>
                <Td>
                    <Button
                        onClick={() => { handleSizeClick() }}
                        p="0px" bg="transparent" variant="no-hover">
                        <Text
                            fontSize="md"
                            color="gray.400"
                            fontWeight="bold"
                            cursor="pointer"
                        >
                            View
                        </Text>
                    </Button>
                </Td>
            </Tr>

            <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Response</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        <Box mb={"1rem"} ml={"1rem"}>
                    <OutputDetails outputDetails={outputDetailsobject} />
                    </Box>
                        <Flex>
                            <Box>
                                <Editor
                                    options={{
                                        fontSize: 15,
                                        padding: {
                                            top: 10
                                        },
                                        
                                        readOnly: true // Make the editor non-editable
                                    }}


                                    height="30rem"
                                    width={`45rem`}
                                    language={languageValue}
                                    value={atob(data?.source_code)}
                                    theme={"vs-dark"}
                                    defaultValue=""

                                />

</Box><Box ml={"1rem"}>
                            
<textarea
        rows="5"
        value={`${atob(data?.stdin)}`}

        placeholder={`Input`}
        style={{
          width: "30rem",
          borderColor:'#1E293B',
          borderWidth:"0.5px",
          height:"10rem",
          borderRadius: "0.375rem",
          padding: "0.5rem 1rem",
        //   backgroundColor: "white",

          
        }}

      ></textarea>
        <OutputWindow  outputDetails={outputdata}/>
                                </Box>
                              
                          
                                </Flex>
                       
                        
                        






                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default TablesTableRow;

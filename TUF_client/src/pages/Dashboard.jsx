import React from 'react';
import { useState } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Link,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi';
import CodeEditorWindow from '../components/CodeEditorWindow';
import Landing from '../components/Landing';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

const LinkItems = [
  { name: 'Submit Code', icon: FiHome, link: "/submissions" },
  { name: 'View Submissions', icon: FiTrendingUp, link: "/submissions" },
  { name: 'Explore', icon: FiCompass, link: "/submissions" },
 
];

const SidebarContent = ({ onClose, isOpen, ...rest }) => {

  return (
    <>
      {isOpen && (
        <Box
          transition="2s ease"
          bg={useColorModeValue('white', 'gray.900')}
          borderRight="1px"
          borderRightColor={useColorModeValue('gray.200', 'gray.700')}
          w={{ base: 'full', md: 60 }}
          pos="fixed"
          h="full"
          zIndex="overlay"
          {...rest}>
          <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
            <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
              Logo
            </Text>
            <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
          </Flex>
          {LinkItems.map((link, index) => (
            <NavItem key={index} icon={link.icon} href={link.link}>
              {link.name}
            </NavItem>
          ))}
        </Box>
      )}
    </>
  );
};

const NavItem = ({ icon, children, href, ...rest }) => {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const navigate = useNavigate();
  return (
    <Flex
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'flex' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm"></Text>
                  <Text fontSize="xs" color="gray.600">
                    {/* User */}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem
              onClick={()=>{
                navigate("/")
                localStorage.clear();
              }}
              >Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(!isOpen);

  return (
    <Routes>
    <Route path="/" element={
    <Box position="relative" overflowX="hidden">
      <SidebarContent onClose={onClose} isOpen={isOpen} display={{ base: 'none', md: 'block' }} />
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box 
      ml={{ base: 0, md: isOpen ? 60 : 0 }} 
      width={{md: isOpen ? "65%" : "100%"} } p="4">
        {/* Content */}

       
        
        <Landing />
        
       

        
      </Box>
    </Box>
     } />
    <Route path="/" element={
    <Box position="relative" overflowX="hidden">
      <SidebarContent onClose={onClose} isOpen={isOpen} display={{ base: 'none', md: 'block' }} />
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box 
      ml={{ base: 0, md: isOpen ? 60 : 0 }} 
      width={{md: isOpen ? "65%" : "100%"} } p="4">
        {/* Content */}

        <Landing />
      </Box>
    </Box>
     } />
     </Routes>
  );
};

export default Dashboard;

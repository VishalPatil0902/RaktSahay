import React, { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Badge,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import showToast from '../../Global/Toast';
import { url } from '../../Global/URL';
import { getUserDetails } from '../../Global/authUtils';
import Loader from '../../components/Loader';

const PastRequests = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const toast = useToast();

  const { isError, isLoading, data } = useQuery({
    queryKey: ['/past-emergency-requests'],
    retryDelay: 10000,
    queryFn: async () => {
      if (!user) {
        var current_user = await getUserDetails();
        setUser(current_user);
      } else {
        var current_user = user;
      }
      const temp = await axios
        .get(url + `/emergency-requests/all?postedBy.email=${current_user.email}`)
        .then((response) => response.data.data);
      console.log(temp);
      return temp;
    },
  });

  const deleteRequest = async () => {
    try {
      const res = await axios.post(url + `/delete-emergency-request`, { _id: selectedRequest._id });
      console.log(res);
      showToast(toast, 'Success', 'success', 'Deleted Successfully');
      window.location.reload();
    } catch (error) {
      console.log(error);
      showToast(toast, 'Error', 'error', "Something Went Wrong !");
    }
  };

  const renderUsersList = (requiredStatus) => {
    console.log(data);
    const filteredUsers = data.filter((r) => r.requestStatus === requiredStatus);
    const number = filteredUsers.length;
    if (number == 0){
        return (
            <h3 style={{ marginTop: '50px', width: '100%', textAlign: 'center' }}>No Requests</h3>
        );
    }
    return (
      <div>
       
          <Badge mb={4} bg={'transparent'} p={3} style={{borderRadius: '20px'}}>Total : {number}</Badge>
   
        <ul>

          {filteredUsers.map((request) => (
            <Box
              key={request._id}
              p={4}
              borderWidth='1px'
              borderRadius='lg'
              bg={request.isTaken ? (request.fullfilled ? 'green.100' : 'yellow.100') : 'red.100'}
              color={request.isTaken ? (request.fullfilled ? 'green.800' : 'yellow.800') : 'red.800'}
              cursor='pointer'
              mb={5}
              onClick={() => handleCardClick(request)}
            >
              <VStack spacing={2} align='stretch'>
                <HStack justifyContent='space-between'>
                  <Text fontSize='lg' fontWeight='bold'>
                    {request.name}
                  </Text>
                  <Badge
                    bg={'transparent'}
                    color={
                      request.isTaken ? (request.fullfilled ? 'green.800' : 'yellow.800') : 'red.800'
                    }
                  >
                    {request.bloodType}
                  </Badge>
                </HStack>

                <Text>
                  Units Requested: {request.unitsRequested} at {request.hospital}
                </Text>
                <Text>{request.requestStatus}</Text>
              </VStack>
            </Box>
          ))}
        </ul>
      </div>
    );
  };

  const handleCardClick = (request) => {
    setSelectedRequest(request);
    onOpen();
  };

  const closeModal = () => {
    setSelectedRequest(null);
    onClose();
  };
  const onError = () => {
    window.location.reload();
  };

  if (isLoading) {
    return (
      <>
        <HStack justifyContent='space-between' w='100%'>
          <Button colorScheme='red' onClick={() => navigate('/request')}>
            Back
          </Button>
        </HStack>
        <Loader />
      </>
    );
  } else if (isError) {
    return (
      <>
        <HStack justifyContent='space-between' w='100%'>
          <Button colorScheme='red' onClick={() => navigate('/request')}>
            Back
          </Button>
          <Text fontSize='xl' fontWeight='bold' color='red.500' mb={4}>
            MY PAST REQUESTS
          </Text>
        </HStack>
        <h3 style={{ marginTop: '50px', width: '100%', textAlign: 'center' }}>Something Went Wrong :(</h3>
        <h2 onClick={onError} style={{ marginTop: '50px', width: '100%', textAlign: 'center', color: 'red' }}>
          Try Again
        </h2>
      </>
    );
  }

  return (
    <VStack spacing={4} align='stretch'>
      <HStack justifyContent='space-between' w='100%'>
        <Button colorScheme='red' onClick={() => navigate('/request')}>
          Back
        </Button>
        <Text fontSize='xl' fontWeight='bold' color='red.500' mb={4}>
          MY PAST REQUESTS
        </Text>
      </HStack>

      <Tabs variant='soft-rounded' isFitted colorScheme='blue'>
        <TabList marginX={5} gap={3}>
          <Tab color={'red'}>Current</Tab>
          <Tab color={'red'}>Previous</Tab>
        </TabList>
        <TabPanels w={'100%'}>
          <TabPanel>{data && renderUsersList('Pending')}</TabPanel>
          <TabPanel>{data && renderUsersList('Accepted')}</TabPanel>
        </TabPanels>
      </Tabs>

      <Modal isOpen={isOpen} onClose={closeModal} size='md'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedRequest?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Blood Type: {selectedRequest?.bloodType}</Text>
            <Text>
              Units Requested: {selectedRequest?.unitsRequested} at {selectedRequest?.hospital}
            </Text>
            <Text mt={4}>{selectedRequest?.additionalInfo}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='white' color={'gray'} onClick={closeModal}>
              Close
            </Button>
            {!selectedRequest?.isTaken && !selectedRequest?.fullfilled && (
              <Button colorScheme='red' onClick={deleteRequest}>
                Delete Request
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default PastRequests;

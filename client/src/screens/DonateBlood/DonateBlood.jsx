import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel, TabPanels, Box, Text, Stack, Card, CardBody, Flex, Heading,Accordion,AccordionItem,AccordionButton,AccordionPanel } from '@chakra-ui/react';
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdBloodtype } from "react-icons/md";
import { BiSolidDonateBlood } from "react-icons/bi";
import GoogleMapView from '../../components/GoogleMapView';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import CardTwo from './CardTwo';


const DonateBlood = () => {

  
    const [userLocation, setUserLocation] = useState([]);

    const getUserLocation = () => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setUserLocation({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            });
        });
    };

      const ContainerStyle = {
          width: '100%',
          height: '50vh'
      };

    useEffect(() => {
        getUserLocation();
    }, []);

    const [selectedMarkerInfo, setSelectedMarkerInfo] = useState(null);

    const handleMarkerClick = (markerInfo) => {
        setSelectedMarkerInfo(markerInfo);
    };

    const data = [
      {
          name: "City Hospital",
          location: { lat: "28.6139", lng: "77.2090" },
          email: "abcd0704200@gmail.com",
          contactNo: "9082049861"
      },
      {
          name: "Sunshine Medical Center",
          location: { lat: "28.6264", lng: "77.2189" },
          email: "sunshine_medical@gmail.com",
          contactNo: "9087654321"
      },
      {
          name: "Greenview Hospital",
          location: { lat: "28.6100", lng: "77.2400" },
          email: "greenview_hospital@gmail.com",
          contactNo: "9012345678"
      },
      {
          name: "Hope Clinic",
          location: { lat: "28.6167", lng: "77.2300" },
          email: "hope_clinic@gmail.com",
          contactNo: "9087654321"
      },
      {
          name: "Metro General Hospital",
          location: { lat: "28.6214", lng: "77.1928" },
          email: "metro_general@gmail.com",
          contactNo: "9012345678"
      }
  ];

  const places = data.map(item => ({
    lat: parseFloat(item.location.lat),
    lng: parseFloat(item.location.lng),
}));

console.log(places)


    return (
        <Tabs isFitted variant='enclosed' className=''>
            <TabList mb='1em'>
                <Tab className='bg-gray-500' _selected={{ color: 'white', bg: 'blue.500', fontWeight: 600 }}>Request near me</Tab>
                <Tab className='bg-gray-500' _selected={{ color: 'white', bg: 'teal.500', fontWeight: 600 }}>All Request</Tab>
            </TabList>
            <TabPanels p={0}>
                <TabPanel p={0}>
                    <Card maxW='sm' border='1px solid #EA3A60' justifyContent='center' justifyItems='center' padding={0}>
                        <CardBody justifyContent='center' justifyItems='center' alignItems='center' padding={1}>
                              <div>
                                  <LoadScript googleMapsApiKey='AIzaSyCBsEwnTS9s-IvZmvirO4t9OIT9VEs4UAU'>
                                          <GoogleMap mapContainerStyle={ContainerStyle} center={userLocation} zoom={13}>
                                              <MarkerF position={userLocation} />
                                              {places.map((item, index) => (
                                                  <MarkerF
                                                      position={item}
                                                      key={index}
                                                  />
                                              ))}
                                          </GoogleMap>
                                    </LoadScript>
                              </div>
                        </CardBody>
                    </Card>
                    {selectedMarkerInfo && (
                        <Card maxW='sm' border='1px solid #EA3A60' justifyContent='center' justifyItems='center' padding={0} marginTop={2}>
                            <CardBody justifyContent='center' justifyItems='center' alignItems='center' padding={1}>
                                <Text className='text-center font-bold font-lg'>{selectedMarkerInfo.name}</Text>
                                <Flex justify='space-between'>
                                    <Flex direction='column' padding={0}>
                                        <Flex alignItems='center'><FaMapMarkerAlt size={15} color='#EA3A60' /><Text className='ml-2 text-black font-semibold'>{selectedMarkerInfo.HospitalName}</Text></Flex>
                                        <Flex alignItems='center'><FaPhone size={15} color='#EA3A60' /><Text className='ml-2 text-black font-semibold'>{selectedMarkerInfo.PhNo}</Text></Flex>
                                    </Flex>
                                    <Flex direction='column' padding={0}>
                                        <Flex alignItems='center'><MdBloodtype size={15} color='#EA3A60' /><Text className='ml-2 text-black font-semibold'>{selectedMarkerInfo.Units} Units</Text></Flex>
                                        <Flex alignItems='center'><BiSolidDonateBlood size={15} color='#EA3A60' /><Text className='ml-2 text-black font-semibold'>{selectedMarkerInfo.type}</Text></Flex>
                                    </Flex>
                                </Flex>
                            </CardBody>
                        </Card>
                    )}
                </TabPanel>

                {/* PART TWO */}

                <TabPanel p={0}>
                    <Stack padding={0} overflowY="auto" marginBottom={24}>
                      <Accordion allowToggle>
                        {data &&
                          data.map((item, index) => {
                            return (
                              <AccordionItem key={index}>
                                <AccordionButton paddingBottom={0}>
                                  <Box as="span" flex="1" textAlign="left" m={0}>
                                    <CardTwo item={item} index={index} />
                                  </Box>
                                </AccordionButton>
                                <AccordionPanel
                                  marginY={0}
                                  marginX={4}
                                  bg="white"
                                  className="rounded-b-xl"
                                >
                                  <div className="flex flex-col">
                                    <div className="map w-full h-72 border-solid border-2 border-[#EA3A60] mx-auto rounded-xl"></div>
                                    <button className="button p-2 self-center text-white bg-[#EA3A60] mt-3 rounded-xl text-2xl w-full">
                                      Donate
                                    </button>
                                  </div>
                                </AccordionPanel>
                              </AccordionItem>
                            );
                          })}
                      </Accordion>
                    </Stack>
        </TabPanel>

            </TabPanels>
        </Tabs>
    );
}

export default DonateBlood;
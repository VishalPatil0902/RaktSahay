import React, { useState, useEffect } from "react";
import { Location, useLocation } from "react-router-dom";
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Box,
  Text,
  Stack,
  Card,
  CardBody,
  Flex,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Image,
} from "@chakra-ui/react";
import pin from "./pinMark.png";
import user from "./userMark.png";
import hospital from "./hospitalMark.png";

import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdBloodtype } from "react-icons/md";
import { BiSolidDonateBlood } from "react-icons/bi";
import GoogleMapView from "../../components/GoogleMapView";
import { GoogleMap, LoadScript, MarkerF, Marker } from "@react-google-maps/api";
import CardTwo from "./CardTwo";

const DonateBlood = () => {
  const [userLocation, setUserLocation] = useState([]);
  const location = useLocation();

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
      console.log("user location: ", userLocation);
    });
  };

  const ContainerStyle = {
    width: "100%",
    height: "50vh",
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const [selectedMarkerInfo, setSelectedMarkerInfo] = useState(false);
  console.log(selectedMarkerInfo);

  const handleMarkerClick = (lat, lng) => {
    return data.find(
      (d) =>
        parseFloat(d.location.lat) === lat && parseFloat(d.location.lng) === lng
    );
  };

  const data = [
    {
      name: "City Hospital",
      location: {
        lat: "19.046850",
        lng: "72.864920",
      },
      email: "abcd0704200@gmail.com",
      contactNo: "9082049861",
    },
    {
      name: "Sunshine Medical Center",
      location: {
        lat: "19.051234",
        lng: "72.878512",
      },
      email: "sunshine_medical@gmail.com",
      contactNo: "9087654321",
    },
    {
      name: "Greenview Hospital",
      location: {
        lat: "19.043689",
        lng: "72.875312",
      },
      email: "greenview_hospital@gmail.com",
      contactNo: "9012345678",
    },
    {
      name: "Hope Clinic",
      location: {
        lat: "19.048912",
        lng: "72.865874",
      },
      email: "hope_clinic@gmail.com",
      contactNo: "9087654321",
    },
    {
      name: "Metro General Hospital",
      location: {
        lat: "19.042356",
        lng: "72.868721",
      },
      email: "metro_general@gmail.com",
      contactNo: "9012345678",
    },
  ];

  const userData = [
    {
      name: "Emilia Parkir",
      HospitalName: "Sarana Hospital, Kalyan",
      PhNo: "9082049861",
      Units: "3",
      type: "Plasma",
      bloodGrp: "AB+",
    },
    {
      name: "John Doe",
      HospitalName: "City Hospital",
      PhNo: "1234567890",
      Units: "2",
      type: "Blood",
      bloodGrp: "O+",
    },
    {
      name: "Jane Smith",
      HospitalName: "County Medical Center",
      PhNo: "9876543210",
      Units: "5",
      type: "Platelets",
      bloodGrp: "A-",
    },
    {
      name: "Alice Johnson",
      HospitalName: "Community Clinic",
      PhNo: "7890123456",
      Units: "1",
      type: "Plasma",
      bloodGrp: "B+",
    },
    {
      name: "Bob Brown",
      HospitalName: "Regional Hospital",
      PhNo: "3456789012",
      Units: "4",
      type: "Blood",
      bloodGrp: "A+",
    },
    {
      name: "Eva Martinez",
      HospitalName: "Metropolitan Medical Center",
      PhNo: "8901234567",
      Units: "2",
      type: "Platelets",
      bloodGrp: "O-",
    },
    {
      name: "David Wilson",
      HospitalName: "University Hospital",
      PhNo: "5678901234",
      Units: "3",
      type: "Plasma",
      bloodGrp: "AB-",
    },
    {
      name: "Sarah Thompson",
      HospitalName: "City General Hospital",
      PhNo: "2345678901",
      Units: "1",
      type: "Blood",
      bloodGrp: "B-",
    },
    {
      name: "Michael Rodriguez",
      HospitalName: "Children's Hospital",
      PhNo: "6789012345",
      Units: "6",
      type: "Platelets",
      bloodGrp: "A+",
    },
    {
      name: "Olivia Lee",
      HospitalName: "Veterans Medical Center",
      PhNo: "9012345678",
      Units: "2",
      type: "Plasma",
      bloodGrp: "O+",
    },
    {
      name: "Daniel Garcia",
      HospitalName: "Private Practice Clinic",
      PhNo: "4567890123",
      Units: "4",
      type: "Blood",
      bloodGrp: "AB+",
    },
    {
      name: "Sophia Kim",
      HospitalName: "Medical Group Practice",
      PhNo: "1234905678",
      Units: "3",
      type: "Platelets",
      bloodGrp: "B-",
    },
  ];

  const places = data.map((item) => ({
    lat: parseFloat(item.location.lat),
    lng: parseFloat(item.location.lng),
  }));

  const [hasReloaded, setHasReloaded] = useState(false);

  // useEffect(() => {
  //   if (!hasReloaded) {
  //     // Reload the current page
  //     window.location.reload();
  //     // Set the state to prevent further reloads
  //     setHasReloaded(true);
  //   }
  // }, [hasReloaded]);

  // console.log(places);

  return (
    <Tabs isFitted variant="enclosed" className="">
      <TabList mb="1em">
        <Tab
          className="bg-gray-500"
          _selected={{ color: "white", bg: "blue.500", fontWeight: 600 }}
        >
          Request near me
        </Tab>
        <Tab
          className="bg-gray-500"
          _selected={{ color: "white", bg: "teal.500", fontWeight: 600 }}
        >
          All Request
        </Tab>
      </TabList>
      <TabPanels p={0}>
        <TabPanel p={0}>
          <Card
            maxW="sm"
            border="1px solid #EA3A60"
            justifyContent="center"
            justifyItems="center"
            padding={0}
          >
            <CardBody
              justifyContent="center"
              justifyItems="center"
              alignItems="center"
              padding={1}
            >
              <div>
                <LoadScript googleMapsApiKey="AIzaSyCBsEwnTS9s-IvZmvirO4t9OIT9VEs4UAU">
                  <GoogleMap
                    mapContainerStyle={ContainerStyle}
                    center={userLocation}
                    zoom={13}
                  >
                    <MarkerF
                      position={userLocation}
                      icon={{
                        url: user,
                        scaledSize: { width: 50, height: 50 },
                      }}
                    />
                    {places.map((item, index) => (
                      <MarkerF
                        icon={{
                          url: hospital,
                          scaledSize: { width: 50, height: 50 },
                        }}
                        position={item}
                        key={index}
                        onClick={() =>
                          setSelectedMarkerInfo(
                            handleMarkerClick(item.lat, item.lng)
                          )
                        }
                      />
                    ))}
                  </GoogleMap>
                </LoadScript>
              </div>
            </CardBody>
          </Card>
          {selectedMarkerInfo && (
            <Card
              maxW="sm"
              border="1px solid #EA3A60"
              justifyContent="center"
              justifyItems="center"
              padding={2}
              marginTop={2}
            >
              <CardBody
                justifyContent="center"
                justifyItems="center"
                alignItems="center"
                padding={1}
              >
                <Text className="text-center font-bold font-lg">
                  {selectedMarkerInfo.name}
                </Text>
                <Flex justify="space-between">
                  <Flex direction="column" padding={0}>
                    <Flex alignItems="center">
                      <FaMapMarkerAlt size={15} color="#EA3A60" />
                      <Text className="ml-2 text-black font-semibold">
                        {selectedMarkerInfo.email}
                      </Text>
                    </Flex>
                    <Flex alignItems="center">
                      <FaPhone size={15} color="#EA3A60" />
                      <Text className="ml-2 text-black font-semibold">
                        {selectedMarkerInfo.contactNo}
                      </Text>
                    </Flex>
                  </Flex>
                  {/* <Flex direction="column" padding={0}>
                    <Flex alignItems="center">
                      <MdBloodtype size={15} color="#EA3A60" />
                      <Text className="ml-2 text-black font-semibold">
                        {selectedMarkerInfo.Units} Units
                      </Text>
                    </Flex>
                    <Flex alignItems="center">
                      <BiSolidDonateBlood size={15} color="#EA3A60" />
                      <Text className="ml-2 text-black font-semibold">
                        {selectedMarkerInfo.type}
                      </Text>
                    </Flex>
                  </Flex> */}
                </Flex>
              </CardBody>
            </Card>
          )}
        </TabPanel>

        {/* PART TWO */}

        <TabPanel p={0}>
          <Stack padding={0} overflowY="auto" marginBottom={24}>
            <Accordion allowToggle>
              {userData &&
                userData.map((item, index) => {
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
};

export default DonateBlood;

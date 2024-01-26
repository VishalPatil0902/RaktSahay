import React, { useState, useEffect } from "react";
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
  Button,
  CardFooter,
  Heading,
} from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdBloodtype } from "react-icons/md";
import { BiSolidDonateBlood } from "react-icons/bi";
import GoogleMapView from "../../components/GoogleMapView";

const CardTwo = ({ item, index }) => {
  return (
    <Card maxW="sm" className="shadow-lg" key={index} borderBottomRadius={0}>
      <CardBody>
        <Stack spacing="0">
          <Flex justify="space-between " alignItems="center">
            <Heading size="md">{item.name}</Heading>
            <div className="bg-[#EA3A60] w-fit p-1 rounded-full flex items-center justify-center">
              <Text className="font-bold text-white text-xs">
                {item.bloodGrp}
              </Text>
            </div>
          </Flex>
          <div></div>
          <Flex justify="space-between">
            <Flex direction="column" padding={0}>
              <Flex alignItems="center">
                <FaMapMarkerAlt size={15} color="#EA3A60" />
                <Text className="ml-2 text-black font-semibold">
                  {item.HospitalName}
                </Text>
              </Flex>
              <Flex alignItems="center">
                <FaPhone size={15} color="#EA3A60" />
                <Text className="ml-2 text-black font-semibold">
                  {item.PhNo}
                </Text>
              </Flex>
            </Flex>
            <Flex direction="column" padding={0}>
              <Flex alignItems="center">
                <MdBloodtype size={15} color="#EA3A60" />
                <Text className="ml-2 text-black font-semibold">
                  {item.Units} Units
                </Text>
              </Flex>
              <Flex alignItems="center">
                <BiSolidDonateBlood size={15} color="#EA3A60" />
                <Text className="ml-2 text-black font-semibold">
                  {item.type}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default CardTwo;
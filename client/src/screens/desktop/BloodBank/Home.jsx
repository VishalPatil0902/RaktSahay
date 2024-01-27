import React, { useState, useEffect } from "react";
import {
  Grid,
  GridItem,
  StatLabel,
  Stat,
  StatHelpText,
  StatNumber,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
// import { Chart } from 'react-google-charts';
import CardList from "./CardList";
import { BarChart } from "./BarChart";
import { url } from "../../../Global/URL";
import axios from "axios";
import { getUserDetails } from "../../../Global/authUtils";
import { Flex, Text, Badge, Spacer } from "@chakra-ui/react";

function combineBloodData(hospitalData, bloodBankData) {
  const bloodBankMap = new Map(
    bloodBankData.map(({ bloodType, unitsAvailable }) => [
      bloodType,
      unitsAvailable,
    ])
  );

  const combinedArray = [
    [
      "A+",
      bloodBankMap.get("A+") || 0,
      hospitalData.find(({ group }) => group === "A+")?.units || 0,
    ],
    [
      "B+",
      bloodBankMap.get("B+") || 0,
      hospitalData.find(({ group }) => group === "B+")?.units || 0,
    ],
    [
      "A-",
      bloodBankMap.get("A-") || 0,
      hospitalData.find(({ group }) => group === "A-")?.units || 0,
    ],
    [
      "B-",
      bloodBankMap.get("B-") || 0,
      hospitalData.find(({ group }) => group === "B-")?.units || 0,
    ],
    [
      "AB+",
      bloodBankMap.get("AB+") || 0,
      hospitalData.find(({ group }) => group === "AB+")?.units || 0,
    ],
    [
      "AB-",
      bloodBankMap.get("AB-") || 0,
      hospitalData.find(({ group }) => group === "AB-")?.units || 0,
    ],
    [
      "O+",
      bloodBankMap.get("O+") || 0,
      hospitalData.find(({ group }) => group === "O+")?.units || 0,
    ],
    [
      "O-",
      bloodBankMap.get("O-") || 0,
      hospitalData.find(({ group }) => group === "O-")?.units || 0,
    ],
  ];

  return combinedArray;
}

const BloodBankHome = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(false);
  const [barData, setBarData] = useState([
    ["A+", 100, 25],
    ["B+", 90, 20],
    ["A-", 80, 80],
    ["B-", 70, 20],
    ["AB+", 30, 20],
    ["AB-", 45, 60],
    ["O+", 63, 40],
    ["O-", 31, 10],
  ]);

  const getHospitals = async () => {
    var user = null;
    var res = null;

    try {
      user = await getUserDetails();
      setUser(user);
    } catch (error) {
      console.log(error);
    }
    try {
      res = await axios.get(url + `/hospitals/all?city=${user.city}`);
      // console.log(res.data.data);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
    // console.log(res.data.data[0].currentBlood);
    const graphData = combineBloodData(
      res.data.data[2].currentBlood,
      user.bloodInventory
    );
    setBarData(graphData);
  };

  const setHospitalOnGraph = (i) => {
    const graphData = combineBloodData(
      data[i].currentBlood,
      user.bloodInventory
    );
    setBarData((x) => graphData);
    document.documentElement.scrollTop = 0;
  };
  useEffect(() => {
    getHospitals();
  }, []);

  return (
    <Grid h="auto" gap={4}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5}>
        {/* Stat Cards */}
        <Stat bg="red.100" p={4} borderRadius="md">
          <StatLabel>Review Completed</StatLabel>
          <StatNumber>35</StatNumber>
          <StatHelpText>This is Static for now</StatHelpText>
        </Stat>
        <Stat bg="red.200" p={4} borderRadius="md">
          <StatLabel>Review Completed</StatLabel>
          <StatNumber>35</StatNumber>
          <StatHelpText>This is Static for now</StatHelpText>
        </Stat>
        <Stat bg="red.300" p={4} borderRadius="md">
          <StatLabel>Review Completed</StatLabel>
          <StatNumber>35</StatNumber>
          <StatHelpText>This is Static for now</StatHelpText>
        </Stat>
        <Stat bg="red.200" p={4} borderRadius="md">
          <StatLabel>Review Completed</StatLabel>
          <StatNumber>35</StatNumber>
          <StatHelpText>This is Static for now</StatHelpText>
        </Stat>
      </SimpleGrid>
      <Box m={3} mt={8}>
        {" "}
        <p style={{ fontSize: "22px" }}>Blood Storage Statistics</p>
      </Box>
      <BarChart id="graph" data={barData} />
      <Box m={3} mt={8}>
        {" "}
        <p style={{ fontSize: "22px" }}>
          Inventories of Hospitals in, {user && user.city}
        </p>
      </Box>
      {data &&
        user &&
        data.map((card, index) => (
          <Box
            style={{ cursor: "pointer" }}
            key={index}
            p={4}
            mb={4}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="md"
            bg="red.100"
            onClick={() => setHospitalOnGraph(index)}
          >
            <Flex align="center">
              <Box>
                <Text fontWeight="bold">{card.name}</Text>
                <Text>{card.city + ", " + card.state}</Text>
                <Text>{"+91 " + card.contactNo}</Text>
              </Box>
              <Spacer />
            </Flex>
          </Box>
        ))}
    </Grid>
  );
};

export default BloodBankHome;

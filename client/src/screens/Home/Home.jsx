import React from "react";
import { NavLink } from "react-router-dom";
import {
  Tag,
  Flex,
  Avatar,
  TagLabel,
  Stack,
  Box,
  Card,
  CardBody,
  Heading,
  Image,
  CardFooter,
  Button,
  Divider,
  Text,
} from "@chakra-ui/react";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Banner1 from "../../Images/Banner1.jpg";
import Banner2 from "../../Images/Banner2.jpg";
import Donate from "../../Images/Donate (2).png";
import Request from "../../Images/Request.png";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { HiChatAlt } from "react-icons/hi";
import "swiper/css";
import "swiper/css/pagination";

const Home = () => {
  return (
    <Stack backgroundColor="">
      <NavLink to="/chat-bot">
        <HiChatAlt className="fixed bottom-24 right-4 text-4xl bg-red-500 p-2 rounded-full" />
      </NavLink>
      <Flex justify="space-between">
        <Tag size="lg" colorScheme="red" borderRadius="8px">
          <Avatar
            src="https://bit.ly/sage-adebayo"
            size="xs"
            name="Segun Adebayo"
            ml={-1}
            mr={2}
          />
          <TagLabel className="font-bold">Welcome,Vishal</TagLabel>
        </Tag>
        <HiOutlineBellAlert size={30} color="#EA3A60" />
      </Flex>

      <div className=" h-36 mt-3">
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="mySwiper  h-full"
        >
          <SwiperSlide className="">
            <img src={Banner1} alt="Example" className="shadow-lg rounded-lg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Banner2} alt="Example" className="shadow-lg rounded-lg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Banner2} alt="Example" className="shadow-lg rounded-lg" />
          </SwiperSlide>
        </Swiper>
      </div>

      <Text className="font-bold text-xl my-2 text-[#EA3A60]">
        What Would You Do ?
      </Text>
      <Box display="flex" justifyContent="space-between">
        <Box mr="4">
          <Card
            maxW="sm"
            border="1px solid #EA3A60"
            justifyContent="center"
            justifyItems="center"
          >
            <CardBody
              justifyContent="center"
              justifyItems="center"
              alignItems="center"
            >
              <Image
                src={Donate}
                alt="Donate Blood"
                objectFit="contain"
                width="40%"
                margin="auto"
              />
              <Stack mt="2" spacing="0">
                <Heading size="sm" textAlign="center" color="#EA3A60">
                  DONATE
                </Heading>
              </Stack>
            </CardBody>
          </Card>
        </Box>
        <Box>
          <Card maxW="sm" border="1px solid #EA3A60">
            <CardBody>
              <Image
                src={Request}
                alt="Green double couch with wooden legs"
                borderRadius="lg"
                objectFit="contain"
                width="40%"
                margin="auto"
              />
              <Stack mt="2" spacing="3">
                <Heading size="sm" textAlign="center" color="#EA3A60">
                  REQUEST
                </Heading>
              </Stack>
            </CardBody>
          </Card>
        </Box>
      </Box>

      <Flex justify="space-between">
        <Text color="red" className="font-bold">
          Emergency Request
        </Text>
        <Text className="text-sm text-blue-500">View More</Text>
      </Flex>
      <Card maxW="sm" border="1px solid #EA3A60">
        <CardBody>
          <Stack spacing="1">
            <Flex justify="space-between">
              <Heading size="md">Emilia Parkir</Heading>
              <div className="bg-[#EA3A60] w-fit p-2 rounded-full">
                <Text className="font-bold text-white">A+</Text>
              </div>
            </Flex>
            <div></div>
            <Flex direction="column">
              <Flex alignItems="center">
                <FaMapMarkerAlt size={15} color="#EA3A60" />
                <Text className="ml-2 text-black">Sarana Hospital</Text>
              </Flex>
              <Flex alignItems="center">
                <FaPhone size={15} color="#EA3A60" />
                <Text className="ml-2 text-black">908209868</Text>
              </Flex>
            </Flex>
          </Stack>
        </CardBody>
        <CardFooter>
          <Button variant="solid" colorScheme="red" w="100%">
            Donate Row
          </Button>
        </CardFooter>
      </Card>
    </Stack>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { url } from "../../Global/URL";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { getUserDetails } from "../../Global/authUtils";

import { places, bloodgroup } from "../newProfile/data";

const Profile = () => {
  const [editable, setEditable] = useState();

  const navigate = useNavigate();
  const [role, setRole] = useState(false);
  const { isError, isLoading, data } = useQuery({
    queryKey: [`/user/profile/info`],
    retryDelay: 5000,
    retry: false,
    queryFn: async () => {
      const accessToken = localStorage.getItem("RSaccessToken");
      const data = await getUserDetails();
      console.log(data);
      return data;
    },
  });

  const onError = () => {
    localStorage.removeItem("RSaccessToken");
    navigate("/login");
  };

  if (isLoading) {
    return <Loader />;
  } else if (isError || !data.email) {
    return (
      <>
        <h3 style={{ marginTop: "50px", width: "100%", textAlign: "center" }}>
          Something Went Wrong :(
        </h3>
        <h2
          onClick={onError}
          style={{
            marginTop: "50px",
            width: "100%",
            textAlign: "center",
            color: "blue",
          }}
        >
          Try Again
        </h2>
      </>
    );
  }
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center my-4">Profile</h1>
      <div
        style={{ overflow: "hidden" }}
        className="pic size-40 rounded-full border-2 border-solid border-[#EA3A60] my-3"
      >
        <img
          src={data.profilePicture}
          height={"100%"}
          width={"100%"}
          alt="Not Found"
        />
      </div>
      <div className="accordian w-full max-w-sm mt-4 text-xl">
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{ bg: "#EA3A60", color: "white" }}
                fontSize="2xl" // You can adjust the size as needed (lg stands for large)
                padding={4}
              >
                <Box as="span" flex="1" textAlign="left">
                  Personal Information
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <div className="flex flex-col gap-4 items-center relative">
                {/* ... */}
                <input
                  readOnly
                  className="p-3 rounded-xl border-solid border-[#EA3A60] border-b-2 text-xl w-3/4 max-w-md"
                  type="text"
                  name="name"
                  placeholder="Enter your full name..."
                  id=""
                  value={data.name}
                />
                <input
                  readOnly
                  className="p-3 rounded-xl border-solid border-[#EA3A60] border-b-2 text-xl w-3/4 max-w-md"
                  type="text"
                  name="email"
                  placeholder="Enter your email..."
                  id=""
                  value={data.email}
                />
                {/* ... */}
                <input
                  readOnly
                  // onChange={(e) => setNumber(e.target.value)}
                  className="p-3 rounded-xl border-solid border-[#EA3A60] border-b-2 text-xl w-3/4 max-w-md"
                  type="text"
                  name="contact_no"
                  placeholder="Enter your phone number..."
                  id=""
                  value={data.contact_no}
                />
                {/* ... */}
                <textarea
                  readOnly
                  // onChange={(e) => setAddress(e.target.value)}
                  className="p-3 rounded-xl border-b-2 border-solid border-[#EA3A60] outline-none text-xl w-3/4 max-w-md"
                  name="address"
                  id=""
                  cols="30"
                  rows="3"
                  placeholder="Enter your Address"
                  value={data.address}
                />
                {/* ... */}
                <div className="location flex justify-around gap-2">
                  <select
                    disabled
                    // onChange={(e) => setState(e.target.value)}
                    className="p-3 rounded-xl border-b-2 border-solid border-[#EA3A60] outline-none text-xl w-3/4 max-w-md"
                    name="state"
                    id=""
                    value={data.state}
                  >
                    <option value="">State</option>
                    {places.map((place, index) => (
                      <option key={index} value={place.state}>
                        {place.state}
                      </option>
                    ))}
                  </select>

                  <select
                    disabled
                    className="p-3 rounded-xl border-b-2 border-solid border-[#EA3A60] outline-none text-xl w-3/4 max-w-md"
                    name="city"
                    id=""
                    // onChange={(e) => setCity(e.target.value)}
                    value={data.city}
                  >
                    <option value="">City</option>
                    {data.state !== "" &&
                      places
                        .find((entry) => entry.state === data.state)
                        .cities.map((city, index) => {
                          return (
                            <option key={index} value={city}>
                              {city}
                            </option>
                          );
                        })}
                  </select>
                </div>
                {/* ... */}
                <select
                  disabled
                  className="p-3 rounded-xl border-b-2 border-solid border-[#EA3A60] outline-none text-xl w-3/4 max-w-md"
                  name="bloodType"
                  id=""
                  // onChange={(e) => setBloodGroup(e.target.value)}
                  value={data.bloodType}
                >
                  <option value="">Blood Group</option>
                  {bloodgroup.map((group, index) => (
                    <option key={index} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
                {/* ... */}
                <input
                  readOnly
                  // onChange={(e) => setIdCardNumber(e.target.value)}
                  className="p-3 rounded-xl border-solid border-[#EA3A60] border-b-2 text-xl w-3/4 max-w-md"
                  type="text"
                  name="idCardNumber"
                  placeholder="Enter your ID Card Number..."
                  id=""
                  value={data.idCardNumber}
                />
                {/* ... */}
                <button
                  // onClick={() => setEditable(false)}
                  className="p-4 rounded-xl mt-8 w-full max-w-md bg-[#EA3A60] text-white text-xl font-bold"
                >
                  Save Changes
                </button>
              </div>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{ bg: "#EA3A60", color: "white" }}
                fontSize="2xl" // You can adjust the size as needed (lg stands for large)
                padding={4}
              >
                <Box as="span" flex="1" textAlign="left">
                  Donation History
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi
              earum sed, assumenda tenetur excepturi suscipit et qui quaerat,
              soluta repudiandae praesentium id corporis. Modi exercitationem
              odio illum explicabo voluptates, optio et laboriosam similique,
              est nisi amet architecto maxime officiis libero, magni ducimus
              nostrum. Amet molestiae officia recusandae, placeat incidunt
              eveniet.
            </AccordionPanel>
          </AccordionItem>
          {/* ... */}
        </Accordion>
      </div>
    </div>
  );
};

export default Profile;

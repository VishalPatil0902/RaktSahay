import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { bloodgroup, places } from "./data";
import { url } from "../../Global/URL";

const NewProfile = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const encodedUserInfo = queryParams.get("userInfo");
  const userInfo = JSON.parse(decodeURIComponent(encodedUserInfo));

  const name = userInfo.name;
  const email = userInfo.email;
  const profilePicture = userInfo.profilePicture;
  const sub_id = userInfo.sub_id;
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [idCardNumber, setIdCardNumber] = useState("");

  const details = {
    name: name,
    email: email,
    contact_no: number,
    address: address,
    state: state,
    city: city,
    bloodType: bloodGroup,
    idCardNumber: idCardNumber,
    profilePicture,
    sub_id
  };

  const createUser = async () => {
    try {
      let Userdetails = {
        name: name,
        email: email,
        contact_no: number,
        address: address,
        state: state,
        city: city,
        bloodType: bloodGroup,
        idCardNumber: idCardNumber,
      };
      console.log(Userdetails);
      const res = await axios.post(url + "/register-user", Userdetails);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <h1 className="text-3xl p-2 font-bold text-center text-[#EA3A60]">
        Complete your Profile
      </h1>
      <input
        readOnly
        className="p-3 rounded-xl border-solid border-[#EA3A60] border-b-2 text-xl w-3/4 max-w-md"
        type="text"
        name="name"
        placeholder="Enter your full name..."
        id=""
        value={details.name}
      />
      <input
        readOnly
        className="p-3 rounded-xl border-solid border-[#EA3A60] border-b-2 text-xl w-3/4 max-w-md"
        type="text"
        name="email"
        placeholder="Enter your email id..."
        id=""
        value={details.email}
      />
      <input
        onChange={(e) => setNumber(e.target.value)}
        className="p-3 rounded-xl border-solid border-[#EA3A60] border-b-2 text-xl w-3/4 max-w-md"
        type="text"
        name="contact_no"
        placeholder="Enter your phone number..."
        id=""
        value={details.number}
      />
      <textarea
        onChange={(e) => setAddress(e.target.value)}
        className="p-3 rounded-xl border-b-2 border-solid border-[#EA3A60] outline-none text-xl w-3/4 max-w-md"
        name="address"
        id=""
        cols="30"
        rows="3"
        placeholder="Enter your Address"
        value={details.address}
      />
      <div className="location flex justify-around gap-2">
        <select
          onChange={(e) => setState(e.target.value)}
          className="p-3 rounded-xl border-b-2 border-solid border-[#EA3A60] outline-none text-xl w-3/4 max-w-md"
          name="state"
          id=""
        >
          <option value="">State</option>
          {places.map((place, index) => (
            <option key={index} value={place.state}>
              {place.state}
            </option>
          ))}
        </select>

        <select
          className="p-3 rounded-xl border-b-2 border-solid border-[#EA3A60] outline-none text-xl w-3/4 max-w-md"
          name="city"
          id=""
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">City</option>
          {state !== "" &&
            places
              .find((entry) => entry.state === state)
              .cities.map((city, index) => {
                return (
                  <option key={index} value={city}>
                    {city}
                  </option>
                );
              })}
        </select>
      </div>
      <select
        className="p-3 rounded-xl border-b-2 border-solid border-[#EA3A60] outline-none text-xl w-3/4 max-w-md"
        name="bloodType"
        id=""
        onChange={(e) => setBloodGroup(e.target.value)}
      >
        <option value="">Blood Group</option>
        {bloodgroup.map((group, index) => {
          return (
            <option key={index} value={group}>
              {group}
            </option>
          );
        })}
      </select>
      <input
        onChange={(e) => setIdCardNumber(e.target.value)}
        className="p-3 rounded-xl border-solid border-[#EA3A60] border-b-2 text-xl w-3/4 max-w-md"
        type="text"
        name="idCardNumber"
        placeholder="Enter your ID Card Number..."
        id=""
        value={details.idCardNumber}
      />
      <button
        onClick={createUser}
        className="p-4 rounded-xl mt-8 w-full max-w-md bg-[#EA3A60] text-white text-xl font-bold"
      >
        Submit
      </button>
    </div>
  );
};

export default NewProfile;

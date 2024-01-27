import React, { useEffect, useState } from 'react'
import { Button, Input, FormControl, FormLabel, Select, Grid, GridItem, useToast, AutoCom } from '@chakra-ui/react';
import axios from 'axios';
import { url } from '../../Global/URL';
import showToast from '../../Global/Toast';
import { getUserDetails } from '../../Global/authUtils';
import { useNavigate } from 'react-router-dom';


const RequestBlood = () => {
    const [name, setName] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [unitsRequested, setUnitsRequested] = useState('');
    const [hospital, setHospital] = useState('');
    const toast = useToast();
    const navigate = useNavigate();
    const [buttonLoading, setButtonLoading] = useState(false);
    const [hospitals, setHospitals] = useState([]);

    const getHospitals = async () => {
        try {
            const res = await axios.get(url + `/hospitals/all?select=name,city`);
            var data = []
            for (let i = 0; i < (res.data.data).length; i++) {
                data.push({name: res.data.data[i].name, city:  res.data.data[i].city});
            }
            setHospitals(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        try {

            getHospitals();

        } catch (error) {
            console.log(error)
        }
    },[])

    const handleRequestBlood = async () => {
        var user = null;
        setButtonLoading(true);
        try {
            user = await getUserDetails();
            console.log(user);
        } catch (error) {
            setButtonLoading(false);
            console.log(error);
            navigate('/login');
        }
        try {
            const postedBy = { name: user.name, contact_no: user.contact_no, email: user.email }
            const data = { postedBy, name: name, bloodType: bloodType, unitsRequested: unitsRequested, hospital: hospital }
            console.log(data);
            const response = await axios.post(url + '/post-emergency-request', data);
            console.log(response.data)
            if (response.data.success) {
                showToast(toast, "Success", 'success', "Request Posted Successfully");
            } else {
                showToast(toast, "Warning", 'info', "Cannot post Duplicate Request");
            }

        } catch (error) {
            showToast(toast, "Error", 'error', "Something Wen't Wrong !");
        }
        setButtonLoading(false);
    };

    return (
        <div>
            <FormControl p={2}>
                <FormLabel>Name</FormLabel>
                <Input
                    type='text'
                    placeholder='Enter your name'
                    colorScheme='red'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>

            <Grid templateColumns='repeat(2, 1fr)' gap={4} p={2}>
                <GridItem colSpan={1}>
                    <FormControl mt={4}>
                        <FormLabel>Blood Type</FormLabel>
                        <Select
                            placeholder='Blood Group'
                            colorScheme='red'
                            value={bloodType}
                            onChange={(e) => setBloodType(e.target.value)}
                        >
                            <option value='A+'>A+</option>
                            <option value='A-'>A-</option>
                            <option value='B+'>B+</option>
                            <option value='B-'>B-</option>
                            <option value='AB+'>AB+</option>
                            <option value='AB-'>AB-</option>
                            <option value='O+'>O+</option>
                            <option value='O-'>O-</option>
                        </Select>
                    </FormControl>
                </GridItem>

                <GridItem colSpan={1}>
                    <FormControl mt={4}>
                        <FormLabel>Units Requested</FormLabel>
                        <Input
                            type='number'
                            placeholder='Enter the number of units'
                            colorScheme='red'
                            value={unitsRequested}
                            onChange={(e) => setUnitsRequested(e.target.value)}
                        />
                    </FormControl>
                </GridItem>
            </Grid>

            <FormControl mt={4} p={2}>
                <FormLabel>Hospital</FormLabel>

                <Select
                    placeholder='Select Hospital'
                    colorScheme='red'
                    value={hospital}
                    onChange={(e) => setHospital(e.target.value)}
                >
                    {hospitals.map((hos) => {
                        console.log(hos);
                        return (
                            <option value={hos.name}>{hos.name + ", "+ hos.city}</option>
                        );
                    })}
                </Select>

            </FormControl>

            <Button isLoading={buttonLoading} mt={4} colorScheme='red' width={'100%'} onClick={handleRequestBlood}>
                Request Blood
            </Button>
            <Button mt={4} colorScheme='gray' color={'red'} width={'100%'} border={'solid 1px red'} onClick={() => {
                return navigate('/past-requests');
            }}>
                View Past Requests
            </Button>
        </div>
    )
}

export default RequestBlood;

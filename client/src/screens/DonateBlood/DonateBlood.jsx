import React, { useState,useEffect } from 'react'
import {Tab,Tabs,TabList,TabPanel,TabPanels, Box, Text, Stack,Card,CardBody,Flex,Button,CardFooter,Heading} from '@chakra-ui/react'
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdBloodtype } from "react-icons/md";
import { BiSolidDonateBlood } from "react-icons/bi";
import GoogleMapView from '../../components/GoogleMapView';

const DonateBlood = () => {
  
  const [userLocation,setUserLocation]=useState([]);

  const getUserLocation = ()=>{
    navigator.geolocation.getCurrentPosition((pos)=>{
    //  console.log(pos)
     setUserLocation({
       lat:pos.coords.latitude,
       lng:pos.coords.longitude
     })
    })
 }

 useEffect(()=>{
     getUserLocation();
 },[])

  const data = [
        {
          name: 'Emilia Parkir',
          HospitalName: 'Sarana Hospital, Kalyan',
          PhNo: '9082049861',
          Units: '3',
          type: 'Plasma',
          bloodGrp: 'AB+'
        },
        {
          name: 'John Doe',
          HospitalName: 'City Hospital',
          PhNo: '1234567890',
          Units: '2',
          type: 'Blood',
          bloodGrp: 'O+'
        },
        {
          name: 'Jane Smith',
          HospitalName: 'County Medical Center',
          PhNo: '9876543210',
          Units: '5',
          type: 'Platelets',
          bloodGrp: 'A-'
        },
        {
          name: 'Alice Johnson',
          HospitalName: 'Community Clinic',
          PhNo: '7890123456',
          Units: '1',
          type: 'Plasma',
          bloodGrp: 'B+'
        },
        {
          name: 'Bob Brown',
          HospitalName: 'Regional Hospital',
          PhNo: '3456789012',
          Units: '4',
          type: 'Blood',
          bloodGrp: 'A+'
        },
        {
          name: 'Eva Martinez',
          HospitalName: 'Metropolitan Medical Center',
          PhNo: '8901234567',
          Units: '2',
          type: 'Platelets',
          bloodGrp: 'O-'
        },
        {
          name: 'David Wilson',
          HospitalName: 'University Hospital',
          PhNo: '5678901234',
          Units: '3',
          type: 'Plasma',
          bloodGrp: 'AB-'
        },
        {
          name: 'Sarah Thompson',
          HospitalName: 'City General Hospital',
          PhNo: '2345678901',
          Units: '1',
          type: 'Blood',
          bloodGrp: 'B-'
        },
        {
          name: 'Michael Rodriguez',
          HospitalName: 'Children\'s Hospital',
          PhNo: '6789012345',
          Units: '6',
          type: 'Platelets',
          bloodGrp: 'A+'
        },
        {
          name: 'Olivia Lee',
          HospitalName: 'Veterans Medical Center',
          PhNo: '9012345678',
          Units: '2',
          type: 'Plasma',
          bloodGrp: 'O+'
        },
        {
          name: 'Daniel Garcia',
          HospitalName: 'Private Practice Clinic',
          PhNo: '4567890123',
          Units: '4',
          type: 'Blood',
          bloodGrp: 'AB+'
        },
        {
          name: 'Sophia Kim',
          HospitalName: 'Medical Group Practice',
          PhNo: '1234905678',
          Units: '3',
          type: 'Platelets',
          bloodGrp: 'B-'
        }
      ];
         
//    const [data,setdata]=useState();

//    useEffect(() => {
//     const fetchData = async () => {
//       try {
//         var endpoint = url + 'get-prisoners-under-lawyer/?_id=';
//         const response = await axios.get(endpoint);
//         setData(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData(); 
//   }, []);
  
   return (
    <Tabs isFitted variant='enclosed' className='' >
        <TabList mb='1em'>
            <Tab className='bg-gray-500' _selected={{ color: 'white', bg: 'blue.500' , fontWeight:600 }}>Request near me</Tab>
            <Tab className='bg-gray-500' _selected={{ color: 'white', bg: 'teal.500' , fontWeight:600 }}>All Request</Tab>
        </TabList>
        <TabPanels  p={0}>
            <TabPanel p={0}>
            <Card maxW='sm' border='1px solid #EA3A60' justifyContent='center' justifyItems='center' padding={0}>
                <CardBody justifyContent='center' justifyItems='center' alignItems='center' padding={1}>
                   <GoogleMapView userLocation={userLocation}/>
                </CardBody>
              </Card>
              <Card maxW='sm' border='1px solid #EA3A60' justifyContent='center' justifyItems='center' padding={0} marginTop={2}>
                <CardBody justifyContent='center' justifyItems='center' alignItems='center' padding={1}>
                   <Text className='text-center font-bold font-lg'>SARANA HOSPITAL</Text>
                   <Flex justify='space-between'>
                                    <Flex direction='column' padding={0}>
                                        <Flex alignItems='center'><FaMapMarkerAlt size={15} color='#EA3A60'/><Text className='ml-2 text-black font-semibold'>421204</Text></Flex>
                                        <Flex alignItems='center'><FaPhone size={15} color='#EA3A60'/><Text className='ml-2 text-black font-semibold'>9082049861</Text></Flex>
                                    </Flex>
                                    <Flex direction='column' padding={0}>
                                        <Flex alignItems='center'><MdBloodtype size={15} color='#EA3A60'/><Text className='ml-2 text-black font-semibold'>9:30</Text></Flex>
                                        <Flex alignItems='center'><BiSolidDonateBlood size={15} color='#EA3A60'/><Text className='ml-2 text-black font-semibold'>Email</Text></Flex>
                                   </Flex>
                    </Flex>
                </CardBody>
              </Card>
            </TabPanel>

            {/* PART TWO */}

            <TabPanel p={0}>
               <Stack padding={1} overflowY="auto" marginBottom={24}>
                  {data && data.map((item,index)=>{
                    return(
                    <Card maxW='sm'  className='shadow-lg' key={index}>
                        <CardBody>
                            <Stack spacing='0'>
                            <Flex justify='space-between ' alignItems='center' className='mb-2'>      
                                <Heading size='md' >{item.name}</Heading>
                                <div className='bg-[#EA3A60] w-fit p-1 rounded-full flex items-center justify-center'><Text className='font-bold text-white text-xs'>{item.bloodGrp}</Text></div>
                            </Flex>
                                <div></div>
                                <Flex justify='space-between'>
                                    <Flex direction='column' padding={0}>
                                        <Flex alignItems='center'><FaMapMarkerAlt size={15} color='#EA3A60'/><Text className='ml-2 text-black font-semibold'>{item.HospitalName}</Text></Flex>
                                        <Flex alignItems='center'><FaPhone size={15} color='#EA3A60'/><Text className='ml-2 text-black font-semibold'>{item.PhNo}</Text></Flex>
                                    </Flex>
                                    <Flex direction='column' padding={0}>
                                        <Flex alignItems='center'><MdBloodtype size={15} color='#EA3A60'/><Text className='ml-2 text-black font-semibold'>{item.Units} Units</Text></Flex>
                                        <Flex alignItems='center'><BiSolidDonateBlood size={15} color='#EA3A60'/><Text className='ml-2 text-black font-semibold'>{item.type}</Text></Flex>
                                    </Flex>
                                </Flex>
                            </Stack>
                        </CardBody>
                    </Card>
                  )})}
                </Stack>
             </TabPanel>

        </TabPanels>
        </Tabs>

  )
}

export default DonateBlood
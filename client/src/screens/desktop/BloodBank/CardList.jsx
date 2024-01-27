import React from 'react';
import { Box, Flex, Text, Badge, Spacer } from '@chakra-ui/react';

const CardList = ({ data }) => {
  return (
    <>
      {data.map((card, index) => (
        <Box
        
          key={index}
          p={4}
          mb={4}
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
          bg="red.100"
        >
          <Flex align="center">
            <Box>
              <Text fontWeight="bold">{card.name}</Text>
              <Text>{card.city + ", "+ card.state}</Text>
              <Text>{"+91 " + card.contactNo}</Text>
            </Box>
            <Spacer />

          </Flex>
        </Box>
      ))}
    </>
  );
};

export default CardList;

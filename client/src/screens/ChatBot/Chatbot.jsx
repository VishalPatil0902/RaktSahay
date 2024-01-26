import React, { useEffect, useRef, useState } from 'react';
import { Box, InputGroup, Input, Button, InputRightElement, Textarea, Card, CardBody, Stack, Image, Text } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { IoMdSend } from 'react-icons/io';
import AIImage from '../../Images/AI.svg';
import USERIMAGE from '../../Images/USER.jpg';
import { DNA } from 'react-loader-spinner';
import { TogetherAI } from "@langchain/community/llms/togetherai";
import { PromptTemplate } from "@langchain/core/prompts";


const ChatBot = () => {

    const msgEnd = useRef(null);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");
    const apiKey = 'e3862d30f948aa39a68d5cbbead33b2e9cb1501b1e1e980f207f7e92cb0bad44';
    const model = new TogetherAI({
        modelName: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        apiKey: apiKey
    });
    const prompt = PromptTemplate.fromTemplate(`Instruction: Only Answer the Question asked by user if it is related to Blood Donation. Otherwise only tell the user that he or she should only ask questions related to Blood Donation and dont give the answer. 
Question: {input}.
Answer:`);
    const chain = prompt.pipe(model);
    const [messages, setMessages] = useState([
        {
            text: 'Hi, How may i Assist you ?',
            isBot: true,
        },
    ]);

    const handleNewChat = () => {
        setMessages([
            {
                text: 'Hi,, How may i Assist you ?',
                isBot: true,
            },
        ]);
    };

    useEffect(() => {
        msgEnd.current.scrollIntoView();
    }, [messages]);

    const handleSend = async () => {
        const text = input;
        setInput('');
        setMessages([
            ...messages,
            { text, isBot: false }
        ]);

        setLoading(true);
        var res = null;
        try{
        res = await chain.invoke({
            input: text,
        });
        }
        catch (error){
            res = "Sorry, I cannot answer your Query Right now. Please try after sometime."
        }
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: res, isBot: true }
        ]);
        setLoading(false);      
    };

    return (
        <Box height='80%'>
            <Box
                bg='#eee'
                marginBottom='1rem'
                marginTop='1rem'
                borderRadius='5px'
                border='0.7px solid #6fa6cb'
                padding='0.5rem'
                maxHeight='75%'
                overflowY='scroll'
                overflowX='hidden'
                height='70vh'
                css={{
                    '&::-webkit-scrollbar': {
                        width: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: 'white',
                        borderRadius: '24px',
                    },
                }}
            >


                {messages.map((message, index) => {
                    return (
                        <Card
                            direction='row'
                            variant={message.isBot ? 'outline' : null}
                            bg=''
                            marginTop='1rem'
                            height='fit-content'
                            key={index}
                            style={{ wordWrap: 'break-word' }}
                            css={
                                message.isBot ? {
                                    background: '#ddd',
                                    boxShadow: '0 0 10px 0px red',
                                    backdropFilter: 'blur(20px)',
                                    WebkitBackdropFilter: 'blur(20px)',
                                    border: '0.5px solid red',
                                } :
                                    {
                                        background: 'none'

                                    }
                            }
                        >
                            <Image
                                objectFit='cover'
                                width='30px'
                                height='30px'
                                margin='0.5rem'
                                src={message.isBot ? AIImage : USERIMAGE}
                                alt='Caffe Latte'
                                borderRadius='8px'
                                bg='red'
                            />

                            <CardBody p='0.5rem' style={{ overflowWrap: 'break-word', wordBreak: 'break-all' }}>
                                <Text
                                    textAlign='left'
                                    fontFamily='Poppins'
                                    color={message.isBot ? 'black' : 'black'}
                                    fontWeight='600'
                                >
                                    {message.text}
                                </Text>
                            </CardBody>
                        </Card>
                    );
                })}

                {loading && <Card
                    direction='row'
                    overflow='hidden'
                    variant='outline'
                    bg='lightblue'
                    marginTop='1rem'
                    height='fit-content'
                    css={{
                        background: '#ddd',
                        boxShadow: '0 0 20px 0px red',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid red',
                    }
                    }
                >
                    <Image
                        objectFit='cover'
                        width='30px'
                        height='30px'
                        margin='0.5rem'
                        src={AIImage}
                        alt='Caffe Latte'
                        borderRadius='8px'
                        bg='red'
                    />

                    <CardBody p='0.5rem' >
                        <Text textAlign='left' fontFamily='Poppins' color={'black'} fontWeight='600'>
                            <DNA
                                visible={true}
                                height="50"
                                width="50"
                                ariaLabel="dna-loading"
                                wrapperStyle={{}}
                                wrapperClass="dna-wrapper"
                            />
                        </Text>
                    </CardBody>
                </Card>}


                <div ref={msgEnd} />
            </Box>

            {/* //input box */}
            <Box width='100%' height='20%' maxH={'20%'}>
                <InputGroup>
                    <Textarea
                        pr='3.5rem'
                        type='text'
                        placeholder='Enter Message'
                        borderRadius='7px'
                        bg='#eee'
                        color='black'
                        css={{
                            '&::-webkit-scrollbar': {
                                width: '4px',
                            },
                            '&::-webkit-scrollbar-track': {
                                width: '6px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: 'white',
                                borderRadius: '24px',
                            },
                        }}

                        value={input}
                        onChange={(e) => { setInput(e.target.value) }}
                    />
                    <InputRightElement width='2.5rem' marginRight='1rem' height='100%'>
                        <Button h='1.75rem' size='sm' onClick={handleSend}>
                            <Icon as={IoMdSend} color='black' />
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </Box>

            {/* //inputboxends */}
        </Box>
    );
};

export default ChatBot;

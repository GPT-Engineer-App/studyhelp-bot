import React, { useState } from "react";
import { Container, VStack, Input, Button, Box, Text, Heading, useToast, HStack } from "@chakra-ui/react";
import { FaRobot } from "react-icons/fa";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const toast = useToast();

  const handleSendMessage = () => {
    if (input.trim() === "") {
      toast({
        title: "Empty message",
        description: "You can't send an empty message.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newMessage = {
      id: messages.length + 1,
      text: input,
      sender: "user",
    };

    // Simulate a response from the bot
    const botResponse = {
      id: messages.length + 2,
      text: `StudyHelp: I received your message: "${input}". How can I assist you further?`,
      sender: "bot",
    };

    setMessages([...messages, newMessage, botResponse]);
    setInput("");
  };

  return (
    <Container centerContent maxW="container.md" p={4}>
      <VStack spacing={4} w="100%">
        <Heading as="h1" size="lg" mb={4}>
          StudyHelp Chatbot <FaRobot />
        </Heading>
        <Box w="100%" h="400px" overflowY="scroll" p={3} border="1px" borderColor="gray.200">
          {messages.map((message) => (
            <Box key={message.id} alignSelf={message.sender === "user" ? "flex-end" : "flex-start"}>
              <Text fontSize="md" bg={message.sender === "user" ? "blue.100" : "green.100"} p={2} borderRadius="md">
                {message.text}
              </Text>
            </Box>
          ))}
        </Box>
        <HStack w="100%">
          <Input placeholder="Type your message here..." value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSendMessage()} />
          <Button colorScheme="blue" onClick={handleSendMessage}>
            Send
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
};

export default Index;

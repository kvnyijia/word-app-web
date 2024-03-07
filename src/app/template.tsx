// import { NavBar } from "../components/NavBar";
"use client";
import { Flex } from "@chakra-ui/react";
import { NavBar } from "../components/NavBar";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar/>
      <Flex
        mt={8}
        mx="auto"
        maxW="1300px"
        w="100%"
      >
        {children}
      </Flex>
    </>
  )
}
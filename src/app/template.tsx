// import { NavBar } from "../components/NavBar";
"use client";
import { Box } from "@chakra-ui/react";
import { NavBar } from "../components/NavBar";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar/>
      <Box
        mt={8}
        mx="auto"
        maxW="1000px"
        w="100%"
      >
      {children}
      </Box>
    </>
  )
}
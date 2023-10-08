import { Box } from "@chakra-ui/react";

interface LayoutProps {
  children: any;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      mt={8}
      mx="auto"
      maxW="1000px"
      w="100%"
    >
      {children}
    </Box>
  );
};
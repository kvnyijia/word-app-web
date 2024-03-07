import { Box, HStack, Text } from "@chakra-ui/react";
import { useAppSelector } from "../redux/hooks";

function Leaderboard() {
  const leaderboard = useAppSelector(state => state.rightSide_reducer.leaderboard)

  return (
    <>
      {leaderboard.map((item, index) => (
        <Box key={index} bg="tomato" p={2} m={2} borderRadius={10}>
          <HStack>
            <Text>{item.key}</Text>
            <Text>{item.value}</Text>
          </HStack>
        </Box>
      ))}
    </>
  );
}

export default Leaderboard;

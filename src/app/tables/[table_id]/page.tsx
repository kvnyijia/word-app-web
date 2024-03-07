'use client'
import { ArrowBackIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Card, CardBody, Flex, Heading, IconButton, Image, SimpleGrid, Text, useToast } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CreateWordPopover } from "../../../components/CreateWordPopover";
import Leaderboard from "../../../components/Leaderboard";
import { wordServices } from "../../../utils/wordServices";

const Table = () => {
  const router = useRouter();
  // const table_id = router.pathname;//.substring(8);
  const pathname = usePathname();
  const table_id = pathname ? pathname.substring(8) : 0;

  const toast = useToast();

  const [words, setWords] = useState<any[]>([]);
  function getWords(table_id: number | string) {
    wordServices.getWords(table_id)
      .then(({ resJson }) => {
        setWords(resJson.words);
      })
      .catch(() => {});
  }

  function deleteWord(table_id: number | string, word_id: number) {
    wordServices.deleteWord(word_id)
      .then(() => {
        getWords(table_id);
        toast({
          title: 'Word deleted.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          title: 'Errors happened, try again.',
          description: JSON.stringify(err),
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  }

  useEffect(() => {
    getWords(table_id);
  }, [table_id]);

  const body = !words ? (
    "Login again to see your flaskcards"
  ) : (
    <Box
      flex={1}
    >
      <IconButton
        mb={5}
        aria-label="back to previous page"
        icon={<ArrowBackIcon/>}
        onClick={() => { 
          router.back();
        }}
      />
      <Flex flexDirection='column' justifyContent='space-between' pb={5}>
        <Text>Your words</Text>
        <CreateWordPopover table_id={table_id}/>
      </Flex>
      <SimpleGrid columns={2} spacing={4}>
      {words.map((word, index) => (
        <Card variant='filled' borderRadius='lg' p={5} key={index}>
          <CardBody>
          <Heading as='h3' size='sm'>{word.term}</Heading>
          <Text>{word.meaning}</Text>
          <Image
            boxSize='150px'
            src={word.picture_url}
            alt={word.term}
          />
          <IconButton
            aria-label="Delete"
            icon={<DeleteIcon/>}
            size='xs'
            mt={3}
            p={3}
            variant="link"
            colorScheme="red"
            isRound={true}
            style={{border: "solid"}}
            onClick={() => {
              deleteWord(table_id, word.id);
            }}
          />
          </CardBody>
        </Card>
      ))}
      </SimpleGrid>
    </Box>
  );

  return (
    <>
      {body}
      <Box w='350px' p={5}>
        <Leaderboard/>
      </Box>
    </>
  )
};

export default Table;

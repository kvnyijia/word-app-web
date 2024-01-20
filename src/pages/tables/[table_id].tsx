import { ArrowBackIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CreateWordPopover } from "../../components/CreateWordPopover";
import { Layout } from "../../components/Layout";
import { wordServices } from "../../utils/wordServices";

const Table = () => {
  const router = useRouter();
  const table_id = router.asPath.substring(8);

  const [words, setWords] = useState<any[]>([]);
  useEffect(() => {
    wordServices.getWords(table_id)
      .then(({ resJson }) => {
        setWords(resJson.words);
      })
      .catch(() => {});
  }, [table_id]);

  const body = !words ? (
    "Login again to see your flaskcards"
  ) : (
    <>
      <Flex justifyContent='space-between' pb={5}>
        <Text>Your words</Text>
        <CreateWordPopover table_id={table_id}/>
      </Flex>
      <SimpleGrid columns={2} spacing={4}>
      {words.map((word, index) => (
        <Box borderRadius='lg' bg='grey' p={5} key={index}>
          <Text>{word.term}</Text>
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
              wordServices.deleteWord(word.id)
                .then(() => {
                  window.location.reload();
                })
                .catch(() => {});
            }}
          />
        </Box>
      ))}
      </SimpleGrid>
    </>
  );

  return (
    <Layout>
      <IconButton
        mb={5}
        aria-label="back to previous page"
        icon={<ArrowBackIcon/>}
        onClick={() => { 
          router.back();
        }}
      />
      {body}
    </Layout>
  )
};

export default Table;

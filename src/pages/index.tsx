import { Layout } from '../components/Layout';
import { Button, Flex, HStack, IconButton, SimpleGrid, Text, useToast } from '@chakra-ui/react';
import NextLink from "next/link";
import { CreateTablePopover } from '../components/CreateTablePopover';
import { useState, useEffect } from 'react';
import { userServices } from '../utils/userServices';
import { tableServices } from '../utils/tableServices';
import { DeleteIcon } from '@chakra-ui/icons';

interface loginUserRecord {
  username: string;
  email: string;
}

const Index = () => {
  const toast = useToast();

  const [loginUser, setLoginUser] = useState<loginUserRecord>({} as loginUserRecord);
  useEffect(() => {
    const loginUserItem = localStorage.getItem("loginUser");
    const jsonLoginUserItem = JSON.parse(loginUserItem);
    setLoginUser(jsonLoginUserItem);
  }, []);

  const [username, setUsername] = useState<any>();
  const [authTokenIsValid, setAuthTokenIsValid] = useState(false);
  useEffect(() => {
    if (typeof loginUser?.username !== "undefined") {
      userServices.getUser(loginUser.username)
        .then(({resJson, ok}) => {
          if (ok) {
            setUsername(resJson.username);
            setAuthTokenIsValid(true);
          }
        })
        .catch(() => {});
    }
  }, [loginUser]);

  const [tables, setTables] = useState<any[]>([]);
  useEffect(() => {
    getTables(loginUser, authTokenIsValid);
  }, [loginUser, authTokenIsValid]);

  function getTables(loginUser, authTokenIsValid) {
    if (loginUser && authTokenIsValid) {
      tableServices.getTables(username)
        .then(({ resJson }) => {
          setTables(resJson.tables);
        })
        .catch(() => {});
    }
  }

  function deleteTable(table_id) {
    tableServices.deleteTable(table_id)
      .then(() => {
        getTables(loginUser, authTokenIsValid);
        toast({
          title: 'Table deleted.',
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

  const buildTables = () => {
    return (
      <SimpleGrid columns={2} spacing={4}>
        {tables.map((table, index) => {
          return (
            <HStack>
              <NextLink key={index} href={`tables/${table.id}`}>
                <Button key={index} padding={10} w={400}>{table.name}</Button>
              </NextLink>
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
                onClick={() => { deleteTable(table.id); }}
              />
            </HStack>
          );
        })}
      </SimpleGrid>
    )
  };

  const body = !loginUser || !authTokenIsValid ? (
    "Login to see your flaskcards"
  ) : (
    <Flex flexDirection='column'>
      <Flex justifyContent='space-between' pb={5}>
        <Text>Your tables</Text>
        <CreateTablePopover username={username}/>
      </Flex>
      {buildTables()}
    </Flex>
  );
  
  return (
    <Layout>
      {body}
    </Layout>
  );
};

export default Index;

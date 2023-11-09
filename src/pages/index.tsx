import { NavBar } from '../components/NavBar';
import { Layout } from '../components/Layout';
import { Button, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import NextLink from "next/link";
import { CreateTablePopover } from '../components/CreateTablePopover';
import { useState, useEffect } from 'react';
import { userServices } from '../utils/userServices';
import { tableServices } from '../utils/tableServices';

interface loginUserRecord {
  username: string;
  email: string;
}

const Index = () => {

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
    if (loginUser && authTokenIsValid) {
      tableServices.getTables(username)
        .then(({ resJson }) => {
          setTables(resJson.tables);
        })
        .catch(() => {});
    }
  }, [loginUser, authTokenIsValid]);

  const buildTables = () => {
    return (
      <SimpleGrid columns={2} spacing={4}>
        {tables.map((table, index) => {
          return (
            <Button padding={10} key={index}>{table.name}</Button>
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

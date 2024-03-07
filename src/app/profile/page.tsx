'use client'
import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { userServices } from "../../utils/userServices";

interface loginUserProps {
  username: string;
  email: string;
}

const Profile = () => {
  const [loginUser, setLoginUser] = useState<loginUserProps>({} as loginUserProps);

  useEffect(() => {
    const loginUserItem = localStorage.getItem("loginUser");
    const jsonLoginUserItem = JSON.parse(loginUserItem ? loginUserItem : "{}");
    setLoginUser(jsonLoginUserItem);
  }, []);

  const [fetchUsername, setFetchUsername] = useState<any>();

  useEffect(() => {
    if (typeof loginUser?.username !== "undefined") {
      userServices.getUser(loginUser.username)
        .then(({resJson}) => {
          console.log(resJson);
          setFetchUsername(resJson.username);
        })
        .catch(() => {});
    }
  }, [loginUser]);

  const userLoginState = useAppSelector(state => state.userLogin_reducer.login);
  const child = loginUser ? (
    <>
    
    <HStack>
      <Image
        boxSize="200px"
        borderRadius="full"
        src="https://media.istockphoto.com/id/1393750072/vector/flat-white-icon-man-for-web-design-silhouette-flat-illustration-vector-illustration-stock.jpg?s=612x612&w=0&k=20&c=s9hO4SpyvrDIfELozPpiB_WtzQV9KhoMUP9R9gVohoU="
        alt=""
      />
      <VStack>
        <Text>Profile</Text>
        <Text>{`fetch username = ${fetchUsername}`}</Text>
      </VStack>
    </HStack>
    </>
  ) : (
    <>
    <Text>Not Login</Text>
    <Text>{`${userLoginState}`}</Text>
    </>
  )

  return (
    <>
      {child}
    </>
  );
};

export default Profile;

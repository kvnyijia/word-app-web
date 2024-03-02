import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { userServices } from "../utils/userServices";

interface loginUserProps {
  username: string;
  email: string;
}

const Profile = () => {
  const [loginUser, setLoginUser] = useState<loginUserProps>({} as loginUserProps);

  useEffect(() => {
    const loginUserItem = localStorage.getItem("loginUser");
    const jsonLoginUserItem = JSON.parse(loginUserItem);
    setLoginUser(jsonLoginUserItem);
  }, []);

  const [username, setUsername] = useState<any>();

  useEffect(() => {
    if (typeof loginUser?.username !== "undefined") {
      userServices.getUser(loginUser.username)
        .then(({resJson}) => {
          setUsername(resJson.username);
        })
        .catch(() => {});
    }
  }, [loginUser]);

  return (
    <>
      profile
      <Text>
        {username}
      </Text>
    </>
  );
};

export default Profile;

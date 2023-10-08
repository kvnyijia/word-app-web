import { NavBar } from '../components/NavBar';
import { Layout } from '../components/Layout';

const Index = () => {
  let body = "Login to see your flaskcards";
  return (
    <>
      <NavBar/>
      <Layout>
        {body}
      </Layout>
    </>
  );
};

export default Index;

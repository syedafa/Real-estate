import { EstateState } from "../context/EstateProvider";

function Home() {
  const { user } = EstateState();
  console.log(user);
  return <div>Home</div>;
}

export default Home;

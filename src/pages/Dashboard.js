import { useSelector } from "react-redux";

const Dashboard = () => {
  console.log('++++++++++++++++++++++++++++++++ This is Dashboard Page ++++++++++++++++++++++++')
  const accessToken = useSelector((state)=> state.auth.accessToken)
  return (
    <div className="title">dashboard</div>
  )
};

export default Dashboard;

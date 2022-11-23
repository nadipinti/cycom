import "./App.scss";
import { BrowserRouter  } from "react-router-dom";
import { useSelector } from "react-redux";
import Approutes from './approutes/Approutes'
import Login from './pages/Login'


function App() {
  console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ App Loading')
  const accessToken = useSelector((state)=> state.auth.accessToken)
  // const accessToken = localStorage.getItem('token')
  console.log('login', accessToken)
  return (
    <BrowserRouter>
      {accessToken ?
        <Approutes /> : <Login />}
    </BrowserRouter>
  );
}

export default App;

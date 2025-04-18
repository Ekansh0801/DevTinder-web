import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./components/Body"
import Login from "./components/Login"
import Profile from "./components/Profile"
import { Provider, useDispatch } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./components/Feed"
import Connections from "./components/connections"
import Requests from "./components/Requests"
import Chat from "./components/Chat"

function App() {


  return (
    <div>
         <Provider store={appStore}>
         <BrowserRouter basename="/">
           <Routes>
            <Route path="/" element={<Body/>}>
              <Route path="/" element={<Login/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/connections" element={<Connections/>}/>
              <Route path="/requests" element={<Requests/>}/>
              <Route path="/feed" element={<Feed/>}/>
              <Route path="/chat/:targetUserId" element={<Chat/>}/>
            </Route>
           </Routes>
         </BrowserRouter>
         </Provider>
    </div>
  )
}

export default App

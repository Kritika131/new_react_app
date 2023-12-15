import { BrowserRouter ,Routes, Route} from "react-router-dom";
import Home from "./components/home/Home";
import PostDetail from "./components/postDetail/PostDetail";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/post/:id" element={<PostDetail/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

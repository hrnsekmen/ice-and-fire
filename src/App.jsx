import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import BookDetail from "./components/book/BookDetail";
import Books from "./components/book/Books";
import CharacterDetail from "./components/character/CharacterDetail";
import Characters from "./components/character/Characters";
import HouseDetail from "./components/house/HouseDetail";
import Houses from "./components/house/Houses";
import Layout from "./components/layout/Layout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/houses" element={<Houses />} />
          <Route path="houses/:id" element={<HouseDetail />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="characters/:id" element={<CharacterDetail />} />
          <Route path="/books" element={<Books />} />
          <Route path="books/:id" element={<BookDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;

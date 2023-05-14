import { Route, Routes } from 'react-router-dom';
import './App.css';
import BookNow from './component/book_now/BookNow';
import Details from './component/details/Details';
import SearchResults from './component/search_results/SearchResults';
import UserDetails from './component/user_details/UserDetails';
import Head from './component/head/Head'

function App() {
  return (
    <>
    <Head/>
    <Routes>
      <Route path='/' element={<BookNow/>}/>
      <Route path='/search_results' element={<SearchResults/>}/>
      <Route path='/user_details' element={<UserDetails/>}/>
      <Route path='/details' element={<Details/>} />
    </Routes>
    </>
  );
}

export default App;

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


// import React from 'react';

// function App() {
//   const initiatePayment = () => {
//     window.location.href = "https://www.aahanaresort.com/quick-pay/NON_SEAMLESS_KIT/dataForm.php"
//     // fetch('/ccavenue/request')
//     //   .then((response) => response.text())
//     //   .then((formFields) => {
//     //     const form = document.createElement('form');
//     //     form.action = 'https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction';
//     //     form.method = 'POST';
//     //     form.innerHTML = formFields;
//     //     document.body.appendChild(form);
//     //     form.submit();
//     //   })
//     //   .catch((error) => console.error(error));
//   };

//   return (
//     <div className="App">
//       <button onClick={initiatePayment}>Make Payment</button>
//     </div>
//   );
// }

// export default App;

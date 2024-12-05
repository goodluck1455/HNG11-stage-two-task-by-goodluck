
import './App.css'
import Header from "./assets/Header";
import Footer from './assets/Footer';
import {HashRouter as BrowserRouter, Routes, Route, useLocation, } from 'react-router-dom';
import HomePage from './assets/HomePage';
import Shop from './assets/Shop';
import Cart from './assets/Cart';
import NotFound from './assets/NotFound';
import CheckOutPage from './assets/CheckOutPage';
import ScrollToTop from './assets/ScrollTop';
import ProductDescription from './assets/ProductDescription';
import { useEffect, useState } from 'react';
// import RootLayer from './assets/DataTesting/RootLayer';
// import Descript from './assets/DataTesting/Descript';
// import DataShow from './assets/DataTesting/dataShow';






// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route>
//    <Route path="/" element={<RootLayer />}>
//      <Route index  element={<Descript />}/>
//      <Route path="DataShow"  element={<DataShow /> }/>
//    </Route>
//    <Route index element={<HomePage />} />
//    <Route path="Shop" element={<Shop />} />
//    <Route path="Cart" element={<Cart />} />
//    <Route path="CheckOutPage" element={<CheckOutPage />} />
//    <Route path="/ProductDescription" element={<ProductDescription />} />
//    <Route path="*" element={<NotFound /> } />
//    </Route>
//   )
// )



interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <MainContent />
    </BrowserRouter>
  );
};

// Separate component to use `useLocation` and check window width
const MainContent: React.FC = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 375);
  const [isMobile_430, setIsMobile_430] = useState(window.innerWidth <= 430);
  const [isMediumSmall, setIsMediumSmall] = useState(window.innerWidth <= 360);
  const [isMediumScreen, setIsMediumScreen] = useState(window.innerWidth >= 320 && window.innerWidth <= 414);

  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 375);
      setIsMediumSmall(window.innerWidth <= 360);
      setIsMobile_430(window.innerWidth <= 430);
      setIsMediumScreen(window.innerWidth >= 320 && window.innerWidth <= 414);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Define paths where you don't want the footer to show on mobile
  const noFooterPaths = ["/ProductDescription"];


  const shouldRenderFooter = !(
    (isMobile || isMediumScreen || isMediumSmall || isMobile_430 ) && 
    noFooterPaths.includes(location.pathname)
  );

  return (
    <>
      <main>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="Shop" element={<Shop />} />
          <Route path="Cart" element={<Cart />} />
          <Route path="CheckOutPage" element={<CheckOutPage />} />
          <Route path="/ProductDescription" element={<ProductDescription />} />
          <Route path="*" element={<NotFound /> } />
        </Routes>

       

      </main>

      {/* Conditionally render the Footer */}
      { shouldRenderFooter && <Footer />}
    </>
  );
};

export default App;










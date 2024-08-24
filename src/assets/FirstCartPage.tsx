import "./component styles/firstCartPage.css"
import "../assets/component styles/scrollingProduct.css";
// import KswissHeel from "../images/Group 18.png"
import { useState, useEffect } from "react";
// import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";
import { CiFilter as FilterIcon } from "react-icons/ci";
import {priceData4ProductDisplay} from "../assets/PriceData"
import { IoCloseSharp as FilterCloseBtn} from "react-icons/io5";
import InputRange from "./InputRange";
// import { Navigation } from "swiper/modules";
// import NavigationPanel from "./Navigation";
import ProductDisplay from "./ProductDisplay";
import ReactPaginate from "react-paginate";
import TurnHeadsLater from "./TurnHeadsLater";
// import Navigation from "./Navigation";
// import { useCart } from "react-use-cart";
// import ProductLayout from "./ProductLayout";
// import ProductDisplaySec from "./ProductDisplaySec";


// const router = createBrowserRouter(
//     createRoutesFromElements(
//       <Route path="ProductDisplaySec" element={<ProductDisplaySec />} />
        
     
//     )






// interface FirstCartPageProps {
//   pageCount:void, 
//    itemContainer:string, 
//    oldPrice:string, 
//    newPrice:string,
//    images:string
//   }
  
   
// )

interface FirstCartPageProps {
  showTurnHeadsLater?: boolean;
  gamesRef: React.RefObject<HTMLDivElement>;
  // handleClick: () => void;
}


const FirstCartPage: React.FC<FirstCartPageProps> = ({showTurnHeadsLater = true, gamesRef}) => {
// const FirstCartPage: React.FC = ({handleClick}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 375);
  const [openFilter, setOpenFilter] = useState(true);

  const [productDisplay] = useState(priceData4ProductDisplay.slice(0, 200))

  const [pageNumber, setPageNumber] = useState(0);
  const userPerPage = 12;
  const pageVisited = pageNumber * userPerPage;

  const productDisplayElement = productDisplay.slice(pageVisited, pageVisited + userPerPage)
  .map((product) => {
  
    return (
      <ProductDisplay
        id={product.id}
        images={product.Image}
        productName={product.productName}
        itemContainer={product.itemContainer}
        oldPrice={product.oldPrice}
        newPrice={product.newPrice}
        item={product}
       
      />
    );
  });

  



   const [checkedItems, setCheckedItems] = useState(
    {
     all: false,
    maleShoes: false,
    femaleShoes: false,
    childrenShoes: false,
    }
   )

 

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    

    const { name, checked } = event.target;

    if (name === 'all') {
      setCheckedItems({
     
        all: checked,
        maleShoes: checked,
        femaleShoes: checked,
        childrenShoes: checked,
      });
    } else {
      setCheckedItems((prevState) => {
        const newCheckedItems = { ...prevState, [name]: checked };

        if (name === 'femaleShoes' && checked) {
          newCheckedItems.maleShoes = false;
      
          newCheckedItems.childrenShoes = false;
        } else if (name === 'maleShoes' && checked) {
          newCheckedItems.femaleShoes = false;
          newCheckedItems.childrenShoes = false;
        }else if (name === 'childrenShoes' && checked) {
          newCheckedItems.femaleShoes= false;
          newCheckedItems.maleShoes = false;
        }

        return newCheckedItems;
      });
    }
  };

const pageCount = Math.ceil(productDisplay.length / userPerPage);
const changePage = ({selected}: { selected: number })=>{
  setPageNumber(selected)
}



  // Update state on window resize
 useEffect (() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 375);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

     const openFilterBtn = ()=>{
        setOpenFilter(false)
     }

     const closeFilterBTN = ()=>{
      setOpenFilter(true)
     }

    return (
      <>
       <div className="FirstCartPage---container" ref={gamesRef}>
            <div className="firstCARTpAGE---filterTag" onClick={openFilterBtn}>
              <p>Filter</p> <FilterIcon size={20} className="filterIcon"/>
            </div>
            {showTurnHeadsLater && <TurnHeadsLater />}
           {/* <TurnHeadsLater  media="HomeComponent"/> */}
         <div className="FirstCartPage---ViewPanel">
            <div className={openFilter ? "FirstCartPage---SearchPanel": "Close---SearchPanel"}>
              <FilterCloseBtn size={25} className="filtercloseBTN" onClick={closeFilterBTN}/>
               <h3>Filters</h3>
               <div>
               <span className="FirstCartPgae---checkBoxContainer-A">
               <input 
              
                   type="checkbox"
                   id="all"
                   name="all"
                   checked={checkedItems.all}
                   onChange={handleCheckboxChange}      /> 
               <label htmlFor="" className="FirstCartPgae---labelContent-A">All</label> 
               <label htmlFor="" >150</label>  
               </span>
               <span className="FirstCartPgae---checkBoxContainer-B">
               <input 
                type="checkbox"
                id="maleShoes"
                name="maleShoes"
                checked={checkedItems.maleShoes}
                onChange={handleCheckboxChange}
                disabled={checkedItems.all} /> 
               <label htmlFor="" className="FirstCartPgae---labelContent-B">Males Shoes</label> 
               <label htmlFor="" >50</label>  
               </span>
               <span className="FirstCartPgae---checkBoxContainer-B">
               <input 
              type="checkbox"
              id="femaleShoes"
              name="femaleShoes"
              checked={checkedItems.femaleShoes}
              onChange={handleCheckboxChange}
              disabled={checkedItems.all}
                /> 
               <label htmlFor="" className="FirstCartPgae---labelContent-C">Female shoes</label> 
               <label htmlFor="" >50</label>  
               </span>

               <span className="FirstCartPgae---checkBoxContainer-B">
               <input 
                 type="checkbox"
                 id="childrenShoes"
                 name="childrenShoes"
                 checked={checkedItems.childrenShoes}
                 onChange={handleCheckboxChange}
                 disabled={checkedItems.all}
               /> 
               <label htmlFor="" className="FirstCartPgae---labelContent-D">Children shoes</label> 
               <label htmlFor="" >50</label>  
               </span>
               </div>

              <div>
                
               <span className="FirstCartPgae---RangeBox">
               <h4>Price</h4>
               <InputRange /> 
               </span>
              </div>
              <div>

              <h4 className="FirstCartPage--size">Size</h4> 
              <span className="FirstCartPgae---checkBoxContainer-B">
             
               <input 
                 type="checkbox"
                 id="childrenShoes"
                 name="size-A"
                //  checked={checkedItems.childrenShoes}
                //  onChange={handleCheckboxChange}
                //  disabled={checkedItems.all}
               /> 
               <label htmlFor="" className="FirstCartPgae---labelContent-E">06 - 20</label> 
               <label htmlFor="" >20</label>  
               </span>
               <span className="FirstCartPgae---checkBoxContainer-B">
               <input 
                 type="checkbox"
                 id="childrenShoes"
                 name="size-B"
                //  checked={checkedItems.childrenShoes}
                //  onChange={handleCheckboxChange}
                //  disabled={checkedItems.all}
               /> 
               <label htmlFor="" className="FirstCartPgae---labelContent-E">20 - 30</label> 
               <label htmlFor="" >50</label>  
               </span>

               <span className="FirstCartPgae---checkBoxContainer-B">
               <input 
                 type="checkbox"
                 id="childrenShoes"
                 name="size-C"
                //  checked={checkedItems.childrenShoes}
                //  onChange={handleCheckboxChange}
                //  disabled={checkedItems.all}
               /> 
               <label htmlFor="" className="FirstCartPgae---labelContent-E">31 - 40</label> 
               <label htmlFor="" >40</label>  
               </span>

               <span className="FirstCartPgae---checkBoxContainer-B">
               <input 
                 type="checkbox"
                 id="childrenShoes"
                 name="size-D"
                //  checked={checkedItems.childrenShoes}
                //  onChange={handleCheckboxChange}
                //  disabled={checkedItems.all}
               /> 
               <label htmlFor="" className="FirstCartPgae---labelContent-E">41 - 50</label> 
               <label htmlFor="" >40</label>  
               </span>



               <h4 className="FirstCartPage--Brands">Brands</h4> 
              <span className="FirstCartPgae---checkBoxContainer-B">
               <input 
                 type="checkbox"
                 id="childrenShoes"
                 name="size-A"
                //  checked={checkedItems.childrenShoes}
                //  onChange={handleCheckboxChange}
                //  disabled={checkedItems.all}
               /> 
               <label htmlFor="" className="FirstCartPgae---labelContent-F">Nike</label> 
               <label htmlFor="" >120</label>  
               </span>
               <span className="FirstCartPgae---checkBoxContainer-B">
               <input 
                 type="checkbox"
                 id="childrenShoes"
                 name="size-B"
                //  checked={checkedItems.childrenShoes}
                //  onChange={handleCheckboxChange}
                //  disabled={checkedItems.all}
               /> 
               <label htmlFor="" className="FirstCartPgae---labelContent-F">Puma</label> 
               <label htmlFor="" >03</label>  
               </span>

               <span className="FirstCartPgae---checkBoxContainer-B">
               <input 
                 type="checkbox"
                 id="childrenShoes"
                 name="size-C"
                //  checked={checkedItems.childrenShoes}
                //  onChange={handleCheckboxChange}
                //  disabled={checkedItems.all}
               /> 
               <label htmlFor="" className="FirstCartPgae---labelContent-G">K-swiss</label> 
               <label htmlFor="" >01</label>  
               </span>

               <span className="FirstCartPgae---checkBoxContainer-B">
               <input 
                 type="checkbox"
                 id="childrenShoes"
                 name="size-D"
                //  checked={checkedItems.childrenShoes}
                //  onChange={handleCheckboxChange}
                //  disabled={checkedItems.all}
               /> 
               <label htmlFor="" className="FirstCartPgae---labelContent-H">Encap</label> 
               <label htmlFor="" >01</label>  
               </span>
              </div>

               
             
            </div>

            <div>


              <div className="FirstCarPge---ProductDisplay">
                {productDisplayElement}
                {/* <Navigation data={productDisplayElement}/> */}
                {/* <RouterProvider router={router}/> */}
              </div>

              
         

            </div>



            


         </div>
         <div className="Pagination--mainHolder">
         <ReactPaginate 
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"Navigation---container"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBtn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}


            pageRangeDisplayed={isMobile ? 1 : 1}  // Adjust the center range
          marginPagesDisplayed={isMobile ? 1 : 1}
         
         />
         </div>
         {/* <NavigationPanel /> */}
         {/* <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi, alias.</p> */}
       </div>
      </>
    )
  }
  
  export default FirstCartPage
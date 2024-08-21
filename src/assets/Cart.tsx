import "./component styles/cart.css"
import { HiOutlineTrash } from "react-icons/hi";

import { MdKeyboardArrowLeft } from "react-icons/md";
// import image from "../images/nike-sneakers-11.png";
import informationDiamond from "../images/information-diamond.png"
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
// import { useState, useEffect } from "react";
// import { useCart } from "react-use-cart";
import {ShoppingContext} from "./ShopContext";
import { FaCartPlus as EmptyCart } from "react-icons/fa";



function Cart() {

const GlobalState = useContext(ShoppingContext);

if (!GlobalState) {
  return <div>Error: Shopping context not available</div>; 
}
 
const state = GlobalState.state;


        //  const state = globalVersion.state;
         const dispatch = GlobalState.dispatch;
 const [openModal, setOpenModal] = useState<number | null>(null);

        //  const initialState = JSON.parse(localStorage.getItem('cart') || '[]');
// const dispatch = GlobalState.dispatch;
// const productName = state.reduce((product: string, item: any) =>  item.productName, product);

const totalPrice = state.reduce((acc: number, item: any) => {
  // Convert item.newPrice from string to number, removing the currency symbol and commas
  const priceNumber = parseFloat(item.newPrice.replace(/[^0-9.-]+/g, ""));
  // return acc + priceNumber;
  return acc + priceNumber * (item.quantity || 1);
}, 0);
 

 


  const grandTotalPrice = totalPrice - 5000;

  const formattedTotalPrice = grandTotalPrice.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

    const cartTotal =  totalPrice.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });

    const handleQuantityChange = (id: number, quantity: number) => {
      localStorage.setItem(id.toString(), quantity.toString());
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id, quantity },
      });
    };

    const handleSize = (id: any, size: any) => {
      localStorage.setItem(`size_${id}`, size);

      dispatch({
        type: "UPDATE_SIZE",
        payload: { id, size },
      });
    };

         
          

  return (
    <>
     <div className="Cart--container">
       <NavLink to="/shop"><div className="Cart---C-shopping">
        <MdKeyboardArrowLeft className="cart--left-shopping"/> 
        <h4>Continue shopping</h4>
        </div>  </NavLink> 

        <div className="Cart--heading">  <h3>My Carts </h3> <span>({state.length} items)</span></div>


        <div className="Cart--Basket-Container">
        {/* <div className="Cart--BasketItem--Container"> */}
        {/* {items.map((item) => (
          <div>
            <div className="Cart--image--container" key={item.id}>
              <img src={item.image} alt={item.name} />
            </div>
            <div className="Cart--Info">
              <h4>{item.name}</h4>
              <p className="Cart--Edition">{item.description}</p>
              <div className="cart--sizeQuantity">
                <span>
                  Size:
                  <select
                    value={item.size}
                    onChange={(e) => updateItemQuantity(item.id, item.quantity)}
                    className="Cart--size"
                  >
                    <option value="20-30L">20-30L</option>
                    <option value="30-40L">30-40L</option>
                    <option value="40-50L">40-50L</option>
                  </select>
                </span>
                <span className="Cart--quantityContainer">
                  Quantity:
                  <select
                    value={item.quantity}
                    onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value))}
                    className="Cart--quantity"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </span>
              </div>
            </div>
            <div className="cart--amount">
              <span>
                <p>${ item.id * item.price }</p>
                <HiOutlineTrash
                  className="cart--DeleteBTN"
                  onClick={() => removeItem(item.id)}
                />
              </span>
            </div>
            </div>
        ))}
             </div>   */}
             <div className={state.length === 0 ? "cart--productLength":"cart--product" }>
             {state.length === 0 ? (
             
            <div className="cart--EmptyCart">
              <div className="Emptycart---Image">
               <EmptyCart size={30}/>
              </div>
            
              <h3 className="emptyCart--paragrap">Your cart is empty!</h3>
              <p>Browse our categories and discover our best deals!</p>

              <div>
                 <NavLink to="/shop"> 
                 <button type="button" className="EmptyCart---startShopping">
                  Start Shopping</button></NavLink> 
                  </div>
              </div>
             
          ) : ( state.map((item:any,  index:number) => {
            const savedSize = localStorage.getItem(`size_${item.id}`) || "20-30L";
            const savedQuantity = localStorage.getItem(item.id.toString()) || 1;
            
            return( 

                  
               <div className="Cart--BasketItems" key={index}>
                   

                  <div className="Cart--BasketItem--Container">
                  <div className="Cart--image--container">
                  <img src={item.Image} alt="" />
                  </div>
                    
                   <div className="Cart--Info">
                   <h4>{item.productName}</h4>
                   <p className="Cart--Edition">Black lasted edition</p>
                   <div className="cart--sizeQuantity">
                    <span > Size: 
                      <select name="" id="" className="Cart--size"
                      value={savedSize}
                        onChange={(e) =>
                          handleSize(
                            item.id,
                            e.target.value
                          )
                        }
                      >
                        <option value="20-30L" >20-30L</option>
                        <option value="30-40L" >30-40L</option>
                        <option value="40-50L" >40-50L</option>
                      </select>
                      </span> <span className="Cart--quantityContainer">Quantity: 
                      <select name="" className="Cart--quantity"
                        value={savedQuantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              parseInt(e.target.value)
                            )
                          }
                      >
                        {[...Array(10).keys()].map(n => (
                         
                        <option key={n + 1} value={n + 1}>{ n + 1 }</option>
                
                      ))}
                        {/* <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option> */}
                      </select>
                      </span>
                      </div>
                   </div>
                  </div> 
              


                  <div className="cart--amount">
                      <span>
                        <p>
                          {item.newPrice}
                     {/* {(parseFloat(item.newPrice.replace(/[^0-9.-]+/g, "")) *
                      (item.quantity || 1)).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                    })} */}
                        </p>
                        <HiOutlineTrash size={25} 
                        className="cart--DeleteBTN" 
                        onClick={() => setOpenModal(item.id)}
                         />
                      </span>
                    </div>

                    <div className={openModal === item.id ? "DeleteOption" : "DeleteOptionClose" }
                    onClick={() => setOpenModal(null)}>

                      <div className="Overlay">
                        <div className="DeleteOption--Info">
                           <h3>Remove from Cart</h3>
                           <p>Do you really want to remove this item from cart?</p>
                           <div>
                           <div>
                     <button type="button" className="Cart---SaveItem" onClick={() => setOpenModal(null)} >No</button> 
                     <button type="button" className="cart--DeleteOption"
                     onClick={()=> {
                        dispatch({ type: "REMOVE", payload: { id: openModal } });
                        setOpenModal(null); 
                      }}
                      
                      // ()=>confirmDelete}
                    //  onClick={()=> dispatch({ type: "REMOVE", payload: {id: item.id } })}
                     >Delete</button> 
                       </div>
                           </div>
                        </div>
                         
                      </div>
                    </div>
               </div>
              
  
 )}) 
)}
 {/* }  */}


                   {/* <div>
        <button onClick={() => emptyCart()} className="Cart--emptyCart">Empty Cart</button>
      </div> */}
                   </div>

                   {/* //----- */}

                 
               
                    
                    {state.length === 0 ? (""): (


                   
                    <div>
                 <div className="Cart--Order--container">
                  <div className="cart--secondContainer">
                    <div className="Cart--order">
                      <h4>Order Summary</h4>
                    </div>
                    <div className="cart--promo">
                      <p>Apply Promo Code</p>
                      <input type="text" placeholder="Enter The Promo code" />
                    </div>
                    <div className="cart--balanceContainer">
                      <span className="Cart---balanceBreakdown">
                        <h5>Cart Total</h5>
                        <p>{cartTotal}</p>
                      </span>
                      <span className="Cart---balanceBreakdown">
                        <h5>Discount</h5>
                        <p>$5,000</p>
                      </span>
                      <span className="Cart---balanceBreakdown">
                        <h5>Delivery fee</h5>
                        <p>$0000</p>
                      </span>
                      <span className="Cart---balanceBreakdown Cart-Total">
                        <h5>Total</h5>
                        <p>{formattedTotalPrice}</p>
                      </span>


                    </div>
                    <div>
                 <NavLink to="/CheckOutPage"> <button type="button" className="cart--checkout">Checkout</button></NavLink> 
                    </div>
                  <div>
                 <NavLink to="/shop"> <button type="button" className="Cart---continueShopping">Continue Shopping</button></NavLink> 
                  </div>
                   

                  

                    </div>

                   

                 </div>

                 <div className="Cart---DeliveryFee">
                  <p>   <img src={informationDiamond} alt="" /> Delivery fees is calculated at checkout</p>
                  </div>
                 </div>
 )}

        </div>
             
           

     </div>
    </>
  )
}

export default Cart
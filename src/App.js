import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import { useState } from "react";
import BakeryData from "./assets/bakery-data.json";
import BakeryItem from "./components/BakeryItem";
// 

const typeOptions = ["Pastry", "Bread", "Cake"]
const dietaryRestrictions = ["Nut-free", "Gluten-free"]



function App() {
  const [cartItems, setCartItems] = useState([]);
  const [filters, setFilters] = useState([])
  const [sort, setSort] = useState()

  function addToCart(item) {
    setCartItems([...cartItems, item])
  }

  function removeFromCart(name) {
    setCartItems(cartItems.filter(item => item.name !== name))
  }

  function calculateTotal(){
    let total = 0
    for(let i = 0; i<cartItems.length; i++){
      total+=cartItems[i].price
    }
    return total.toFixed(2);
  }

  let displayedItems = [...BakeryData]
  filters.forEach(filter => displayedItems = displayedItems.filter((item) => {
    if (typeOptions.includes(filter)) {
      return item.type === filter
    } else if (dietaryRestrictions.includes(filter)) {
      return item["dietary"] === filter
    }
    }
  ))

  if (sort && sort === "cheapestLast") {
    displayedItems.sort((a, b) => (b.price -a.price ));
  } else if (sort === "cheapestFirst") {
    displayedItems.sort((a, b) => Number(a.price) - Number(b.price));
  }

  const handleFilterChange = (filter) => {
    if (filters.includes(filter)) {
      setFilters(filters.filter((fltr) => fltr !== filter))
    } else {
      setFilters([...filters, filter])
    }
  }


  return (
  <div className = "App">
      
      <div className='header'>
        
         <div className='sortby'>
              <h3>Sort Cheapest First:</h3>  
              <div className='checkbox'><input type="checkbox" className='sort' onChange ={() => { setSort("cheapestFirst") }}/></div>  
              {/* <div className='column'><input type="checkbox" className='sort' onChange ={() => { setSort("cheapestLast") }}/>Cheapest Last!</div>   */}
          </div>

         <div className='types'>
            <h3>Type:</h3> 
              <div className='checkbox'><input type="checkbox" className='pastry' onChange ={() => {handleFilterChange("Pastry")}}/>Pastry</div>  
              <div className='checkbox'><input type="checkbox" className='bread' onChange ={() => { handleFilterChange("Bread") }}/>Bread</div>  
              <div className='checkbox'><input type="checkbox" className='cake' onChange ={() => { handleFilterChange("Cake") }}/>Cake</div>  
          </div>

          <div className='dietary-restriction'>
             <h3>Dietary Restriction:</h3> 
              <div className='checkbox'><input type="checkbox" className='nut-free' onChange ={() => { handleFilterChange("Nut-free") }}/>Nut-free!</div>  
              <div className='checkbox'><input type="checkbox" className='gluten-free' onChange ={() => { handleFilterChange("Gluten-free") }}/>Gluten-free!</div>  
          </div>
      
          <div className='btn-group'>
              <div className='column'> <button className='all'    onClick={() => { setFilters([]); setSort(undefined) }}> Reset All! </button></div>
              {/* <div className='column'><input type="checkbox" className='all' onChange ={() => { setFilters([]); setSort(undefined) }}/>All!</div>    */}
          </div>

        
          <div className="cart">  {/* main cart */} 
                <h2> Shopping Cart </h2>
                <hr className='hr'></hr>
                <ul>
                  {cartItems.map((item, index) => (  
                 <li class ="cart_list">
                  <div className='list-items'>{item.name} </div>
                  <div><button  onClick = {() => {removeFromCart(item.name)}}> &times;</button></div> 
                  </li>
                  ))}
                </ul>

                <h1 className = "Total">Total:{calculateTotal()}</h1>
                
          </div>

        </div>
    

            <div className="bakery-card">
                  {displayedItems.map((item, index) => (
                  <div><BakeryItem item = {item} addToCart = {addToCart} /></div>
                  ))}
            </div>

  
  </div>
  );
}
  
export default App;


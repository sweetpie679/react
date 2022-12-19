// TODO: create a component that displays a single bakery item

function BakeryItem(props){
    return(
       
        <div className="BakeryItem">
            <img src= {props.item.image} />
            <div className="details">
                <h3 className="category"> {props.item.type}</h3>
                <h4 className="dietary">Dietary restrictions:{props.item.dietary}</h4>
                <h3>{props.item.name}</h3>
                <p className>{props.item.description}</p>
                <div class="price">${props.item.price}</div>
                </div>
              <div className="priceButton">
                 <div><button class="button" onClick={() => {props.addToCart(props.item)}}>Add to Cart</button></div>
              </div>

        </div> 
       
    );
}

export default BakeryItem;
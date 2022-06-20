let decreaseCartItemButtons = document.getElementsByClassName("decrease");
let increaseCartItemButtons = document.getElementsByClassName("increase");
let totalItemsInCart = decreaseCartItemButtons.length;
// let quantity = document.getElementsByClassName("quantity");
let cartRows = document.getElementsByClassName("cart-rows");

for(let i=0; i<cartRows.length; i++){
        //update cart item quantities
        // console.log("here");
        let cartRows = document.getElementsByClassName("cart-rows");
        let cartRow = cartRows[i];
        let button = cartRow.getElementsByClassName("decrease")[0];
        button.addEventListener("click", decreaseCartItem);
        button = cartRow.getElementsByClassName("increase")[0];
        button.addEventListener("click", increaseCartItem);
}

function decreaseCartItem(event){
        let buttonClicked  = event.target;
        let buttonEL = buttonClicked.parentElement.parentElement.getElementsByClassName("quantity");
        buttonEL[0].innerText = parseInt(buttonEL[0].innerText) -1;
        // buttonEL[1].innerHTML = parseInt(buttonEL[0].innerText) -1;
        updateCartTotal();
}

function increaseCartItem(event){
        let buttonClicked  = event.target;
        let buttonEL = buttonClicked.parentElement.parentElement.getElementsByClassName("quantity");
        buttonEL[0].innerHTML = parseInt(buttonEL[0].innerText) +1;
        // buttonEL[1].innerHTML = parseInt(buttonEL[0].innerText) +1;
        updateCartTotal();
}

let addToCartButtons = document.getElementsByClassName("add");
for(let i=0; i<addToCartButtons.length; i++){
        let buttons = addToCartButtons[i];
        buttons.addEventListener("click", function(event){
                let button = event.target;
                let menuItem = button.parentElement.parentElement;
                let title = menuItem.getElementsByClassName("menu-item")[0].innerHTML;
                let price = menuItem.getElementsByClassName("price")[0].innerHTML;
                let imageSrc = menuItem.querySelectorAll(".plate img")[0].src;
                addItemToCart(title, price, imageSrc);

                let inCartButtonContents = `
                         <button class="in-cart">
                                <img src="images/check.svg" alt="Check" />
                                In Cart
                        </button>`;
                let inCartButton = document.createElement("in-cart");
                inCartButton.innerHTML = inCartButtonContents;
                buttons.parentNode.replaceChild(inCartButton, buttons);
        })
}

function addItemToCart(title, price, imageSrc){
        let cartRow = document.createElement("li");
        let cartItems = document.getElementsByClassName("cart-summary")[0];
        let cartItemsName = document.getElementsByClassName("menu-item");
        let cartRowContents = `
               <div class="plate">
                        <img src="${imageSrc}" alt="Fish Sticks and Fries" class="plate" />
                        <div class="quantity">1</div>
                </div>
                <div class="content">
                        <p class="menu-item">${title}</p>
                        <p class="price">${price}</p>
                </div>
                <div class="quantity__wrapper">
                        <button class="decrease">
                        <img src="images/chevron.svg" />
                        </button>
                        <div class="quantity">1</div>
                        <button class="increase">
                        <img src="images/chevron.svg" />
                        </button>
                </div>
                <div class="subtotal">
                        ${price}
                </div>`;
        cartRow.innerHTML = cartRowContents;
        cartItems.append(cartRow);
        cartRow.getElementsByClassName()
        cartRow.getElementsByClassName("decrease")[0].addEventListener("click", decreaseCartItem);
        cartRow.getElementsByClassName("increase")[0].addEventListener("click", increaseCartItem);
}

function updateCartTotal(){
        let cartRows = document.getElementsByClassName("cart-rows");
        let subtotal = 0;
        for(let i=0; i<cartRows.length; i++){
               let cartRow = cartRows[i];
               let quantity = cartRow.getElementsByClassName("quantity")[0].innerHTML;
               if(quantity == "0"){
                cartRow.remove();
                continue;
               }
               let priceEL = cartRow.getElementsByClassName("price")[0];
               let price = parseFloat(priceEL.innerText.replace("$", ""));
               subtotal += price * quantity;
               let itemSubtotalELement = cartRow.getElementsByClassName("subtotal")[0];
               itemSubtotalELement.innerHTML = "$" + subtotal.toFixed(2);
        }
        subtotal = subtotal.toFixed(2);
        document.getElementsByClassName("amount price subtotal")[0].innerHTML = "$" + subtotal;
        let tax = (0.0975 * subtotal).toFixed(2);
        document.getElementsByClassName("amount price tax")[0].innerHTML = "$" + tax;
        let total = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);
        document.getElementsByClassName("amount price total")[0].innerHTML = "$" + total;
}
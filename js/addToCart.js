let carts = document.querySelectorAll(".add-cart");


let products = [
    {
        name: "Chocolate-Jelly Cake",
        tag: "pexels-abhinav-goswami-291528.jpg",
        price: 269.00,
        inCart: 0
    },
    {
        name: "Coffe-Cream Cake",
        tag: "cake3.jpeg",
        price: 399.00,
        inCart: 0
    },
    {
        name: "Chocolate Cake",
        tag: "pexels-alexander-dummer-132694 Small.png",
        price: 359.00,
        inCart: 0
    },
    {
        name: "White-Forest Cake",
        tag: "pexels-archie-binamira-1027811.jpg",
        price: 449.00,
        inCart: 0
    },
    {
        name: "Strawberry-Coffee Cake",
        tag: "pexels-matheus-guimarães-1291712.jpg",
        price: 599.00,
        inCart: 0
    },
    {
        name: "Raspberry-Chocolate Cake",
        tag: "cake2.jpeg",
        price: 499.00,
        inCart: 0
    },
    {
        name: "Raspberry-Cherry Cake",
        tag: "pexels-suzy-hazelwood-1126359.jpg",
        price: 379.00,
        inCart: 0
    },
    {
        name: "Coffee-Cream Cake",
        tag: "cake3.jpeg",
        price: 349.00,
        inCart: 0
    },
    {
        name: "Vanilla Cupcake",
        tag: "pexels-vojtech-okenka-1055272.jpg ",
        price: 149.00,
        inCart: 0
    },
    {
        name: "Chocolate-Jelly Cake",
        tag: "pexels-abhinav-goswami-291528.jpg",
        price: 379.00,
        inCart: 0
    },

]

for(let i=0; i < carts.length; i++)
{
    carts[i].addEventListener("click", ()=>{
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function  onLoadCartNumbers(){
    let productNumbers = localStorage.getItem("cartNumbers");

    if(productNumbers){
        document.querySelector(".cart span").textContent = productNumbers;
    }
}

function cartNumbers(product){

    let productNumbers = localStorage.getItem("cartNumbers");
    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector(".cart span").textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector(".cart span").textContent = 1;
    }

    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    // console.log("My cart is ", cartItems);
    
    if(cartItems != null) {

        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag] : product 
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }


    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product){
    // console.log("The products price is, ", product.price);

    let cartCost = localStorage.getItem("totalCost");
    
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost",product.price);
    }
}

function displayCart(){

    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    // console.log(cartItems);
    let productContainer = document.querySelector(".products");
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <img src="/images/${item.tag}" alt="${item.name}">
                <span>${item.name}</span>
            
            </div>
            <div class="price">₹${item.price}.00</div>
            <div class="quantity">
                <span>${item.inCart}</span>
            </div>
            <div class="total">
                ₹${item.inCart * item.price}.00
            </div>

            `
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total:
                </h4>
                <h4 class="basketTotal">
                    ₹${cartCost}.00
                </h4>
        `
    }
}

displayCart();
onLoadCartNumbers();
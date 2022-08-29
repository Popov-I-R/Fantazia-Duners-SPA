let homePage = document.getElementById("homePage")
let cartPage = document.getElementById("cartPage")
let deliveryPage = document.getElementById("deliveryPage")

let homeResults = document.getElementById("results")
let counterHeader = document.getElementById('countProducts')


let emptyCard = document.getElementsByClassName("empty-cart")
let totalProducts = 0

function showCounter() {
    onHashChange()
    let products = totalProducts
    user.cart.forEach(e => products+= e.quantity)
    counterHeader.innerHTML = products
    if (products == 0) {
        counterHeader.classList.remove("test-showed")
        counterHeader.classList.add("test-hidden")
        onHashChange()
    } else {
        counterHeader.innerHTML = products
    
        counterHeader.classList.remove("test-hidden")
        counterHeader.classList.add("test-showed")
        onHashChange()
    }


}



let user = new User();
let manager = new MainManager() 

for (let i = 0; i < data.length; i++) {
    let obj = data[i] 
    let duner = new Duner(
        obj.image,
        obj.name,
        obj.weight,
        obj.category,
        obj.price,
    )
    manager.add(duner) 
}


let onHashChange = function () {
    let hash = location.hash.slice(1)

    switch (hash) {
        case "homePage":
            homePage.style.display= "block";
            cartPage.style.display= "none";
            deliveryPage.style.display= "none"
            
            //    printOnScreen(manager.matches, homeResults)
            break;
        case "cartPage":
                homePage.style.display= "none";
                cartPage.style.display= "block";
                deliveryPage.style.display= "none";
                if (user.cart.length > 0) {
                    printCartPage(user.cart, cartPage)
          } else {
            printCartPage(user.cart, cartPage)
          }
            break;
        case "deliveryPage":
                homePage.style.display= "none";
                cartPage.style.display= "none";
                deliveryPage.style.display= "block";
            break;
        
        default:
                homePage.style.display= "block";
                cartPage.style.display= "none";
                deliveryPage.style.display= "none"
            break;
    }
}

window.addEventListener("hashchange", onHashChange)
window.addEventListener("load", onHashChange)


// HOMEPAGE 
function printHomePage (allDuners,container) {
    container.innerHTML = ""
    for (let i = 0; i < allDuners.length; i++) { 
        let duner = allDuners[i] 
         //Създай див
         let div = document.createElement("div");
         div.classList.add("card")
         //Създай img 
         let img = document.createElement("img");
         img.src = duner.image
         img.alt = `product image ${i}`
         img.classList.add("images")
         img.setAttribute("id", "productsHome")

         //създай ИМЕ
        let productDescription = document.createElement("div")
        productDescription.classList.add("product-description")

         let productName = document.createElement("h3");
         productName.innerHTML = duner.name
         productName.classList.add("productName")
         // за тегло
         let productWeight = document.createElement("h3");
         productWeight.innerHTML = `Тегло: ${duner.weight} гр.`
         productWeight.classList.add("productWeight")
         // категория 
         let productCategory = document.createElement("h3");
         productCategory.innerHTML = ` Категория: ${duner.category}` 
         productCategory.classList.add("productCategory")
        // Цена 
         let productPrice = document.createElement("h5");
         productPrice.innerHTML = ` Цена: ${duner.price.toFixed(2)}`
         productPrice.classList.add("productPrice")      
         productDescription.append(productName,productWeight,productCategory,productPrice)


        let cardInputAndButton = document.createElement("div")
        cardInputAndButton.classList.add("card-input-and-Button")
                // input меню за вкарване на продукти в брой 
         let quantityInput = document.createElement("input")
         quantityInput.classList.add("card-field")
        //  quantityInput.setAttribute("id", "quantityInput")
        quantityInput.setAttribute("required", "")
        quantityInput.setAttribute("type", "number")
        quantityInput.setAttribute("min", "1")
        quantityInput.setAttribute("minlength", "1")
        
        quantityInput.setAttribute("value", "1")

        //За бутона add to cart 
         let addToCartButton = document.createElement("button");
         addToCartButton.classList.add("addToCartButton");
         addToCartButton.classList.add("card-field");
         addToCartButton.innerText = "Add to cart ";

        addToCartButton.addEventListener("click", function () {
           
            let preferedQuantity = +quantityInput.value 
            if (preferedQuantity !== 0 && preferedQuantity !== undefined && preferedQuantity !== NaN && preferedQuantity !== null) {
                quantityInput.value = 1
            
                user.addToCart(duner, preferedQuantity);
                  showCounter()
                    onHashChange();
            } else {
                console.log(`error`);
            }


              // Провери value-то в инпут полето и подай тази бройка на addToCart 
              
        });


            cardInputAndButton.append(quantityInput, addToCartButton);

            div.append(img, productDescription, cardInputAndButton);
            container.append(div);   
          
    }

}
printHomePage(manager.allDuners,homeResults)

// CART PAGE 


let addedProducts = document.getElementById("added-products")

function printOrderHistory(orders, container) {
    let orderHistory = document.createElement("div")
    orderHistory.classList.add("order-history")

    let orderHistoryTitle = document.createElement("h1")
    orderHistoryTitle.innerText = "История на поръчките"
    orderHistory.appendChild(orderHistoryTitle)

    let table = document.createElement("table");
    let tableRow = document.createElement("tr");

    let thDate = document.createElement("th");
    thDate.innerText = `Дата`;

    let thAddress = document.createElement("th");
    thAddress.innerText = `Адрес`;

    let thProducts = document.createElement("th");
    thProducts.innerText = `Продукти`;

    let thProductsFinalPrice = document.createElement("th");
    thProductsFinalPrice.innerText = `Крайна цена`;

    tableRow.append(thDate,thAddress,thProducts,thProductsFinalPrice)
    table.appendChild(tableRow)
    container.append(orderHistory,table)


    if (orders.length > 0) {

        for (let i = 0; i < orders.length; i++) {
            let order = orders[i]


            let tableRow = document.createElement("tr");
    
            let dateContainer = document.createElement("td");
            dateContainer.innerText = order.date

            let addressContainer = document.createElement("td")
            addressContainer.innerText = order.address

            let productsContainer = document.createElement("td")
            productsContainer.innerText = `${order.productsNameAndCount}`

            let totalPriceContainer = document.createElement("td")
            totalPriceContainer.innerText = order.totalPrice

            tableRow.append(dateContainer,addressContainer,productsContainer,totalPriceContainer)
            table.appendChild(tableRow)
        }
    }









    }
function printCartPage(producs,container) {

    if (user.cart.length < 1) {
        totalProducts = 0
        
        container. innerHTML = ""
        
        let emptyCart = document.createElement("div")
        emptyCart.classList.add("empty-cart")

        let noProducts = document.createElement("h1")
        noProducts.innerText = "Нямате добавени продукти в количката"
        emptyCart.appendChild(noProducts)



         // tezi neshta shte gi vkaram vuv funkciq sledvashtite 

        container.append(emptyCart)



        printOrderHistory(user.orders,container)
    } else {
        container.innerHTML = ""
        let table = document.createElement("table");
        let tableRow = document.createElement("tr");
    
        let thProductName = document.createElement("th");
        thProductName.innerText = `Име на продукт`;
    
        let thProductPrice = document.createElement("th");
        thProductPrice.innerText = `Единична цена`;
    
        let thProductWeight = document.createElement("th");
        thProductWeight.innerText = `Количество`;
    
        let thProductFinalPrice = document.createElement("th");
        thProductFinalPrice.innerText = `Крайна цена`;
    
        let thDeleteProduct = document.createElement("th");
        thDeleteProduct.innerText = `Премахни продукт`;
    
        tableRow.append(thProductName,thProductPrice,thProductWeight,thProductFinalPrice,thDeleteProduct)
        table.appendChild(tableRow)
        container.append(table)

        let sum = 0
        
        for (let i = 0; i < user.cart.length; i++) {
            
    
            let product = user.cart[i]
            
    
            let tr = document.createElement("tr")        
    
            let productName = document.createElement("td")
            productName.innerText = `${i+1}. ${product.name}`
    
            let productPrice = document.createElement("td")
            productPrice.innerText = `${product.price.toFixed(2)} лв.`
    
            let quantity = document.createElement("td")
            let quantityInput = document.createElement("input")
            quantityInput.setAttribute("type", "number")
            quantityInput.setAttribute("min", "1")
            quantityInput.value = product.quantity
            quantity.appendChild(quantityInput)

             
    
            let productPriceTotal = document.createElement("td")
            let productTotal = Number(product.price * product.quantity)
            product.totalPrice = productTotal
            productPriceTotal.innerText = `${productTotal.toFixed(2)} лв.`
            
            sum+= productTotal
    
            let deleteContainer = document.createElement("td")
            let deleteProductButton = document.createElement("button")
            deleteProductButton.classList.add("deleteProductButton")
            deleteProductButton.innerText = `Премахни`
            deleteContainer.appendChild(deleteProductButton)
    
    
            tr.append(productName,productPrice,quantity,productPriceTotal,deleteContainer)
            table.append(tr)
            
           
            
    
            quantityInput.addEventListener("input", function(event){
                
                product.quantity = +event.target.value
                productPriceTotal.innerText = `${Number(event.target.value * product.price).toFixed(2)} лв.`
                
            })
    
            deleteProductButton.addEventListener("click",function () {
                
                user.removeFromCart(product)
                onHashChange()
                showCounter()
            })

            
            
           
        }
        
        printTotalPriceAndSubmitButton()

        printOrderHistory(user.orders,container)

        
        function printTotalPriceAndSubmitButton(){
            let totalPriceAndSubmit = document.createElement("div")
            totalPriceAndSubmit.classList.add("total-and-submit-container")
        
            let totalPriceContainer = document.createElement("div")
            let totalPrice = document.createElement("h2")
            totalPrice.innerText = `Крайна цена: ${sum}`
            totalPriceContainer.appendChild(totalPrice)
        
        
        
            let submitButtonContainer = document.createElement("div")
        
            let linkSubmit = document.createElement("a")
            linkSubmit.setAttribute("href",`#deliveryPage`)
            
        
            let submitButton = document.createElement("button")
            submitButton.setAttribute("type","submit")
            submitButton.innerText = `Направи поръчка`
           linkSubmit.append(submitButton)
            submitButtonContainer.appendChild(linkSubmit)
        
            totalPriceAndSubmit.append(totalPriceContainer,submitButtonContainer)
        
            container.appendChild(totalPriceAndSubmit)
        
            table.addEventListener("input", function(){
                showCounter()
                totalPrice.innerText = sum 
                onHashChange()
            })
        }


    }
}




let form = document.getElementById("form-delivery")
form.addEventListener("submit", function(e) {
    e.preventDefault()

    let date = new Date().toLocaleDateString()
    let name = e.name;
    let phone = e.phone;
    let address = document.getElementById("address").value
    let productsNameAndCount = []
    let totalOrderPrice = 0
    
    user.cart.forEach(e => totalOrderPrice += e.totalPrice)
    user.cart.forEach(e => productsNameAndCount.push(`${e.name} - ${e.quantity} бр.`))

    user.makeOrder(date,name,phone,address,productsNameAndCount,totalOrderPrice)
    console.log(user.orders);

    user.cart = []
})


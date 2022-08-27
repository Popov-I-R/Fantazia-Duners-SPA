let homePage = document.getElementById("homePage")
let cartPage = document.getElementById("cartPage")
let deliveryPage = document.getElementById("deliveryPage")

let homeResults = document.getElementById("results")

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
                printCartPage(user.cart, cartPage)
        
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
         img.alt = `img${i}`
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
        quantityInput.setAttribute("type", "number")
        

        //  quantityInput.addEventListener("input",updateValue)
         
        // function updateValue() {
            
        //     match.quantity = +quantityInput.value
        //     onHashChange()
        //     console.log(match.quantity);
        // }

        //За бутона add to cart 
         let addToCartButton = document.createElement("button");
         addToCartButton.classList.add("addToCartButton");
         addToCartButton.classList.add("card-field");
         addToCartButton.innerText = "Add to cart ";

        addToCartButton.addEventListener("click", function () {
          user.addToCart(duner);
              onHashChange();
        });
            // addToCartButton.addEventListener("click", updateTwo);

            // function updateTwo() {
            //   user.addToCart(match);
            //   onHashChange();
            //   match.quantity = match.quantity + 1;
            //   console.log(match.quantity);
            // }

            cardInputAndButton.append(quantityInput, addToCartButton);

            div.append(img, productDescription, cardInputAndButton);
            container.append(div);   
    }

}


printHomePage(manager.allDuners,homeResults)

// CART PAGE 


let addedProducts = document.getElementById("added-products")

function printCartPage(producs,container) {
    container.innerHTML = ""
    
    let table = document.createElement("table");
    let tableRow = document.createElement("tr");

    let thProductName = document.createElement("th");
    thProductName.innerText = `Име на продукт`;

    let thProductPrice = document.createElement("th");
    thProductPrice.innerText = `Цена`;

    let thProductWeight = document.createElement("th");
    thProductWeight.innerText = `Количество`;

    let thProductFinalPrice = document.createElement("th");
    thProductFinalPrice.innerText = `Крайна цена`;

    tableRow.append(thProductName,thProductPrice,thProductWeight,thProductFinalPrice)
    table.appendChild(tableRow)
    container.append(table)

    for (let i = 0; i < user.cart.length; i++) {
        
        let product = user.cart[i]
        

        let tr = document.createElement("tr")        

        let productName = document.createElement("td")
        productName.innerText = product.name

        let productPrice = document.createElement("td")
        productPrice.innerText = `Цена : ${product.price}`

        let quantity = document.createElement("td")
        let quantityInput = document.createElement("input")
        quantityInput.setAttribute("type", "number")
        quantityInput.value = product.quantity
        quantity.appendChild(quantityInput)

        let productPriceTotal = document.createElement("td")
        productPriceTotal.innerText = `Тотал: ${product.price * product.quantity}`

        tr.append(productName,productPrice,quantity,productPriceTotal)
        table.append(tr)
        
        
    }
   

}
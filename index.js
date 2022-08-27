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
        obj.quantity
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
            //    printCart(cart, likedPage)
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

function printHomePage (allDuners,container) {
    container.innerHTML = ""
    for (let i = 0; i < allDuners.length; i++) { // За да направи едно и също за всеки обект 
        let duner = allDuners[i] //---за да не пиша всеки път matches[i] по-надолу
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
         let h3name = document.createElement("h3");
         h3name.innerHTML = duner.name
         // създай weight 
         let h3weight = document.createElement("h3");
         h3weight.innerHTML = `Тегло: ${duner.weight}`
         // create category
         let h3category = document.createElement("h3");
         h3category.innerHTML = ` Категория: ${duner.category}` 
         //create price  
         let h5price = document.createElement("h5");
         h5price.innerHTML = ` Цена: ${duner.price}`         


         //create input for num 
        //  let quantityInput = document.createElement("input")
        //  quantityInput.setAttribute("id", "quantityInput")
        //  quantityInput.setAttribute("type", "number")
        //  quantityInput.value = match.quantity
        

        //  quantityInput.addEventListener("input",updateValue)
         
        // function updateValue() {
            
        //     match.quantity = +quantityInput.value
        //     onHashChange()
        //     console.log(match.quantity);
        // }

        //За бутона add to cart 
         let addToCart = document.createElement("button")
            addToCart.innerText = "Add to cart "
            addToCart.addEventListener("click", function () {
     
               user.addToCart(duner) 
               onHashChange()
            })
            addToCart.addEventListener("click", updateTwo)

            function updateTwo() {
                user.addToCart(match) 
                onHashChange()
                match.quantity = match.quantity + 1
                console.log(match.quantity);
            }
         



         div.append(img,h3name,h3weight,h3category,h5price,addToCart)
         container.append(div) 
         

        
    }

}

printHomePage(manager.allDuners,homeResults)
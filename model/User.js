class User {

    constructor() {
        this.name = ""
        this.phone = ""
        this.address = ""

        this.cartCounter = 0
        this.cart = [] 
        this.purchased = [] // Евентуално ще ползвам това за вече направените поръчки
      

    }



        addToCart(product, quantity) { 
        let getIndex = this.cart.indexOf(product)

        if (getIndex === -1) {
           product.quantity = +quantity
            if (this.cart.indexOf(product) === -1) {
                this.cart.push(product) 
            }
        } else {
            product.quantity+= +quantity
        }
    }



    // addToCart(product) { 
    //     if (product.quantity == undefined) {
    //         product.quantity = 1
    //         if (this.cart.indexOf(product) === -1) {
    //             this.cart.push(product) 
    //         }
    //     } else {
    //         product.quantity++
    //     }
    // }
    removeFromCart(product) {
        let getIndex = this.cart.indexOf(product)
        this.cart.splice(getIndex,1)
    }



}
class User {

    constructor() {
        this.name = "Dakata"
        this.phone = "0895 269 760"
        this.address = "Красна Поляна 2"

        this.cart = [] 
        this.orders = [] // Евентуално ще ползвам това за вече направените поръчки
      

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

    removeFromCart(product) {
        let getIndex = this.cart.indexOf(product)
        this.cart.splice(getIndex,1)
    }

    makeOrder(date, name,phone,address, productsNameAndCount,totalPrice){
        let order = {}
        order.date = date;
        order.name = name;
        order.phone = phone;
        order.address = address;
        order.productsNameAndCount = productsNameAndCount;
        order.totalPrice = totalPrice;
        this.orders.unshift(order);
        
    }

}
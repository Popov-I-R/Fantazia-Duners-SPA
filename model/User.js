class User {

    constructor() {
        this.name = ""
        this.phone = ""
        this.address = ""

        this.cart = [] 
        this.purchased = [] // Евентуално ще ползвам това за вече направените поръчки
      

    }

    addToCart(product) { 
        if (product.quantity == undefined) {
            product.quantity = 1
            if (this.cart.indexOf(product) === -1) {
                this.cart.push(product) 
            }
        } else {
            product.quantity++
        }



        // product.quantity = 1
        // // Някъде ми трябва променлива за количество, а долу трябва да има if producta go nqma - dobavi go v cart i uvelichi kolichestvoto - ako go ima i pak e natisnato - samo uvelichi kolichestvoto 
        // if (this.cart.indexOf(product) === -1) {
        //     this.cart.push(product) 
        // } else {
        //     this.quantity = this.quantity + 1
        // }
    }

}
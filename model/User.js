class User {
  constructor() {
    this.cart = [];
    this.orders = [];
  }

  addToCart(product, quantity) {
    
    let getIndex = this.cart.indexOf(product);
    if (getIndex === -1) {
      product.quantity = +quantity;
      if (this.cart.indexOf(product) === -1) {
        this.cart.push(product);
      }
    } else {
      product.quantity += +quantity;
    }
  }

  removeFromCart(product) {
    let getIndex = this.cart.indexOf(product);
    this.cart.splice(getIndex, 1);
  }

  makeOrder(date, name, phone, address, productsNameAndCount, totalPrice) {
    
    let order = {};
    order.date = date;
    order.name = name;
    order.phone = phone;
    order.address = address;
    order.productsNameAndCount = productsNameAndCount;
    order.totalPrice = totalPrice;
    this.orders.unshift(order);
  }
}

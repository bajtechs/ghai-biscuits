
function generateOrderID(branch){
  const timestamp = Date.now();
  const random = Math.floor(Math.random()*1000);
  return branch.substring(0,3).toUpperCase() + "-" + timestamp + "-" + random;
}

function addToCart(branch,name,price){
  let cart = JSON.parse(localStorage.getItem(branch)) || [];
  cart.push({name,price});
  localStorage.setItem(branch,JSON.stringify(cart));
  alert("Added to cart");
}

function loadCart(branch){
  let cart = JSON.parse(localStorage.getItem(branch)) || [];
  let container = document.getElementById("cart-items");
  let total = 0;
  container.innerHTML="";
  cart.forEach(item=>{
    total+=item.price;
    container.innerHTML+=`<p>${item.name} - ₹${item.price}</p>`;
  });
  document.getElementById("total").innerText=total;
  return total;
}

function submitOrder(branch){
  let cart = JSON.parse(localStorage.getItem(branch)) || [];
  let total = cart.reduce((sum,i)=>sum+i.price,0);
  const orderID = generateOrderID(branch);
  const customer = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;

  const message = `New Order!%0AOrder ID: ${orderID}%0ABranch: ${branch}%0ATotal: ₹${total}%0ACustomer: ${customer}%0APhone: ${phone}`;

  window.open(`https://wa.me/917696904810?text=${message}`);

  alert("Order Placed!");
  localStorage.removeItem(branch);
}

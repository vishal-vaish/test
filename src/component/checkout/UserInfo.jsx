import "./UserInfo.css";
import {useContext} from "react";
import {CartContext} from "../../context/CartProvider.jsx";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

const UserInfo = () => {
  return (
    <div className="user-info_container">
      <ContactInformation/>
      <ShippingAddress/>
    </div>
  )
}

const ContactInformation = () => {
  return (
    <div className="contact-info_container">
      <h3>Contact Information</h3>
      <input type="email" placeholder="Email"/>
    </div>
  );
}

const ShippingAddress = () => {
  const {emptyCart, cart} = useContext(CartContext);
  let navigate = useNavigate();

  const checkoutHandler = () => {
    if (cart.length < 1) {
      toast.error("Your shopping list is Emtpy");
      return;
    }
    let totalPrice = cart.reduce((acc, cur) => {
      return acc + cur.qty * cur.price;
    }, 0);
    if (totalPrice < 1) {
      toast.error("Cannot process order value of zero(0).");
      return;
    }

    emptyCart();
    toast.success("Checked out");
    navigate("/");
  }

  return (
    <div className="shipping-address_container">
      <h3>Shipping Address</h3>
      <div className="shipping-address_wrapper">
        <input type="name" placeholder="First name" id="firstname"/>
        <input type="name" placeholder="Last name" id="lastname"/>
        <input type="name" placeholder="Address" id="address"/>
        <input type="name" placeholder="City" id="city"/>
        <button className="checkout-btn" onClick={checkoutHandler}>
          Checkout
        </button>
      </div>
    </div>
  )
}

export default UserInfo;
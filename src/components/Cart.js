import { Component } from 'react';
// import firebase from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Cart extends Component {

    render() {
        return (
            <div className="wrapper cart-container">

                {/* when user clicks the 'exit' icon, call the closeCart function in App.js which closes/hides the cart */}
                <button className="exit-btn icon-btn" title="close wishlist" tabIndex="1" onClick={this.props.closeCart}>
                    <FontAwesomeIcon icon="times" />
                    <span className="sr-only">An exit icon, click here to close your cart.</span>
                </button>

                <h2>Your Cart</h2>
                <p className="cart-item-count"><span>{this.props.cartArray.length}</span> item(s) in cart</p>

                {/* map through the cart array and display the image, title, price & remove button for each wallpaper in an individual card */}
                <ul>
                    {this.props.cartArray.map((wallpaper) => {
                        return (
                            <li className="wishlist-card cart-card" key={wallpaper.id}>
                                <div className="cart-image">
                                    <img src={wallpaper.image} alt={wallpaper.alt} />
                                </div>
                                <div className="text-container">
                                    <div className="title-and-price">
                                        <p>{wallpaper.title}</p>
                                        <p>${wallpaper.price}</p>
                                    </div>
                                    {/* when user clicks the 'garbage' icon, call the removeWallpaperFromCart function in App.js which removes the wallpaper from the cart */}
                                    <button className="icon-btn" onClick={() => { this.props.removeWallpaperFromCart(wallpaper.id) }}>
                                        <FontAwesomeIcon icon="trash" title="remove wallpaper" />
                                        <span className="sr-only">Garbage can icon, click here to remove this wallpaper from your cart.</span>
                                    </button>
                                </div>

                            </li>
                        )
                    })}
                    <p className="cart-subtotal">Your Subtotal: <span>${this.props.cartSubtotal}</span></p>
                </ul>

            </div>
        );
    }
}

export default Cart;
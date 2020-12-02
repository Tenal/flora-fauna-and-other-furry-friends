import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Cart extends Component {

    render() {
        return (
            <div className="wrapper cart-container">

                {/* when user clicks the 'exit' icon, call the closeCart function in App.js which closes/hides the cart */}
                <button className="close-wishlist exit-btn" title="close wishlist" tabIndex="1" onClick={this.props.closeCart}>
                    <FontAwesomeIcon icon="times" />
                    <span className="sr-only">An exit icon, click here to close your wishlist.</span>
                </button>

                <h2>Your Cart</h2>

                {/* map through the wishlist array and display the image, title & remove button for each wallpaper in an individual card */}
                <ul>
                    {this.props.cartArray.map((wallpaper) => {
                        return (
                            <li className="wishlist-card" key={wallpaper.wallpaperId}>
                                <div className="wishlist-image">
                                    <img src={wallpaper.image} alt={wallpaper.alt} />
                                    <p>{wallpaper.title}</p>
                                </div>

                                {/* when user clicks the 'garbage' icon, call the removeWallpaperFromWishlist function in App.js which removes the wallpaper from the wishlist */}
                                {/* <button className="remove-btn" onClick={() => { this.props.removeWallpaperFromWishlist(wallpaper.id) }}>
                                    <FontAwesomeIcon icon="trash" title="remove wallpaper" />
                                    <span className="sr-only">Garbage can icon, click here to remove this wallpaper from your wishlist.</span>
                                </button> */}
                            </li>
                        )
                    })}
                </ul>

            </div>
        );
    }
}

export default Cart;
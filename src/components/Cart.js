import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Cart = (props) => {

    return (
        <div className="wrapper cart-container">

            {/* when user clicks the 'exit' icon, call the closeCartorWishlist function in App.js & pass in 'cart' as an argument in order to close/hide the cart */}
            <button className="exit-btn icon-btn" title="close wishlist" tabIndex="1" onClick={() => {props.closeCartorWishlist('cart')}}>
                <FontAwesomeIcon icon="times" />
                <span className="sr-only">An exit icon, click here to close your cart.</span>
            </button>

            <h2>Your Cart</h2>
            <p className="cart-item-count"><span>{props.cartArray.length}</span> item(s) in cart</p>

            {/* map through the cart array and display the image, title, price & remove button for each wallpaper in an individual card */}
            <ul>
                {props.cartArray.map((wallpaper) => {
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
                                {/* when user clicks the 'garbage' icon, call the removeWallpaperFromCartorWishlist function in App.js which will remove the wallpaper from the cart */}
                                <button className="icon-btn" onClick={() => {props.removeWallpaperFromCartorWishlist(wallpaper.id, 'cart') }}>
                                    <FontAwesomeIcon icon="trash" title="remove wallpaper" />
                                    <span className="sr-only">Garbage can icon, click here to remove this wallpaper from your cart.</span>
                                </button>
                            </div>

                        </li>
                    )
                })}
                {/* render the cart subtotal if there is at least one wallpaper in the cart */}
                {
                    (props.cartArray.length >= 1)
                    ? 
                        <p className="cart-subtotal">Your Subtotal: <span>${props.cartSubtotal.toFixed(2)}</span></p>
                    : null
                }
            </ul>
        </div>
    );
}

export default Cart;
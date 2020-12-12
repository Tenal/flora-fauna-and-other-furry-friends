import IconButton from './IconButton.js';

const Cart = (props) => {

    return (
        <div className="wrapper cart-container">

            {/* when user clicks the 'exit' icon, call the closeCartorWishlist function in App.js & pass in 'cart' as an argument in order to close/hide the cart */}
            <IconButton 
                buttonClass="exit-btn icon-btn"
                fontIcon="times"
                fontTitle="close cart"
                spanText="An exit icon, click here to close your cart."
                onClickHandler={() => { props.closeCartorWishlist('cart') }}
            />


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
                                <IconButton
                                    buttonClass="icon-btn"
                                    fontIcon="trash"
                                    fontTitle="remove wallpaper"
                                    spanText="Garbage can icon, click here to remove this wallpaper from your cart."
                                    onClickHandler={() => { props.removeWallpaperFromCartorWishlist(wallpaper.id, 'cart') }}
                                />

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
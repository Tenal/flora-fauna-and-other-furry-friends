import IconButton from './IconButton';

const Header = (props) => {
    return (
        <header>
            <nav>
                <div className="wrapper nav-btn-container">
                    {/* when user clicks 'star' icon, call the displayCartorWishlist function in App.js & pass in 'wishlist' as an argument in order to open up the wishlist */}
                    <IconButton 
                        buttonClass="nav-btn icon-btn"
                        fontIcon="star"
                        fontTitle="wishlist"
                        fontClass="star"
                        spanText="A star icon, click here to access your wishlist."
                        onClickHandler={() => { props.displayCartorWishlist('wishlist') }}
                    />

                    {/* when user clicks 'shopping cart' icon, call the displayCartorWishlist function in App.js & pass in 'cart' as an argument in order to open up the cart */}
                    <div className="cart-btn">
                        <IconButton
                            buttonClass="nav-btn icon-btn"
                            fontIcon="shopping-cart"
                            fontTitle="cart"
                            fontClass="cart"
                            spanText="A cart icon, click here to access your cart."
                            onClickHandler={() => { props.displayCartorWishlist('cart') }}
                        />

                        <div className="header-item-count">
                            {
                                (props.cartArray.length >= 1)
                                ?
                                <p>{props.cartArray.length}</p>
                                : null
                            }
                        </div>
                    </div>
                </div>
            </nav>
            <div className="wrapper heading-container">
                <h1>Flora, Fauna, & other Furry Friends</h1>
            </div>
        </header>
    );
}

export default Header;
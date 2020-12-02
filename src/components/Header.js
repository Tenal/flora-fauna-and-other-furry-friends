import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = (props) => {
    return (
        <header>
            <nav>
                <div className="wrapper nav-btn-container">
                    {/* when user clicks 'star' icon, call the displayWishlist function in App.js which opens up the wishlist */}
                    <button className="nav-btn icon-btn" onClick={props.displayWishlist}>
                        <FontAwesomeIcon icon="star" title="wishlist" className="star" />
                        <span className="sr-only">A star icon, click here to access your wishlist.</span>
                    </button>
                    {/* when user clicks 'shopping cart' icon, call the displayCart function in App.js which opens up the cart */}
                    <button className="nav-btn icon-btn" onClick={props.displayCart}>
                        <FontAwesomeIcon icon="shopping-cart" title="cart" className="cart" />
                        <span className="sr-only">A cart icon, click here to access your cart.</span>
                    </button>
                </div>
            </nav>
            <div className="wrapper heading-container">
                <h1>Flora, Fauna, & other Furry Friends</h1>
            </div>
        </header>
    );
}

export default Header;
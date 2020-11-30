import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = (props) => {
    return (
        <header>
            <nav>
                <div className="wrapper nav-btn-container">
                    {/* when user clicks 'star' icon, call the displayWishlist function in App.js which opens up the wishlist */}
                    <button className="nav-star-btn" onClick={props.displayWishlist}>
                        <FontAwesomeIcon icon="star" title="wishlist" className="star" />
                        <span className="sr-only">A star icon, click here to access your wishlist.</span>
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
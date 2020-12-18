import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from './IconButton.js';

const Wishlist = (props) => {

    return (
        <div className="wrapper wishlist-container">

            {/* when user clicks the 'exit' icon, call the displayOrCloseCartOrWishlist function in App.js & pass in 'wishlist' as an argument in order to close/hide the wishlist */}
            <IconButton
                buttonClass="exit-btn icon-btn"
                fontIcon="times"
                fontTitle="close wishlist"
                spanText="An exit icon, click here to close your wishlist."
                onClickHandler={() => { props.displayOrCloseCartOrWishlist('wishlist') }}
            />

            <h2>Your Wishlist</h2>

            {/* map through the wishlist array and display the image, title & remove button for each wallpaper in an individual card */}
            <ul>
                {props.wishlistArray.map((wallpaper) => {
                    return (
                        <li className="wishlist-card" key={wallpaper.wallpaperId}>
                            <div className="wishlist-image">
                                <img src={wallpaper.image} alt={wallpaper.alt} />
                                <p>{wallpaper.title}</p>
                            </div>

                            {/* when user clicks the 'garbage' icon, call the removeWallpaperFromCartorWishlist function in App.js & pass in 'wishlist' as an argument in order to remove the wallpaper from the wishlist */}
                            <IconButton
                                buttonClass="icon-btn remove-wishlist-btn"
                                fontIcon="trash"
                                fontTitle="remove wallpaper"
                                spanText="Garbage can icon, click here to remove this wallpaper from your wishlist."
                                onClickHandler={() => { props.removeWallpaperFromCartorWishlist(wallpaper.id, 'wishlist') }}
                            />
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default Wishlist;
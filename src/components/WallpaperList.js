import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const WallpaperList = (props) => {

    return (
        <section className="wallpapers-section">
            <ul className="wallpaper-container">
                {/* map through the wallpapers array and display the image, title, price, & 'add to wishlist' button for each one in individual cards */}
                { props.wallpaperArray.map((wallpaper) => {
                    // search through the wishlist array to check to see if the wallpaper being displayed is currently in the wishlist array
                    let isInWishlist = props.wishlistArray.some(picture => picture.image === wallpaper.image);

                    return (
                        <li key={wallpaper.wallpaperId} className="wallpaper-card">
                            <div className="wallpaper-image">
                                <img src={wallpaper.image} alt={wallpaper.alt} />
                                {/* IF the wallpaper being displayed has been added to the wishlist by the user, then show a star icon on the image. If it has NOT been added to the wishlist, do not display a star icon on the image. */}
                                {
                                    (isInWishlist)
                                        ? 
                                        <div>
                                            <FontAwesomeIcon icon="star" title="saved to wishlist" className="star-sticker" />
                                            <span className="sr-only">A star icon, click here to access your wishlist.</span>
                                        </div> 
                                        : null
                                }
                                <button className="add-to-btn add-to-wishlist-btn" onClick={() => props.addWallpaperToWishlist(wallpaper)}>add to wishlist</button>
                            </div>
                            <h2>{wallpaper.title}</h2>
                            <p>${wallpaper.price}</p>
                            {/* when user clicks 'add to wishlist' button, call the addWallpaperToWishlist function in App.js which adds the wallpaper to the wishlist */}
                            <button className="add-to-btn" onClick={() => props.addWallpaperToCart(wallpaper)}>add to cart</button>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}

export default WallpaperList;
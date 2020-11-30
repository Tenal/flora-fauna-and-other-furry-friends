import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const WallpaperList = (props) => {

    return (
        <div className="wrapper wallpaper-container">
            {/* map through the wallpapers array and display the image, title, price, & 'add to wishlist' button for each one in individual cards */}
            { props.wallpaperArray.map((wallpaper) => {
                let isInWishlist = props.wishlistArray.some(picture => picture.image === wallpaper.image);
                return (
                    <li key={wallpaper.wallpaperId} className="wallpaper-card">
                        <div className="wallpaper-image">
                            <img src={wallpaper.image} alt={wallpaper.alt} />
                            {
                                (isInWishlist)
                                    ? 
                                    <div>
                                        <FontAwesomeIcon icon="star" title="saved to wishlist" className="star-sticker" />
                                        <span className="sr-only">A star icon, click here to access your wishlist.</span>
                                    </div> 
                                    : null
                            }

                                
                            
                        </div>
                        <h2>{wallpaper.title}</h2>
                        <p>{wallpaper.price}</p>
                        {/* when user clicks 'add to wishlist' button, call the addWallpaper function in App.js which adds the wallpaper to the wishlist */}
                        <button onClick={() => props.addWallpaper(wallpaper)}>add to wishlist</button>
                    </li>
                )
            })}
        </div>
    );
}

export default WallpaperList;
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Wishlist extends Component {
    render() { 
        return (
            <div className="wrapper wishlist-container">

                {/* when user clicks the 'exit' icon, call the closeWishlist function in App.js which closes/hides the wishlist */}
                <button className="exit-btn icon-btn" title="close wishlist" tabIndex="1" onClick={this.props.closeWishlist}>
                    <FontAwesomeIcon icon="times"/>
                    <span className="sr-only">An exit icon, click here to close your wishlist.</span>
                </button>

                <h2>Your Wishlist</h2>

                {/* map through the wishlist array and display the image, title & remove button for each wallpaper in an individual card */}
                <ul>
                    {this.props.wishlistArray.map((wallpaper) => {
                        return (
                            <li className="wishlist-card" key={wallpaper.wallpaperId}>
                                <div className="wishlist-image">
                                    <img src={wallpaper.image} alt={wallpaper.alt} />
                                    <p>{wallpaper.title}</p>
                                </div>

                                {/* when user clicks the 'garbage' icon, call the removeWallpaperFromCartorWishlist function in App.js which will remove the wallpaper from the wishlist */}
                                <button className="icon-btn remove-wishlist-btn" onClick={() => { this.props.removeWallpaperFromCartorWishlist(wallpaper.id, 'wishlist') }}>
                                    <FontAwesomeIcon icon="trash" title="remove wallpaper" />
                                    <span className="sr-only">Garbage can icon, click here to remove this wallpaper from your wishlist.</span>
                                </button>
                            </li>
                        )
                    })}
                </ul>

            </div>
        );
    }
}

export default Wishlist;
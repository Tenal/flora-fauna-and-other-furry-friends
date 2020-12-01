// importing primary modules & styling
import { Component } from 'react';
import firebase from './firebase.js'
import './App.css';

// importing components
import Header from './components/Header.js';
import Wishlist from './components/Wishlist.js'
import BrowseBy from './components/BrowseBy.js';
import WallpaperList from './components/WallpaperList.js';
import Modal from './components/Modal.js'
import Footer from './components/Footer.js';
import wallpapers from './wallpapers.js';

// importing font awesome icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar, faTrash, faTimes, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
library.add(faStar, faTrash, faTimes, faShoppingCart);



class App extends Component {
    constructor() {
        super();
        this.state = {
            wallpaperArray: wallpapers,
            wishlistArray: [],
            isWishlistDisplayed: false,
            isModalDisplayed: false
        }
    }


    componentDidMount() {
        // reference the app's database 
        const dbRef = firebase.database().ref();
        
        // pull any existing data from the database
        dbRef.on('value', (data) => {
            const firebaseDataObj = data.val();
            console.log('firebase data object', firebaseDataObj);

            let newWishlistArray = [];

            // loop through the object returned from the database
            for (let propertyKey in firebaseDataObj) {
                // extract the object key and all internal property values from the object
                const imageVal = firebaseDataObj[propertyKey].image;
                const altVal = firebaseDataObj[propertyKey].alt;
                const titleVal = firebaseDataObj[propertyKey].title;
                const priceVal = firebaseDataObj[propertyKey].price;
                const idVal = firebaseDataObj[propertyKey].wallpaperId;

                // reformat the object
                const formattedObj = {
                    id: propertyKey,
                    image: imageVal,
                    alt: altVal,
                    title: titleVal,
                    price: priceVal,
                    wallpaperId: idVal,
                }

                // push the newly formatted object into the new wishlist array
                newWishlistArray.push(formattedObj);
            }
            // update the state of the wishlist array with the new wishlist array (ie: firebase data)
            this.setState({
                wishlistArray: newWishlistArray
            })
        })
    }


    // a function that displays all wallpapers when the user clicks 'all wallpapers' button
    displayAllWallpapers = () => {
        this.setState({
            wallpaperArray: wallpapers
        });
    }


    // a function that filters through the wallpapers and displays only the wallpapers that match the category the user has selected (ie: 'flora', 'fauna', or 'fluffy friends')
    displayCategoryWallpapers = (category) => {
        const filteredWallpaperArray = wallpapers.filter((wallpaper) => {
            return wallpaper.category === category
        })

        this.setState({
            wallpaperArray: filteredWallpaperArray
        });
    }


    // a function that adds the wallpaper to the wishlist & firebase when user clicks ‘add to wishlist’ button
    addWallpaper = (wallpaperToBeAdded) => {
        // reference to database
        const dbRef = firebase.database().ref();

        // filter through wishlist array to see if the wallpaper has already been added to the wishlist (ie: check to see if the wallpaper ID already exists within the array)
        const filteredWishlistArray = this.state.wishlistArray.filter((wishlistWallpaper) => {
            return wishlistWallpaper.wallpaperId === wallpaperToBeAdded.wallpaperId
        })

        // If the wallpaper has already been added to the wishlist (ie: if the ID exists in the array), then display a modal informing the user. Else, add the wallpaper object to the wishlist array
        if (filteredWishlistArray.length >= 1) {
            this.displayModal();
        } else {
            dbRef.push(wallpaperToBeAdded);
        }
    }


    // a function that removes the wallpaper from the wishlist & firebase when user clicks the 'garbage' icon (ie: remove button)
    removeWallpaper = (wallpaperId) => {
        const dbRef = firebase.database().ref();
        dbRef.child(wallpaperId).remove();
    }


    // a function that displays the wishlist when user clicks on the 'star' icon (ie: wishlist button)
    displayWishlist = () => {
        this.setState({
            isWishlistDisplayed: !this.state.isWishlistDisplayed
        });
    }


    // a function that closes the wishlist when user clicks on the 'exit' icon
    closeWishlist = () => {
        this.setState({
            isWishlistDisplayed: false
        });
    }


    // a function that displays the modal when user attempts to add a wallpaper to the wishlist that has already been added
    displayModal = () => {
        this.setState({
            isModalDisplayed: true
        });
    }


    // a function that closes the modal when user clicks on the 'exit' icon
    closeModal = () => {
        this.setState({
            isModalDisplayed: !this.state.isModalDisplayed
        });
    }


    render() { 
        return (
            <>
                <Header 
                    displayWishlist={this.displayWishlist}
                />
                {/* dynamically render the wishlist section (ie: only display the wishlist if the state of the wishlist is true) */}
                {
                    this.state.isWishlistDisplayed &&
                    <Wishlist 
                        wishlistArray={this.state.wishlistArray}
                        removeWallpaper={this.removeWallpaper}
                        isWishlistDisplayed={this.state.isWishlistDisplayed}
                        closeWishlist={this.closeWishlist}
                    />
                }
                <main>
                    <div className="wrapper main-container">
                        {/* dynamically render the modal (ie: only display the modal if the state of the modal is true) */}
                        {
                            this.state.isModalDisplayed &&
                            <Modal 
                                isModalDisplayed={this.state.isModalDisplayed}
                                closeModal={this.closeModal}
                            />
                        }
                        <aside className="browse-aside">
                            <BrowseBy 
                                displayAllWallpapers={this.displayAllWallpapers}
                                displayCategoryWallpapers={this.displayCategoryWallpapers}
                            />
                        </aside>
                        <section className="wallpapers-section">
                            <ul>
                                <WallpaperList 
                                    wishlistArray={this.state.wishlistArray}
                                    addWallpaper={this.addWallpaper}
                                    wallpaperArray={this.state.wallpaperArray}
                                />
                            </ul>
                        </section>
                    </div>
                </main>
                
                <Footer />
            </>
        );
    }
}

export default App;
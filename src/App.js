// importing primary modules & styling
import { Component } from 'react';
import firebase from './firebase.js';
import './App.css';

// importing components
import Header from './components/Header.js';
import ScrollToTop from './components/ScrollToTop.js';
import Wishlist from './components/Wishlist.js';
import Cart from './components/Wishlist.js';
import BrowseBy from './components/BrowseBy.js';
import WallpaperList from './components/WallpaperList.js';
import Modal from './components/Modal.js';
import Footer from './components/Footer.js';
import wallpapers from './wallpapers.js';

// importing font awesome icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar, faTrash, faTimes, faShoppingCart, faArrowUp } from '@fortawesome/free-solid-svg-icons';
library.add(faStar, faTrash, faTimes, faShoppingCart, faArrowUp);



class App extends Component {
    constructor() {
        super();
        this.state = {
            wallpaperArray: wallpapers,
            wishlistArray: [],
            cartArray: [],
            isWishlistDisplayed: false,
            isCartDisplayed: false,
            isModalDisplayed: false,
            isArrowDisplayed: false
        }
    }


    componentDidMount() {
        // reference the app's database for wishlist & cart
        const dbWishlistRef = firebase.database().ref('wishlist');
        const dbCartRef = firebase.database().ref('cart');
        
        // pull any existing data from the database for WISHLIST
        dbWishlistRef.on('value', (data) => {
            const firebaseDataObj = data.val();

            let newWishlistArray = [];

            // loop through the object returned from the wishlist database
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

        // pull any existing data from the database for CART
        dbCartRef.on('value', (data) => {
            const firebaseDataObj = data.val();
            console.log('firebase data object', firebaseDataObj);

            let newCartArray = [];

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
                newCartArray.push(formattedObj);
            }
            // update the state of the wishlist array with the new wishlist array (ie: firebase data)
            this.setState({
                cartArray: newCartArray
            })
        })
    }


    // BROWSE/FILTER FUNCTIONS ---------------------------------

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











    // WISHLIST FUNCTIONS ---------------------------------

    // a function that adds the wallpaper to the wishlist & firebase when user clicks ‘add to wishlist’ button
    addWallpaperToWishlist = (wallpaperToBeAdded) => {
        // reference to database
        const dbWishlistRef = firebase.database().ref('wishlist');

        // filter through wishlist array to see if the wallpaper has already been added to the wishlist (ie: check to see if the wallpaper ID already exists within the array)
        const filteredWishlistArray = this.state.wishlistArray.filter((wishlistWallpaper) => {
            return wishlistWallpaper.wallpaperId === wallpaperToBeAdded.wallpaperId
        })

        // If the wallpaper has already been added to the wishlist (ie: if the ID exists in the array), then display a modal informing the user. Else, add the wallpaper object to the wishlist array
        if (filteredWishlistArray.length >= 1) {
            this.displayModal();
        } else {
            dbWishlistRef.push(wallpaperToBeAdded);
        }
    }


    // a function that removes the wallpaper from the wishlist & firebase when user clicks the 'garbage' icon (ie: remove button)
    removeWallpaperFromWishlist = (wallpaperId) => {
        const dbWishlistRef = firebase.database().ref('wishlist');
        dbWishlistRef.child(wallpaperId).remove();
    }


    // a function that displays the wishlist when user clicks on the 'star' icon (ie: wishlist button)
    displayWishlist = () => {
        this.setState({
            isWishlistDisplayed: true
        });
    }


    // a function that closes the wishlist when user clicks on the 'exit' icon
    closeWishlist = () => {
        this.setState({
            isWishlistDisplayed: !this.state.isWishlistDisplayed
        });
    }


    // a function that displays the modal when user attempts to add a wallpaper to the wishlist that has already been added
    displayModal = () => {
        this.setState({
            isModalDisplayed: !this.state.isModalDisplayed
        });
    }


    // a function that closes the modal when user clicks on the 'exit' icon
    closeModal = () => {
        this.setState({
            isModalDisplayed: !this.state.isModalDisplayed
        });
    }









    // CART FUNCTIONS ---------------------------------

    // a function that adds the wallpaper to the cart & firebase when user clicks ‘add to cart button
    addWallpaperToCart = (wallpaperToBeAdded) => {
        // reference to database
        const dbCartRef = firebase.database().ref('cart');

        dbCartRef.push(wallpaperToBeAdded);
    }

    // a function that displays the cart when user clicks on the 'shopping cart' icon (ie: cart button)
    displayCart = () => {
        console.log('you clicked the cart!');
        this.setState({
            isCartDisplayed: true
        });
    }

    // a function that closes the cart when user clicks on the 'exit' icon
    closeCart = () => {
        console.log('you are closing the cart');
        this.setState({
            isCartDisplayed: false
        });
    }





    render() { 
        return (
            <>
                <Header 
                    displayWishlist={this.displayWishlist}
                    displayCart={this.displayCart}
                />
                <main>
                {/* dynamically render the wishlist section (ie: only display the wishlist if the state of the wishlist is true) */}
                {
                    this.state.isWishlistDisplayed &&
                    <Wishlist 
                        wishlistArray={this.state.wishlistArray}
                        removeWallpaperFromWishlist={this.removeWallpaperFromWishlist}
                        isWishlistDisplayed={this.state.isWishlistDisplayed}
                        closeWishlist={this.closeWishlist}
                    />
                }
                {/* dynamically render the cart section (ie: only display the cart if the state of the cart is true) */}
                {
                    this.state.isCartDisplayed &&
                    <Cart
                        cartArray={this.state.cartArray}
                        // removeWallpaperFromWishlist={this.removeWallpaperFromWishlist}
                        isCartDisplayed={this.state.isCartDisplayed}
                        closeCart={this.closeCart}
                    />
                }
                
                    <div className="wrapper main-container">
                        <ScrollToTop 
                            isArrowDisplayed={this.state.isArrowDisplayed}
                        />
                        {/* dynamically render the modal (ie: only display the modal if the state of the modal is true) */}
                        {
                            this.state.isModalDisplayed &&
                            <Modal 
                                isModalDisplayed={this.state.isModalDisplayed}
                                closeModal={this.closeModal}
                            />
                        }
                        <BrowseBy 
                            displayAllWallpapers={this.displayAllWallpapers}
                            displayCategoryWallpapers={this.displayCategoryWallpapers}
                        />
                        <WallpaperList 
                            wallpaperArray={this.state.wallpaperArray}
                            wishlistArray={this.state.wishlistArray}
                            cartArray={this.state.cartArray}
                            addWallpaperToWishlist={this.addWallpaperToWishlist}
                            addWallpaperToCart={this.addWallpaperToCart}
                        />
                    </div>
                </main>
                <Footer />
            </>
        );
    }
}

export default App;
import { Component } from 'react';
import firebase from './firebase.js';
import './App.css';

// importing components
import Header from './components/Header.js';
import ScrollToTop from './components/ScrollToTop.js';
import Wishlist from './components/Wishlist.js';
import Cart from './components/Cart.js';
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
            cartSubtotal: 0,
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
        
        // WISHLIST
        dbWishlistRef.on('value', (data) => {
            // pull any existing data from the database
            const firebaseWishlistObject = data.val();

            let newWishlistArray = [];

            // loop through the object returned from the wishlist database
            for (let propertyKey in firebaseWishlistObject) {
                // extract the object key and all internal property values from the object
                const imageVal = firebaseWishlistObject[propertyKey].image;
                const altVal = firebaseWishlistObject[propertyKey].alt;
                const titleVal = firebaseWishlistObject[propertyKey].title;
                const priceVal = firebaseWishlistObject[propertyKey].price;
                const idVal = firebaseWishlistObject[propertyKey].wallpaperId;

                // reformat the object
                const formattedWishlistObject = {
                    id: propertyKey,
                    image: imageVal,
                    alt: altVal,
                    title: titleVal,
                    price: priceVal,
                    wallpaperId: idVal,
                }

                // push the newly formatted object into the new wishlist array
                newWishlistArray.push(formattedWishlistObject);
            }

            // update the state of the wishlist array with the new wishlist array (ie: firebase data)
            this.setState({
                wishlistArray: newWishlistArray
            });
        });

        // CART
        dbCartRef.on('value', (data) => {
            // pull any existing data from the database
            const firebaseCartObject = data.val();

            let newCartArray = [];

            // loop through the object returned from the database
            for (let propertyKey in firebaseCartObject) {
                // extract the object key and all internal property values from the object
                const imageVal = firebaseCartObject[propertyKey].image;
                const altVal = firebaseCartObject[propertyKey].alt;
                const titleVal = firebaseCartObject[propertyKey].title;
                const priceVal = firebaseCartObject[propertyKey].price;
                const idVal = firebaseCartObject[propertyKey].wallpaperId;

                // reformat the object
                const formattedCartObject = {
                    id: propertyKey,
                    image: imageVal,
                    alt: altVal,
                    title: titleVal,
                    price: priceVal,
                    wallpaperId: idVal,
                }

                // push the newly formatted object into the new wishlist array
                newCartArray.push(formattedCartObject);
            }
            
            // if at least one object exists in the firebase cart, loop through the object(s) & add their prices together
            if (firebaseCartObject !== null) {
                let price = 0;
                newCartArray.forEach((cartObject) => {
                    price = price + (cartObject.price)
                });

                // update the state of the cart array & cart subtotal
                this.setState({
                    cartArray: newCartArray,
                    cartSubtotal: price
                });
            } else {
                this.setState({
                    cartArray: [],
                    cartSubtotal: 0
                });
            }
        });
    }


    // BROWSE/FILTER FUNCTIONS ---------------------------------

    // (1) a function that filters through the wallpapers and displays only the wallpapers that match the category the user has selected (ie: 'all', 'flora', 'fauna', or 'fluffy friends')
    displayCategoryWallpapers = (category) => {
        if (category === 'all') {
            this.setState({
                wallpaperArray: wallpapers
            });
        } else {
            const wallpaperArrayByCategory = wallpapers.filter((wallpaper) => {
                return wallpaper.category === category
            })
            this.setState({
                wallpaperArray: wallpaperArrayByCategory
            });
        }
    }


    // CART/WISHLIST FUNCTIONS ---------------------------------

    // (1) a function that adds the wallpaper to the cart OR wishlist (& firebase) depending on if user clicks the ‘add to wishlist’ or 'add to cart' button
    addWallpaperToCartorWishlist = (wallpaperToBeAdded, cartOrWishlist) => {
        const dbRef = firebase.database().ref(cartOrWishlist);

        // if user is trying to add to wishlist, check to see if wallpaper has already been added to wishlist before adding it, else if user is adding to cart add wallpaper without checking
        if (cartOrWishlist === 'wishlist') {
            // filter through wishlist array to see if the wallpaper has already been added to the wishlist (ie: check to see if the wallpaper ID already exists within the array)
            const filteredWishlistArray = this.state.wishlistArray.filter((wishlistWallpaper) => {
                return wishlistWallpaper.wallpaperId === wallpaperToBeAdded.wallpaperId
            });

            // if the wallpaper has already been added, then display a modal informing the user. Else, add the wallpaper object to the wishlist array
            if (filteredWishlistArray.length >= 1) {
                this.displayModal();
            } else {
                dbRef.push(wallpaperToBeAdded);
            }
        } 
        else if (cartOrWishlist === 'cart') {
            dbRef.push(wallpaperToBeAdded);
        }
    }

    // (2) a function that removes the wallpaper from the cart OR wishlist (& firebase) when user clicks the 'garbage' icon (ie: remove button)
    removeWallpaperFromCartorWishlist = (wallpaperId, cartOrWishlist) => {
        const dbRef = firebase.database().ref(cartOrWishlist);
        dbRef.child(wallpaperId).remove();
    }

    // (3) a function that displays the cart OR wishlist depending on if user clicks the 'cart' icon (ie: cart button) or 'star' icon (ie: wishlist button)
    displayCartorWishlist = (cartOrWishlist) => {
        if (cartOrWishlist === 'cart') {
            this.setState({
                isCartDisplayed: !this.state.isCartDisplayed
            });
        } else if (cartOrWishlist === 'wishlist') {
            this.setState({
                isWishlistDisplayed: !this.state.isCartDisplayed
            });
        }
    }

    // (4) a function that closes the cart OR wishlist when user clicks on the 'exit' icon (ie: close button)
    closeCartorWishlist = (cartOrWishlist) => {
        if (cartOrWishlist === 'cart') {
            this.setState({
                isCartDisplayed: !this.state.isCartDisplayed
            });
        } else if (cartOrWishlist === 'wishlist') {
            this.setState({
                isWishlistDisplayed: !this.state.isWishlistDisplayed
            });
        }
    }


    // MODAL FUNCTIONS ---------------------------------

    // (1) a function that displays the modal when user attempts to add a wallpaper to the wishlist that has already been added
    displayModal = () => {
        this.setState({
            isModalDisplayed: !this.state.isModalDisplayed
        });
    }

    // (2) a function that closes the modal when user clicks on the 'exit' icon
    closeModal = () => {
        this.setState({
            isModalDisplayed: !this.state.isModalDisplayed
        });
    }


    render() {
        return (
            <>
                <Header 
                    displayCartorWishlist={this.displayCartorWishlist}
                    cartArray={this.state.cartArray}
                />
                <main>
                    <div className="wrapper main-container">
                    {/* dynamically render the wishlist section (ie: only display the wishlist if the state of the wishlist is true) */}
                    {
                        this.state.isWishlistDisplayed &&
                        <Wishlist 
                            isWishlistDisplayed={this.state.isWishlistDisplayed}
                            wishlistArray={this.state.wishlistArray}
                            removeWallpaperFromCartorWishlist={this.removeWallpaperFromCartorWishlist}
                            closeCartorWishlist={this.closeCartorWishlist}
                        />
                    }
                    {/* dynamically render the cart section (ie: only display the cart if the state of the cart is true) */}
                    {
                        this.state.isCartDisplayed &&
                        <Cart
                            isCartDisplayed={this.state.isCartDisplayed}
                            cartArray={this.state.cartArray}
                            removeWallpaperFromCartorWishlist={this.removeWallpaperFromCartorWishlist}
                            closeCartorWishlist={this.closeCartorWishlist}
                            cartSubtotal={this.state.cartSubtotal}
                        />
                    }
                    {/* dynamically render the modal (ie: only display the modal if the state of the modal is true) */}
                    {
                        this.state.isModalDisplayed &&
                        <Modal 
                        isModalDisplayed={this.state.isModalDisplayed}
                        closeModal={this.closeModal}
                        />
                    }
                    <ScrollToTop 
                        isArrowDisplayed={this.state.isArrowDisplayed}
                    />
                    <BrowseBy 
                        displayCategoryWallpapers={this.displayCategoryWallpapers}
                    />
                    <WallpaperList 
                        wallpaperArray={this.state.wallpaperArray}
                        wishlistArray={this.state.wishlistArray}
                        cartArray={this.state.cartArray}
                        addWallpaperToCartorWishlist={this.addWallpaperToCartorWishlist}
                    />
                    </div>
                </main>
                <Footer />
            </>
        );
    }
}

export default App;
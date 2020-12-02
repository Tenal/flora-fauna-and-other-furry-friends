import { Component } from 'react';
import firebase from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartSubtotal: 0
        };
    }


    componentDidMount() {
        // reference the app's database for wishlist & cart
        const dbCartRef = firebase.database().ref('cart');

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
                    console.log('PRICE:', price)
                });

                // update the state of the cart array & cart subtotal
                this.setState({
                    cartArray: newCartArray,
                    cartSubtotal: price
                });
                console.log('cart subtotal 1.0', this.state.cartSubtotal)
            } else {
                this.setState({
                    cartArray: [],
                    cartSubtotal: 0
                });
            }
            console.log('cart subtotal 2.0', this.state.cartSubtotal)
        })
    }


    // a function that adds the wallpaper to the cart & firebase when user clicks ‘add to cart button
    addWallpaperToCart = (wallpaperToBeAdded) => {
        // reference to database
        const dbCartRef = firebase.database().ref('cart');

        dbCartRef.push(wallpaperToBeAdded);
    }

    // a function that removes the wallpaper from the cart & firebase when user clicks the 'garbage' icon (ie: remove button)
    removeWallpaperFromCart = (wallpaperId) => {
        const dbCartRef = firebase.database().ref('cart');
        dbCartRef.child(wallpaperId).remove();
    }


    render() {
        return (
            <div className="wrapper wishlist-container">

                {/* when user clicks the 'exit' icon, call the closeCart function in App.js which closes/hides the cart */}
                <button className="exit-btn icon-btn" title="close wishlist" tabIndex="1" onClick={this.props.closeCart}>
                    <FontAwesomeIcon icon="times" />
                    <span className="sr-only">An exit icon, click here to close your cart.</span>
                </button>

                <h2>Your Cart</h2>

                {/* map through the cart array and display the image, title, price & remove button for each wallpaper in an individual card */}
                <ul>
                    {this.props.cartArray.map((wallpaper) => {
                        return (
                            <li className="wishlist-card" key={wallpaper.id}>
                                <div className="wishlist-image">
                                    <img src={wallpaper.image} alt={wallpaper.alt} />
                                    <p>{wallpaper.title}</p>
                                    <p>${wallpaper.price}.00</p>
                                </div>

                                {/* when user clicks the 'garbage' icon, call the removeWallpaperFromCart function in App.js which removes the wallpaper from the cart */}
                                <button className="remove-btn icon-btn" onClick={() => { this.props.removeWallpaperFromCart(wallpaper.id) }}>
                                    <FontAwesomeIcon icon="trash" title="remove wallpaper" />
                                    <span className="sr-only">Garbage can icon, click here to remove this wallpaper from your cart.</span>
                                </button>
                            </li>
                        )
                    })}
                    <p className="cart-subtotal">Your Subtotal: <span>${this.state.cartSubtotal}.00</span></p>
                </ul>

            </div>
        );
    }
}

export default Cart;
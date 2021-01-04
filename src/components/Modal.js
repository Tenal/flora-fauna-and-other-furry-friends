import IconButton from './IconButton.js';

const Modal = (props) => {
    return (
        <div className="modal" tabIndex="0">
            <div className="modal-box" tabIndex="0">
                {/* when user clicks 'exit' icon, call the displayOrCloseModal function in App.js which will close the pop-up modal */}
                <IconButton
                    buttonClass="exit-modal exit-btn icon-btn"
                    fontIcon="times"
                    fontTitle="close modal"
                    spanText="An exit icon, click here to close this pop-up modal."
                    onClickHandler={() => props.displayOrCloseModal('wishlist')}
                    tabIndex="0"
                />
                {
                    (props.modalToBeDisplayed === 'wishlist')
                    ?
                        <div>
                            <h3>Oops!</h3>
                            <p>You've already added this wallpaper to your wishlist, but we're happy to see how much you love it!</p>
                        </div>
                    :
                        <div>
                            <h3>Wow!</h3>
                            <p>This wallpaper is already in your cart! You have complete electronic access to any purchased wallpapers, so there's no need to purchase them more than once.</p>
                        </div>
                }
            </div>
        </div>
    );
}

export default Modal;
import IconButton from './IconButton.js';

const Modal = (props) => {
    return (
        <div className="modal">
            <div className="modal-box">
                {/* when user clicks 'exit' icon, call the displayOrCloseModal function in App.js which will close the pop-up modal */}
                <IconButton
                    buttonClass="exit-modal exit-btn icon-btn"
                    fontIcon="times"
                    fontTitle="close modal"
                    spanText="An exit icon, click here to close this pop-up modal."
                    onClickHandler={props.displayOrCloseModal}
                />
                <div>
                    <h3>Oops!</h3>
                    <p>You've already added this wallpaper to your wishlist, but we're happy to see how much you love it!</p>
                </div>
            </div>
        </div>
    );
}

export default Modal;
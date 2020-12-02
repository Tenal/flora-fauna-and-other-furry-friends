import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Modal = (props) => {
    return (
        <div className="wrapper modal">
            <div className="modal-box">
                {/* when user clicks 'exit' icon, call the closeModal function in App.js which closes the pop-up modal */}
                <button className="exit-modal exit-btn icon-btn" title="close modal" tabIndex="1" onClick={props.closeModal}>
                    <FontAwesomeIcon icon="times" />
                    <span className="sr-only">An exit icon, click here to close this pop-up modal.</span>
                </button>
                <div>
                    <h3>Oops!</h3>
                    <p>You've already added this wallpaper to your wishlist, but we're happy to see how much you love it!</p>
                </div>
            </div>
        </div>
    );
}

export default Modal;
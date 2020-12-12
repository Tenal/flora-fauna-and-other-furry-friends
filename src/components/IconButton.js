import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const IconButton = ({ buttonClass, fontIcon, fontTitle, fontClass, spanText, onClickHandler }) => {
    return (
        <button className={buttonClass} onClick={onClickHandler}>
            <FontAwesomeIcon icon={fontIcon} title={fontTitle} className={fontClass} />
            <span className="sr-only">{spanText}</span>
        </button>
    );
}

export default IconButton;
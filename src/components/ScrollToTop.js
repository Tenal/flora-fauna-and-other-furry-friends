import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ScrollToTop extends Component {
    constructor(props) {
        super(props);

        // top of page reference
        this.topOfPage = React.createRef();

        this.state = {
            isArrowDisplayed: false
        };
    }

    // invoked after the 'up arrow' button is rendered for the first time (note: this function was added based on information found online)
    componentDidMount() {
        const scrollComponent = this;
        document.addEventListener("scroll", () => {
            scrollComponent.arrowVisibility();
        });
    }

    // a function that displays the 'up arrow' button if the user scrolls down 400 pixels from the top of the page, and hides it if they are less than 400px down from the top of the page
    arrowVisibility = () => {
        if (window.pageYOffset > 400) {
            this.setState({
                isArrowDisplayed: true
            });
        } 
        else {
            this.setState({
                isArrowDisplayed: false
            });
        }
    }

    // a function that brings user to the top of the page if they click the 'up arrow' button
    scrollToTopOfPage = () => {
        window.scrollTo(0, this.topOfPage.offsetTop);
    }

    render() {
        return (
            <div className="scroll-to-top">
                {/* dynamically render the 'up arrow' button (ie: only display the arrow if the state of the arrow is true, set by the arrowVisibility function) */}
                { 
                    this.state.isArrowDisplayed &&

                    // when user clicks 'up arrow' button, call the scrollToTopOfPage function which automatically scrolls to the top of the page
                    <button className="arrow icon-btn" onClick={() => this.scrollToTopOfPage()}>
                        <FontAwesomeIcon icon="arrow-up" title="back to top" />
                        <span className="sr-only">An up arrow icon, click here to scroll to the top of the page.</span>
                    </button>
                }
            </div>
        );
    }
}

export default ScrollToTop;
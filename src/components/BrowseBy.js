const BrowseBy = (props) => {
    return (
        <div className="wrapper browse-buttons">
            <p>Feel free to browse by:</p>
            <div className="btn-container">
                {/* when user clicks 'all wallpapers', call the displayAllWallpapers function in App.js which displays all wallpapers */}
                <button onClick={props.displayAllWallpapers}>all wallpapers</button>
                {/* when user clicks on one of the below categories (ie: flora, fauna, or fluffy friends), call the displayCategoryWallpapers function in App.js which only displays wallpapers of a certain category */}
                <button onClick={() => { props.displayCategoryWallpapers('flora')}}>flora</button>
                <button onClick={() => { props.displayCategoryWallpapers('fauna') }}>fauna</button>
                <button onClick={() => { props.displayCategoryWallpapers('fluffy friends') }}>fluffy friends</button>
            </div>
        </div>
    );
}

export default BrowseBy;
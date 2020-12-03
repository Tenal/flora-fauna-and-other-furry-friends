const BrowseBy = (props) => {
    return (
        <aside className="browse-aside">
            <div className="browse-container">
                <p>Browse by:</p>
                <div className="browse-btns">
                    {/* when user clicks on one of the below categories (ie: all, flora, fauna, or fluffy friends), call the displayCategoryWallpapers function in App.js & pass in the desired category as an argument in order to display wallpapers of that category */}
                    <button onClick={() => {props.displayCategoryWallpapers('all')} }>all wallpapers</button>
                    <button onClick={() => {props.displayCategoryWallpapers('flora')}}>flora</button>
                    <button onClick={() => {props.displayCategoryWallpapers('fauna') }}>fauna</button>
                    <button onClick={() => {props.displayCategoryWallpapers('fluffy friends') }}>fluffy friends</button>
                </div>
            </div>
        </aside>
    );
}

export default BrowseBy;
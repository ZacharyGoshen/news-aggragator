'use strict';

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filterMenuOpen: false
        }
    }

    toggleFilterMenu() {
        if (this.state.filterMenuOpen) {
            document.getElementById('filterMenu').classList.add('hidden');
        } else {
            document.getElementById('filterMenu').classList.remove('hidden');
        }
        this.setState({
            filterMenuOpen: !this.state.filterMenuOpen
        });
    }

    render() {
        return (
            <div id="navBar">
                <div id="navBarLogo">News Aggregator</div>
                <div id="navBarButtons">
                    <div 
                        id="sortButton"
                        onClick={ () => this.props.sortByDate() }
                    >
                        Sort
                    </div>
                    <div 
                        id="filterButton"
                        onClick={ () => this.toggleFilterMenu() }
                    >
                        Filter
                    </div>
                </div>
                <div id="filterMenu" className="hidden">
                    <div className="filter-option">
                        <input 
                            checked={ this.props.filters['ABC'] }
                            onChange={ () => this.props.filterBySource('ABC') }
                            type="checkbox"
                        > 
                        </input>
                        <div>ABC</div>
                    </div>
                    <div className="filter-option">
                        <input  
                            checked={ this.props.filters['CBS'] }
                            onChange={ () => this.props.filterBySource('CBS') }
                            type="checkbox"
                        > 
                        </input>
                        <div>CBS</div>
                    </div>
                    <div className="filter-option">
                        <input  
                            checked={ this.props.filters['CNN'] }
                            onChange={ () => this.props.filterBySource('CNN') }
                            type="checkbox"
                        > 
                        </input>
                        <div>CNN</div>
                    </div>
                    <div className="filter-option">
                        <input  
                            checked={ this.props.filters['Fox'] }
                            onChange={ () => this.props.filterBySource('Fox') }
                            type="checkbox"
                        > 
                        </input>
                        <div>Fox</div>
                    </div>
                    <div className="filter-option">
                        <input  
                            checked={ this.props.filters['Huffington Post'] }
                            onChange={ () => this.props.filterBySource('Huffington Post') }
                            type="checkbox"
                        > 
                        </input>
                        <div>Huffington Post</div>
                    </div>
                    <div className="filter-option">
                        <input  
                            checked={ this.props.filters['LA Times'] }
                            onChange={ () => this.props.filterBySource('LA Times') }
                            type="checkbox"
                        > 
                        </input>
                        <div>LA Times</div>
                    </div>
                    <div className="filter-option">
                        <input  
                            checked={ this.props.filters['News Week'] }
                            onChange={ () => this.props.filterBySource('News Week') }
                            type="checkbox"
                        > 
                        </input>
                        <div>News Week</div>
                    </div>
                    <div className="filter-option">
                        <input  
                            checked={ this.props.filters['NPR'] }
                            onChange={ () => this.props.filterBySource('NPR') }
                            type="checkbox"
                        > 
                        </input>
                        <div>NPR</div>
                    </div>
                    <div className="filter-option">
                        <input  
                            checked={ this.props.filters['New York Times'] }
                            onChange={ () => this.props.filterBySource('New York Times') }
                            type="checkbox"
                        > 
                        </input>
                        <div>New York Times</div>
                    </div>
                    <div className="filter-option">
                        <input  
                            checked={ this.props.filters['Politico'] }
                            onChange={ () => this.props.filterBySource('Politico') }
                            type="checkbox"
                        > 
                        </input>
                        <div>Politico</div>
                    </div>
                </div>
            </div>
        );
    }
}
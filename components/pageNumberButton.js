'use strict';

class PageNumberButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let classNames = 'page-number-button pagination-button';
        if (this.props.isCurrentPage) {
            classNames += ' current-page';
        }

        return (
            <div 
                className={ classNames }
                onClick={ this.props.onClick }
            >
                { this.props.pageNumber + 1 }
            </div>
        );
    }
}
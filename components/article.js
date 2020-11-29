'use strict';

class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article: props.article
        }
    }

    render() {
        console.log(this.props.article);
        
        return (
            <div className="article">
                <p>{ this.props.article.title }</p>
                <p>{ this.props.article.publishedDate }</p>
                <img src={ this.props.article.thumbnailUrl }></img>
                <a href={ this.props.article.url }>{ this.props.article.url }</a>
            </div>
        );
    }
}
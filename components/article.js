'use strict';

class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article: props.article
        }
    }

    render() {
        return (
            <div 
                className="article-container" 
                onClick={ () => location.href = this.props.article.url }
            >
                <div className="article">
                    <div className="article-title">{ this.props.article.title }</div>
                    <div className="article-author">{ this.props.article.author }</div>
                    <div className="article-date">{ this.props.article.datePublished }</div>
                    <div className="article-thumbnail" >
                        <img src={ this.props.article.thumbnailUrl }></img>
                    </div>
                    <div className="article-description">{ this.props.article.description }</div>
                    <div className="article-source">{ this.props.article.source }</div>
                </div>
            </div>
        );
    }
}
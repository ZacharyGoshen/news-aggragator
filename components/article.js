'use strict';

class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article: props.article
        }
    }

    render() {
        const dateString = this.state.article.datePublished ? this.state.article.datePublished.toLocaleString() : null;
        return (
            <div 
                className="article-container" 
                onClick={ () => location.href = this.state.article.url }
            >
                <div className="article">
                    <div className="article-title">{ this.state.article.title }</div>
                    <div className="article-author">{ this.state.article.author }</div>
                    <div className="article-date">{ dateString }</div>
                    <div className="article-thumbnail" >
                        <img src={ this.state.article.thumbnailUrl }></img>
                    </div>
                    <div className="article-description">{ this.state.article.description }</div>
                    <div className="article-source">{ this.state.article.source }</div>
                </div>
            </div>
        );
    }
}
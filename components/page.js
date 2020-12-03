'use strict';

class Page extends React.Component {
    constructor(props) {
        super(props);
    }

    renderArticle(article) {
        return (
            <Article
                article={ article }
                key={ article.title } 
            >
            </Article>
        );
    }

    render() {
        const articleComponents = this.props.articles.map(article => this.renderArticle(article));

        return (
            <div className="page">
                <div className="articles">
                    { articleComponents }
                </div>
            </div>
        );
    }
}
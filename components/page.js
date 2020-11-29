class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: null,
            isLoaded: false
        }
    }

    parseNytArticle(article) {
        const thumbnailExists = article.media.length;
        const thumbnailUrl = thumbnailExists ? article.media[0]["media-metadata"][0].url : null;

        return {
            title: article.title,
            publishedDate: article.published_date,
            thumbnailUrl: thumbnailUrl,
            url: article.url
        }
    }

    componentDidMount() {
        fetch('https://api.nytimes.com/svc/mostpopular/v2/emailed/1.json?api-key=i1ARVGjJRKgBIBXtlFyC3Nw9UyGMC96p')
            .then(res => res.json())
            .then(
                (json) => {
                    this.setState({
                        articles: json.results,
                        isLoaded: true
                    })
                },
                (error) => {},
            )
    }

    renderArticle(article) {
        return (
            <Article
                article={ this.parseNytArticle(article) }
            >
            </Article>
        );
    }

    render() {
        const { articles, isLoaded } = this.state;
        if (!isLoaded) {
            return (
                <div className="page">
                    Loading
                </div>
            );
        } else {
            const articleComponents = articles.map(article => this.renderArticle(article));
            return (
                <div className="page">
                    { articleComponents }
                </div>
            );
        }

    }
}

ReactDOM.render(<Page />, document.getElementById('articlesContainer'));
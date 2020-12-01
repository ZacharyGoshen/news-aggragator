class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            isLoaded: false
        }
    }

    componentDidMount() {
        let promises = [];
        promises.push(fetchArticles(this, 'abc'));
        promises.push(fetchArticles(this, 'cbs'));
        promises.push(fetchArticles(this, 'cnn'));
        promises.push(fetchArticles(this, 'fox'));
        promises.push(fetchArticles(this, 'huffingtonPost'));
        promises.push(fetchArticles(this, 'laTimes'));
        promises.push(fetchArticles(this, 'newsWeek'));
        promises.push(fetchArticles(this, 'npr'));
        promises.push(fetchArticles(this, 'nyt'));
        promises.push(fetchArticles(this, 'politico'));

        Promise.all(promises).then(() => this.setState({ isLoaded: true }));
    }

    renderArticle(article) {
        return (
            <Article
                article={ article }
            >
            </Article>
        );
    }

    render() {
        const { articles, isLoaded } = this.state;
        if (!this.state.isLoaded) {
            return (
                <div className="page">
                    Loading...
                </div>
            );
        } else {
            // articles.sort((a, b) => (a.datePublished < b.datePublished) ? 1 : -1);
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
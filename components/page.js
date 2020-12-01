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
        // promises.push(fetchArticles(this, 'news'));
        // promises.push(fetchArticles(this, 'bing')); // 1000 calls per month
        // promises.push(fetchArticles(this, 'guardian'));
        // promises.push(fetchArticles(this, 'nyt'));
        promises.push(fetchArticles(this, 'fox'));

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
            articles.sort((a, b) => (a.datePublished < b.datePublished) ? 1 : -1);
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
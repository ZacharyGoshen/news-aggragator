class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            isLoaded: false,
            pageNumber: 0
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
                key={ article.title } 
            >
            </Article>
        );
    }

    renderPageNumberButton(pageNumber) {
        return (
            <PageNumberButton 
                isCurrentPage={ this.state.pageNumber == pageNumber }
                key={ pageNumber }
                onClick={ () => this.setState({ pageNumber: pageNumber })}
                pageNumber={ pageNumber }
            >
            </PageNumberButton>
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

            const articlesPerPage = 48;
            const numberOfPages = Math.ceil(articles.length / articlesPerPage);
            const indexStart = this.state.pageNumber * articlesPerPage;

            let indexEnd = (this.state.pageNumber + 1) * articlesPerPage;
            if (indexEnd > articles.length) {
                indexEnd = articles.length - 1;
            }

            let articleComponents = [];
            for (let i = indexStart; i < indexEnd; i++) {
                let article = articles[i];
                articleComponents.push(this.renderArticle(article));
            }

            let pageNumberButtonComponents = [];
            for (let i = 0; i < numberOfPages; i++) {
                pageNumberButtonComponents.push(this.renderPageNumberButton(i));
            }

            return (
                <div className="page">
                    <div className="articles">
                        { articleComponents }
                    </div>
                    <div className="pagination-bar">
                        <div 
                            className="pagination-button previous-page-button"
                            onClick={ 
                                () => {
                                    if (this.state.pageNumber != 0) {
                                        this.setState({ pageNumber: this.state.pageNumber -= 1 });
                                    }
                                } 
                            }
                        >
                            Previous
                        </div>
                        { pageNumberButtonComponents }
                        <div 
                            className="pagination-button next-page-button"
                            onClick={ 
                                () => {
                                    if (this.state.pageNumber != numberOfPages - 1) {
                                        this.setState({ pageNumber: this.state.pageNumber += 1 });
                                    }
                                } 
                            }
                        >
                            Next
                        </div>
                    </div>
                </div>
            );
        }

    }
}

ReactDOM.render(<Page />, document.getElementById('articlesContainer'));
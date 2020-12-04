'use strict';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            filters: {
                'ABC': true,
                'CBS': true,
                'CNN': true,
                'Fox': true,
                'Huffington Post': true,
                'LA Times': true,
                'News Week': true,
                'NPR': true,
                'New York Times': true,
                'Politico': true
            },
            isLoaded: false,
            newestToOldest: true,
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

        Promise.all(promises).then(() => {
            this.setState({ 
                articles: this.state.articles.sort((a, b) => (a.datePublished < b.datePublished) ? 1 : -1),
                isLoaded: true 
            });
        });
    }

    filterBySource(source) {
        let filters = this.state.filters;
        filters[source] = !filters[source];
        this.setState({ filters: filters });
    }

    sortByDate() {
        if (this.state.newestToOldest) {
            this.setState({
                articles: this.state.articles.sort((a, b) => (a.datePublished > b.datePublished) ? 1 : -1),
                newestToOldest: false
            })
        } else {
            this.setState({
                articles: this.state.articles.sort((a, b) => (a.datePublished < b.datePublished) ? 1 : -1),
                newestToOldest: true
            })
        }
    }

    changePage(pageNumber) {
        const articlesPerPage = 48;
        const numberOfPages = Math.ceil(this.state.articles.length / articlesPerPage);

        if (pageNumber >= 0 && pageNumber < numberOfPages) {
            this.setState({ pageNumber: pageNumber });
        }
    }

    renderPageNumberButton(pageNumber) {
        return (
            <PageNumberButton 
                isCurrentPage={ this.state.pageNumber == pageNumber }
                key={ pageNumber }
                onClick={ () => this.changePage(pageNumber) }
                pageNumber={ pageNumber }
            >
            </PageNumberButton>
        );
    }

    render() {
        const isLoaded = this.state.isLoaded;
        if (!this.state.isLoaded) {
            return (
                <div id="app">
                    <NavBar
                        filters={ this.state.filters }
                    ></NavBar>
                    <div id="loadingList">
                        <div id="loadingAbc">Loading ABC...</div>
                        <div id="loadingCbs">Loading CBS...</div>
                        <div id="loadingCnn">Loading CNN...</div>
                        <div id="loadingFox">Loading Fox...</div>
                        <div id="loadingHuffingtonPost">Loading Hufftington Post...</div>
                        <div id="loadingLaTimes">Loading LA Times...</div>
                        <div id="loadingNewsWeek">Loading News Week...</div>
                        <div id="loadingNpr">Loading NPR...</div>
                        <div id="loadingNyt">Loading New York Times...</div>
                        <div id="loadingPolitico">Loading Politico...</div>
                    </div>
                </div>
            );
        } else {
            let articles = [];
            for (let i = 0; i < this.state.articles.length; i++) {
                let article = this.state.articles[i];
                if (this.state.filters[article.source]) {
                    articles.push(article);
                }
            }

            const articlesPerPage = 48;
            const numberOfPages = Math.ceil(articles.length / articlesPerPage);
            const indexStart = this.state.pageNumber * articlesPerPage;

            let indexEnd = (this.state.pageNumber + 1) * articlesPerPage;
            if (indexEnd > articles.length) {
                indexEnd = articles.length - 1;
            }

            let articlesOnPage = [];
            for (let i = indexStart; i < indexEnd; i++) {
                articlesOnPage.push(articles[i]);
            }

            let pageNumberButtonComponents = [];
            for (let i = 0; i < numberOfPages; i++) {
                pageNumberButtonComponents.push(this.renderPageNumberButton(i));
            }

            return (
                <div id="app">
                    <NavBar
                        filters={ this.state.filters }
                        filterBySource={ source => this.filterBySource(source) }
                        sortByDate={ () => this.sortByDate() }
                    >
                    </NavBar>
                    <Page
                        articles={ articlesOnPage }
                    >
                    </Page>
                    <div className="pagination-bar">
                        <div 
                            className="pagination-button previous-page-button"
                            onClick={ () => this.changePage(this.state.pageNumber - 1) }
                        >
                            Previous
                        </div>
                        { pageNumberButtonComponents }
                        <div 
                            className="pagination-button next-page-button"
                            onClick={ () => this.changePage(this.state.pageNumber + 1) }
                        >
                            Next
                        </div>
                    </div>
                </div>
            );
        }
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
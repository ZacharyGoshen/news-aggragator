class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            isLoaded: {
                bing: false,
                guardian: false,
                nyt: false
            }
        }
    }

    fetchArticles(endpoint, parsingFunction, source) {
        fetch(endpoint)
        .then(res => res.json())
        .then(
            (json) => {
                let articles = this.state.articles.concat(parsingFunction(json));
                let isLoaded = this.state.isLoaded[source] = true;
                this.setState({
                    articles: articles,
                    loadedBoolean: isLoaded
                });
            },
            (error) => {},
        )
    }

    parseBingJson(json) {
        let articles = [];
        json.value.forEach(article => {
            const thumbnailExists = article.image;
            const thumbnailUrl = thumbnailExists ? article.image.thumbnail.contentUrl : null;

            articles.push({
                author: null,
                description: article.description,
                datePublished: article.datePublished.slice(0, 10),
                source: article.provider[0].name,
                thumbnailUrl: thumbnailUrl,
                title: article.name,
                url: article.url
            });
        });

        return articles;
    }

    parseGuardianJson(json) {
        console.log(json);

        let articles = [];
        json.response.results.forEach(article => {
            articles.push({
                author: null,
                description: null,
                datePublished: article.webPublicationDate.slice(0, 10),
                source: 'The Guardian',
                thumbnailUrl: null,
                title: article.webTitle,
                url: article.webUrl
            });
        });

        console.log(articles);

        return articles;
    }

    parseNytJson(json) {
        let articles = [];
        json.results.forEach(article => {
            const author = article.byline.slice(3);
            const thumbnailExists = article.media.length;
            const thumbnailUrl = thumbnailExists ? article.media[0]["media-metadata"][2].url : null;
    
            articles.push({
                author: author,
                description: article.abstract,
                datePublished: article.published_date,
                source: 'New York Times',
                thumbnailUrl: thumbnailUrl,
                title: article.title,
                url: article.url
            });
        });

        return articles;
    }

    componentDidMount() {
        // this.fetchArticles('https://api.bing.microsoft.com/v7.0/news?subscription-key=c214921f95324775a0c1fe7cc61ae74b', this.parseBingJson, 'bing'); // 1000 calls per month
        this.fetchArticles('https://content.guardianapis.com/search?api-key=7f46d694-03c3-4369-933b-31ade0ab34ee', this.parseGuardianJson, 'guardian');
        this.fetchArticles('https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=i1ARVGjJRKgBIBXtlFyC3Nw9UyGMC96p', this.parseNytJson, 'nyt');
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
        if (/* !isLoaded.bing || */ !isLoaded.guardian || !isLoaded.nyt) {
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
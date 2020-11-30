var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Page = function (_React$Component) {
    _inherits(Page, _React$Component);

    function Page(props) {
        _classCallCheck(this, Page);

        var _this = _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this, props));

        _this.state = {
            articles: [],
            isLoaded: {
                bing: false,
                guardian: false,
                nyt: false
            }
        };
        return _this;
    }

    _createClass(Page, [{
        key: 'fetchArticles',
        value: function fetchArticles(endpoint, parsingFunction, source) {
            var _this2 = this;

            fetch(endpoint).then(function (res) {
                return res.json();
            }).then(function (json) {
                var articles = _this2.state.articles.concat(parsingFunction(json));
                var isLoaded = _this2.state.isLoaded[source] = true;
                _this2.setState({
                    articles: articles,
                    loadedBoolean: isLoaded
                });
            }, function (error) {});
        }
    }, {
        key: 'parseBingJson',
        value: function parseBingJson(json) {
            var articles = [];
            json.value.forEach(function (article) {
                var thumbnailExists = article.image;
                var thumbnailUrl = thumbnailExists ? article.image.thumbnail.contentUrl : null;

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
    }, {
        key: 'parseGuardianJson',
        value: function parseGuardianJson(json) {
            console.log(json);

            var articles = [];
            json.response.results.forEach(function (article) {
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
    }, {
        key: 'parseNytJson',
        value: function parseNytJson(json) {
            var articles = [];
            json.results.forEach(function (article) {
                var author = article.byline.slice(3);
                var thumbnailExists = article.media.length;
                var thumbnailUrl = thumbnailExists ? article.media[0]["media-metadata"][2].url : null;

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
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            // this.fetchArticles('https://api.bing.microsoft.com/v7.0/news?subscription-key=c214921f95324775a0c1fe7cc61ae74b', this.parseBingJson, 'bing'); // 1000 calls per month
            this.fetchArticles('https://content.guardianapis.com/search?api-key=7f46d694-03c3-4369-933b-31ade0ab34ee', this.parseGuardianJson, 'guardian');
            this.fetchArticles('https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=i1ARVGjJRKgBIBXtlFyC3Nw9UyGMC96p', this.parseNytJson, 'nyt');
        }
    }, {
        key: 'renderArticle',
        value: function renderArticle(article) {
            return React.createElement(Article, {
                article: article
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _state = this.state,
                articles = _state.articles,
                isLoaded = _state.isLoaded;

            if ( /* !isLoaded.bing || */!isLoaded.guardian || !isLoaded.nyt) {
                return React.createElement(
                    'div',
                    { className: 'page' },
                    'Loading...'
                );
            } else {
                articles.sort(function (a, b) {
                    return a.datePublished < b.datePublished ? 1 : -1;
                });
                var articleComponents = articles.map(function (article) {
                    return _this3.renderArticle(article);
                });
                return React.createElement(
                    'div',
                    { className: 'page' },
                    articleComponents
                );
            }
        }
    }]);

    return Page;
}(React.Component);

ReactDOM.render(React.createElement(Page, null), document.getElementById('articlesContainer'));
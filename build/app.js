'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = {
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
        };
        return _this;
    }

    _createClass(App, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var promises = [];
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

            Promise.all(promises).then(function () {
                _this2.setState({
                    articles: _this2.state.articles.sort(function (a, b) {
                        return a.datePublished < b.datePublished ? 1 : -1;
                    }),
                    isLoaded: true
                });
            });
        }
    }, {
        key: 'filterBySource',
        value: function filterBySource(source) {
            var filters = this.state.filters;
            filters[source] = !filters[source];
            this.setState({ filters: filters });
        }
    }, {
        key: 'sortByDate',
        value: function sortByDate() {
            if (this.state.newestToOldest) {
                this.setState({
                    articles: this.state.articles.sort(function (a, b) {
                        return a.datePublished > b.datePublished ? 1 : -1;
                    }),
                    newestToOldest: false
                });
            } else {
                this.setState({
                    articles: this.state.articles.sort(function (a, b) {
                        return a.datePublished < b.datePublished ? 1 : -1;
                    }),
                    newestToOldest: true
                });
            }
        }
    }, {
        key: 'changePage',
        value: function changePage(pageNumber) {
            var articlesPerPage = 48;
            var numberOfPages = Math.ceil(this.state.articles.length / articlesPerPage);

            if (pageNumber >= 0 && pageNumber < numberOfPages) {
                this.setState({ pageNumber: pageNumber });
            }
        }
    }, {
        key: 'renderPageNumberButton',
        value: function renderPageNumberButton(pageNumber) {
            var _this3 = this;

            return React.createElement(PageNumberButton, {
                isCurrentPage: this.state.pageNumber == pageNumber,
                key: pageNumber,
                onClick: function onClick() {
                    return _this3.changePage(pageNumber);
                },
                pageNumber: pageNumber
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var isLoaded = this.state.isLoaded;
            if (!this.state.isLoaded) {
                return React.createElement(
                    'div',
                    { id: 'app' },
                    React.createElement(NavBar, {
                        filters: this.state.filters
                    }),
                    React.createElement(
                        'div',
                        null,
                        'Loading...'
                    )
                );
            } else {
                var articles = [];
                for (var i = 0; i < this.state.articles.length; i++) {
                    var article = this.state.articles[i];
                    if (this.state.filters[article.source]) {
                        articles.push(article);
                    }
                }

                var articlesPerPage = 48;
                var numberOfPages = Math.ceil(articles.length / articlesPerPage);
                var indexStart = this.state.pageNumber * articlesPerPage;

                var indexEnd = (this.state.pageNumber + 1) * articlesPerPage;
                if (indexEnd > articles.length) {
                    indexEnd = articles.length - 1;
                }

                var articlesOnPage = [];
                for (var _i = indexStart; _i < indexEnd; _i++) {
                    articlesOnPage.push(articles[_i]);
                }

                var pageNumberButtonComponents = [];
                for (var _i2 = 0; _i2 < numberOfPages; _i2++) {
                    pageNumberButtonComponents.push(this.renderPageNumberButton(_i2));
                }

                return React.createElement(
                    'div',
                    { id: 'app' },
                    React.createElement(NavBar, {
                        filters: this.state.filters,
                        filterBySource: function filterBySource(source) {
                            return _this4.filterBySource(source);
                        },
                        sortByDate: function sortByDate() {
                            return _this4.sortByDate();
                        }
                    }),
                    React.createElement(Page, {
                        articles: articlesOnPage
                    }),
                    React.createElement(
                        'div',
                        { className: 'pagination-bar' },
                        React.createElement(
                            'div',
                            {
                                className: 'pagination-button previous-page-button',
                                onClick: function onClick() {
                                    return _this4.changePage(_this4.state.pageNumber - 1);
                                }
                            },
                            'Previous'
                        ),
                        pageNumberButtonComponents,
                        React.createElement(
                            'div',
                            {
                                className: 'pagination-button next-page-button',
                                onClick: function onClick() {
                                    return _this4.changePage(_this4.state.pageNumber + 1);
                                }
                            },
                            'Next'
                        )
                    )
                );
            }
        }
    }]);

    return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
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
            articles: null,
            isLoaded: false
        };
        return _this;
    }

    _createClass(Page, [{
        key: "parseNytArticle",
        value: function parseNytArticle(article) {
            var thumbnailExists = article.media.length;
            var thumbnailUrl = thumbnailExists ? article.media[0]["media-metadata"][0].url : null;

            return {
                title: article.title,
                publishedDate: article.published_date,
                thumbnailUrl: thumbnailUrl,
                url: article.url
            };
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            fetch('https://api.nytimes.com/svc/mostpopular/v2/emailed/1.json?api-key=i1ARVGjJRKgBIBXtlFyC3Nw9UyGMC96p').then(function (res) {
                return res.json();
            }).then(function (json) {
                _this2.setState({
                    articles: json.results,
                    isLoaded: true
                });
            }, function (error) {});
        }
    }, {
        key: "renderArticle",
        value: function renderArticle(article) {
            return React.createElement(Article, {
                article: this.parseNytArticle(article)
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var _state = this.state,
                articles = _state.articles,
                isLoaded = _state.isLoaded;

            if (!isLoaded) {
                return React.createElement(
                    "div",
                    { className: "page" },
                    "Loading"
                );
            } else {
                var articleComponents = articles.map(function (article) {
                    return _this3.renderArticle(article);
                });
                return React.createElement(
                    "div",
                    { className: "page" },
                    articleComponents
                );
            }
        }
    }]);

    return Page;
}(React.Component);

ReactDOM.render(React.createElement(Page, null), document.getElementById('articlesContainer'));
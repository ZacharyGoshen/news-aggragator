'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Article = function (_React$Component) {
    _inherits(Article, _React$Component);

    function Article(props) {
        _classCallCheck(this, Article);

        var _this = _possibleConstructorReturn(this, (Article.__proto__ || Object.getPrototypeOf(Article)).call(this, props));

        _this.state = {
            article: props.article
        };
        return _this;
    }

    _createClass(Article, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "div",
                {
                    className: "article-container",
                    onClick: function onClick() {
                        return location.href = _this2.state.article.url;
                    }
                },
                React.createElement(
                    "div",
                    { className: "article" },
                    React.createElement(
                        "div",
                        { className: "article-title" },
                        this.state.article.title
                    ),
                    React.createElement(
                        "div",
                        { className: "article-author" },
                        this.state.article.author
                    ),
                    React.createElement(
                        "div",
                        { className: "article-date" },
                        this.state.article.datePublished.toLocaleString()
                    ),
                    React.createElement(
                        "div",
                        { className: "article-thumbnail" },
                        React.createElement("img", { src: this.state.article.thumbnailUrl })
                    ),
                    React.createElement(
                        "div",
                        { className: "article-description" },
                        this.state.article.description
                    ),
                    React.createElement(
                        "div",
                        { className: "article-source" },
                        this.state.article.source
                    )
                )
            );
        }
    }]);

    return Article;
}(React.Component);
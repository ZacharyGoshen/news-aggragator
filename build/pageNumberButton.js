'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PageNumberButton = function (_React$Component) {
    _inherits(PageNumberButton, _React$Component);

    function PageNumberButton(props) {
        _classCallCheck(this, PageNumberButton);

        return _possibleConstructorReturn(this, (PageNumberButton.__proto__ || Object.getPrototypeOf(PageNumberButton)).call(this, props));
    }

    _createClass(PageNumberButton, [{
        key: 'render',
        value: function render() {
            var classNames = 'page-number-button pagination-button';
            if (this.props.isCurrentPage) {
                classNames += ' current-page';
            }

            return React.createElement(
                'div',
                {
                    className: classNames,
                    onClick: this.props.onClick
                },
                this.props.pageNumber + 1
            );
        }
    }]);

    return PageNumberButton;
}(React.Component);
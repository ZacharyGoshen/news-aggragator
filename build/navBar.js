'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavBar = function (_React$Component) {
    _inherits(NavBar, _React$Component);

    function NavBar(props) {
        _classCallCheck(this, NavBar);

        var _this = _possibleConstructorReturn(this, (NavBar.__proto__ || Object.getPrototypeOf(NavBar)).call(this, props));

        _this.state = {
            filterMenuOpen: false
        };
        return _this;
    }

    _createClass(NavBar, [{
        key: 'toggleFilterMenu',
        value: function toggleFilterMenu() {
            if (this.state.filterMenuOpen) {
                document.getElementById('filterMenu').classList.add('hidden');
            } else {
                document.getElementById('filterMenu').classList.remove('hidden');
            }
            this.setState({
                filterMenuOpen: !this.state.filterMenuOpen
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                'div',
                { id: 'navBar' },
                React.createElement(
                    'div',
                    { id: 'navBarLogo' },
                    'News Aggregator'
                ),
                React.createElement(
                    'div',
                    { id: 'navBarButtons' },
                    React.createElement(
                        'div',
                        {
                            id: 'sortButton',
                            onClick: function onClick() {
                                return _this2.props.sortByDate();
                            }
                        },
                        'Sort'
                    ),
                    React.createElement(
                        'div',
                        {
                            id: 'filterButton',
                            onClick: function onClick() {
                                return _this2.toggleFilterMenu();
                            }
                        },
                        'Filter'
                    )
                ),
                React.createElement(
                    'div',
                    { id: 'filterMenu', className: 'hidden' },
                    React.createElement(
                        'div',
                        { className: 'filter-option' },
                        React.createElement('input', {
                            checked: this.props.filters['ABC'],
                            onChange: function onChange() {
                                return _this2.props.filterBySource('ABC');
                            },
                            type: 'checkbox'
                        }),
                        React.createElement(
                            'div',
                            null,
                            'ABC'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'filter-option' },
                        React.createElement('input', {
                            checked: this.props.filters['CBS'],
                            onChange: function onChange() {
                                return _this2.props.filterBySource('CBS');
                            },
                            type: 'checkbox'
                        }),
                        React.createElement(
                            'div',
                            null,
                            'CBS'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'filter-option' },
                        React.createElement('input', {
                            checked: this.props.filters['CNN'],
                            onChange: function onChange() {
                                return _this2.props.filterBySource('CNN');
                            },
                            type: 'checkbox'
                        }),
                        React.createElement(
                            'div',
                            null,
                            'CNN'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'filter-option' },
                        React.createElement('input', {
                            checked: this.props.filters['Fox'],
                            onChange: function onChange() {
                                return _this2.props.filterBySource('Fox');
                            },
                            type: 'checkbox'
                        }),
                        React.createElement(
                            'div',
                            null,
                            'Fox'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'filter-option' },
                        React.createElement('input', {
                            checked: this.props.filters['Huffington Post'],
                            onChange: function onChange() {
                                return _this2.props.filterBySource('Huffington Post');
                            },
                            type: 'checkbox'
                        }),
                        React.createElement(
                            'div',
                            null,
                            'Huffington Post'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'filter-option' },
                        React.createElement('input', {
                            checked: this.props.filters['LA Times'],
                            onChange: function onChange() {
                                return _this2.props.filterBySource('LA Times');
                            },
                            type: 'checkbox'
                        }),
                        React.createElement(
                            'div',
                            null,
                            'LA Times'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'filter-option' },
                        React.createElement('input', {
                            checked: this.props.filters['News Week'],
                            onChange: function onChange() {
                                return _this2.props.filterBySource('News Week');
                            },
                            type: 'checkbox'
                        }),
                        React.createElement(
                            'div',
                            null,
                            'News Week'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'filter-option' },
                        React.createElement('input', {
                            checked: this.props.filters['NPR'],
                            onChange: function onChange() {
                                return _this2.props.filterBySource('NPR');
                            },
                            type: 'checkbox'
                        }),
                        React.createElement(
                            'div',
                            null,
                            'NPR'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'filter-option' },
                        React.createElement('input', {
                            checked: this.props.filters['New York Times'],
                            onChange: function onChange() {
                                return _this2.props.filterBySource('New York Times');
                            },
                            type: 'checkbox'
                        }),
                        React.createElement(
                            'div',
                            null,
                            'New York Times'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'filter-option' },
                        React.createElement('input', {
                            checked: this.props.filters['Politico'],
                            onChange: function onChange() {
                                return _this2.props.filterBySource('Politico');
                            },
                            type: 'checkbox'
                        }),
                        React.createElement(
                            'div',
                            null,
                            'Politico'
                        )
                    )
                )
            );
        }
    }]);

    return NavBar;
}(React.Component);
const apiData = {
    cnn: {
        parseFunction: parseCnnXml,
        url: 'http://rss.cnn.com/rss/cnn_topstories.rss'
    },
    fox: {
        parseFunction: parseFoxXml,
        url: 'http://feeds.foxnews.com/foxnews/latest'
    },
    huffingtonPost: {
        parseFunction: parseHuffingtonPostXml,
        url: 'https://www.huffpost.com/section/front-page/feed?x=1'
    },
    npr: {
        parseFunction: parseNprXml,
        url: 'http://www.npr.org/rss/rss.php?id=1001'
    },
    nyt: {
        parseFunction: parseNytXml,
        url: 'http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml'
    },
    politico: {
        parseFunction: parsePoliticoXml,
        url: 'http://www.politico.com/rss/politicopicks.xml'
    },
};

function fetchArticles(page, source) {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const { parseFunction, url } = apiData[source];
    return fetch(proxy + url)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(xml => {

            console.log(xml);

            page.setState({
                articles: page.state.articles.concat(parseFunction(xml))
            })
            console.log(source + ' loaded');
        })
        .catch((error) => console.log(error));
}

function parseCnnXml(xml) {
    let articles = [];
    xml.querySelectorAll('item').forEach(item => {
        const hasDatePublished = item.querySelector('pubDate');
        const datePublished = hasDatePublished ? new Date(item.querySelector('pubDate').innerHTML).toLocaleString() : null;

        const hasDescription = item.querySelector('description').innerHTML.split('&lt')[0].length;
        const description = hasDescription ? item.querySelector('description').innerHTML.split('&lt')[0] : null;

        const hasThumbnail = hasDatePublished && findElementWithNameSpace(item, 'media:content');
        const thumbnailUrl = hasThumbnail ? findElementWithNameSpace(item, 'media:content').getAttribute('url') : null;

        if (hasDescription) {
            articles.push({
                author: null,
                description: description,
                datePublished: datePublished,
                source: 'CNN',
                thumbnailUrl: thumbnailUrl,
                title: item.querySelector('title').innerHTML.slice(9, -3),
                url: item.querySelector('link').innerHTML,
            });
        }
    });

    return articles;
}

function parseFoxXml(xml) {
    let articles = [];
    xml.querySelectorAll('item').forEach(item => {
        articles.push({
            author: findElementWithNameSpace(item, 'dc:creator').innerHTML,
            description: item.querySelector('description').innerHTML,
            datePublished: new Date(item.querySelector('pubDate').innerHTML).toLocaleString(),
            source: 'Fox News',
            thumbnailUrl: findElementWithNameSpace(item, 'media:content').getAttribute('url'),
            title: item.querySelector('title').innerHTML,
            url: item.querySelector('link').innerHTML,
        });
    });

    return articles;
}

function parseHuffingtonPostXml(xml) {
    let articles = [];
    xml.querySelectorAll('item').forEach(item => {
        articles.push({
            author: null,
            description: item.querySelector('description').innerHTML.slice(10, -4),
            datePublished: new Date(item.querySelector('pubDate').innerHTML).toLocaleString(),
            source: 'Huffington Post',
            thumbnailUrl: item.querySelector('enclosure').getAttribute('url'),
            title: item.querySelector('title').innerHTML.slice(10, -4),
            url: item.querySelector('link').innerHTML,
        });
    });

    return articles;
}

function parseNprXml(xml) {
    let articles = [];
    xml.querySelectorAll('item').forEach(item => {
        articles.push({
            author: item.children[item.children.length - 1].innerHTML,
            description: item.querySelector('description').innerHTML,
            datePublished: new Date(item.querySelector('pubDate').innerHTML).toLocaleString(),
            source: 'NPR',
            thumbnailUrl: findElementWithNameSpace(item, 'content:encoded').innerHTML.slice(19, -4).split('\'')[0],
            title: item.querySelector('title').innerHTML,
            url: item.querySelector('link').innerHTML,
        });
    });

    return articles;
}

function parseNytXml(xml) {
    let articles = [];
    xml.querySelectorAll('item').forEach(item => {
        const hasAuthor = findElementWithNameSpace(item, 'dc:creator');
        const author = hasAuthor ? findElementWithNameSpace(item, 'dc:creator').innerHTML : null;

        const hasThumbnail = findElementWithNameSpace(item, 'media:content');
        const thumbnailUrl = hasThumbnail ? findElementWithNameSpace(item, 'media:content').getAttribute('url') : null;

        articles.push({
            author: author,
            description: item.querySelector('description').innerHTML,
            datePublished: new Date(item.querySelector('pubDate').innerHTML).toLocaleString(),
            source: 'New York Times',
            thumbnailUrl: thumbnailUrl,
            title: item.querySelector('title').innerHTML,
            url: item.querySelector('link').innerHTML,
        });
    });

    return articles;
}

function parsePoliticoXml(xml) {
    let articles = [];
    xml.querySelectorAll('item').forEach(item => {
        const hasAuthor = findElementWithNameSpace(item, 'dc:creator');
        const author = hasAuthor ? findElementWithNameSpace(item, 'dc:creator').innerHTML : null;

        const hasDatePublished = item.querySelector('pubDate');
        const datePublished = hasDatePublished ? new Date(item.querySelector('pubDate').innerHTML).toLocaleString() : null;

        if (hasDatePublished) {
            articles.push({
                author: author,
                description: item.querySelector('description').innerHTML,
                datePublished: datePublished,
                source: 'Politico',
                thumbnailUrl: findElementWithNameSpace(item, 'media:content').getAttribute('url'),
                title: item.querySelector('title').innerHTML,
                url: item.querySelector('link').innerHTML,
            });
        }
    });

    return articles;
}

function findElementWithNameSpace(item, name) {
    for (let i = 0; i < item.children.length; i++) {
        let child = item.children[i];
        if (child.tagName == name) {
            return child;
        } else if (child.children.length) {
            const childFound = findElementWithNameSpace(child, name);
            if (childFound) {
                return childFound;
            }
        }
    }
    return null;
}
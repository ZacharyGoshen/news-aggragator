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
    nyt: {
        parseFunction: parseNytXml,
        url: 'http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml'
    }
};

function fetchArticles(page, source) {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const { parseFunction, url } = apiData[source];
    return fetch(proxy + url)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(xml => {
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
        const datePublished = hasDatePublished ? new Date(item.querySelector('pubDate').innerHTML).toLocaleString() : "Not a real article";

        const hasDescription = item.querySelector('description').innerHTML.split('&lt')[0].length;
        const description = hasDescription ? item.querySelector('description').innerHTML.split('&lt')[0] : null;

        const hasThumbnail = hasDatePublished && (item.querySelector('pubDate').nextElementSibling.tagName == 'media:group');
        const thumbnailUrl = hasThumbnail ? item.querySelector('pubDate').nextElementSibling.children[0].getAttribute('url') : null;

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
        const hasAuthor = item.querySelector('description').nextElementSibling.tagName == 'dc:creator'
        const author = hasAuthor ? item.querySelector('description').nextElementSibling.innerHTML : null;

        articles.push({
            author: author,
            description: item.querySelector('description').innerHTML,
            datePublished: new Date(item.querySelector('pubDate').innerHTML).toLocaleString(),
            source: 'Fox News',
            thumbnailUrl: item.querySelector('link').nextElementSibling.children[0].getAttribute('url'),
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

function parseNytXml(xml) {
    let articles = [];
    xml.querySelectorAll('item').forEach(item => {
        const hasAuthor = item.querySelector('description').nextElementSibling.tagName == 'dc:creator'
        const author = hasAuthor ? item.querySelector('description').nextElementSibling.innerHTML : null;

        const hasThumbnail = item.children[item.children.length - 3].tagName == 'media:content';
        const thumbnailUrl = hasThumbnail ? item.children[item.children.length - 3].getAttribute('url') : null;

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
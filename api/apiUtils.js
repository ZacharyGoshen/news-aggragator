const apiData = {
    fox: {
        url: 'http://feeds.foxnews.com/foxnews/latest'
    }
    // bing: {
    //     apiKey: 'subscription-key=c214921f95324775a0c1fe7cc61ae74b',
    //     parsingFunction: parseBingJson,
    //     url: 'https://api.bing.microsoft.com/v7.0/news'
    // },
    // guardian: {
    //     apiKey: 'api-key=7f46d694-03c3-4369-933b-31ade0ab34ee',
    //     parsingFunction: parseGuardianJson,
    //     url: 'https://content.guardianapis.com/search'
    // },
    // news: {
    //     apiKey: 'apiKey=41d8a37fbb9742ffaa0e71780918f4bb',
    //     paringFunction: parseNewsApiJson,
    //     url: 'https://cors-anywhere.herokuapp.com/http://newsapi.org/v2/top-headlines?country=us&'
    // },
    // nyt: {
    //     apiKey: 'api-key=i1ARVGjJRKgBIBXtlFyC3Nw9UyGMC96p',
    //     parsingFunction: parseNytJson,
    //     url: 'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json'
    // }
};

// function fetchArticles(page, source) {
//     const { apiKey, parsingFunction, url } = apiData[source];
//     return fetch(url + '?' + apiKey)
//         .then(result => result.json())
//         .then(
//             (json) => {
//                 let articles = page.state.articles.concat(parsingFunction(json));
//                 page.setState({
//                     articles: articles
//                 });
//             },
//             (error) => {
//             },
//         )
// }

function fetchArticles(page, source) {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const { url } = apiData[source];
    return fetch(proxy + url)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(xml => {
            page.setState({
                articles: parseFoxXml(xml)
            })
        });
}

function parseFoxXml(xml) {
    let articles = [];
    xml.querySelectorAll('item').forEach(item => {
        const hasAuthor = item.querySelector('description').nextElementSibling.tagName == 'dc:creator'
        const author = hasAuthor ? item.querySelector('description').nextElementSibling.innerHTML : null;

        articles.push({
            author: author,
            description: item.querySelector('description').innerHTML,
            datePublished: item.querySelector('pubDate').innerHTML,
            source: 'Fox News',
            thumbnailUrl: item.querySelector('link').nextElementSibling.children[0].getAttribute('url'),
            title: item.querySelector('title').innerHTML,
            url: item.querySelector('link').innerHTML,
        });
    });
    return articles;
}

// function parseBingJson(json) {
//     let articles = [];
//     json.value.forEach(article => {
//         const thumbnailExists = article.image;
//         const thumbnailUrl = thumbnailExists ? article.image.thumbnail.contentUrl : null;

//         articles.push({
//             author: null,
//             description: article.description,
//             datePublished: article.datePublished.slice(0, 10),
//             source: article.provider[0].name,
//             thumbnailUrl: thumbnailUrl,
//             title: article.name,
//             url: article.url
//         });
//     });

//     return articles;
// }

// function parseGuardianJson(json) {
//     let articles = [];
//     json.response.results.forEach(article => {
//         articles.push({
//             author: null,
//             description: null,
//             datePublished: article.webPublicationDate.slice(0, 10),
//             source: 'The Guardian',
//             thumbnailUrl: null,
//             title: article.webTitle,
//             url: article.webUrl
//         });
//     });

//     console.log(articles);

//     return articles;
// }

// function parseNewsApiJson(json) {
//     console.log(json);

//     let articles = [];
//     return articles;
// }

function parseNytJson(json) {
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
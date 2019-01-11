const BASE_URL = 'https://hacker-news.firebaseio.com/v0';
let NEWS_COUNT_START = 0;
let NEWS_COUNT_STOP = 20;

function timeAgo(date) {
    let seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);
  
    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}

async function getAllNews() {
    try {
        let response = await fetch(`${BASE_URL}/topstories.json`);
        let data = await response.json();
        result = data.slice(NEWS_COUNT_START, NEWS_COUNT_STOP);
        
        result.forEach((element) => {
            getSingleNews(element);
        });
        return true;
    } catch (error) {
        document.querySelector('.news').innerHTML = '<h4>Error Loading news... Check your internet and try again!</h4>';
    }
}

async function getSingleNews(element) {
    let response = await fetch(`${BASE_URL}/item/${element}.json`);
    let resp = await response.json();
    // console.log(resp);
    let output = '';
    output += `
        <dt><a href="${resp.url}" target="_blank" title="View News">${resp.title}</a></dt>
        <dd>
            <a href="https://news.ycombinator.com/vote?id=${resp.id}&how=up&goto=news" target="_blank" title="Vote"><i class="fa fa-sort-up"></i></a> <span>${resp.score} points</span> |
            <i class="fa fa-user"></i> <a href="https://news.ycombinator.com/user?id=${resp.by}" target="_blank" title="View User Post"><span>${resp.by}</span></a> |
            <i class="fa fa-clock"></i> <a href="https://news.ycombinator.com/item?id=${resp.id}" target="_blank" title="View Post"><span>${timeAgo(resp.time)}</span></a> |
            <i class="fa fa-comments"></i> <a href="https://news.ycombinator.com/item?id=${resp.id}" target="_blank" title="View Post"><span>${resp.descendants} comments</span></a> 
        </dd>`;
        document.querySelector('.news').innerHTML += output;
    return true;
}


getAllNews();
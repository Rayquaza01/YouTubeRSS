const button = document.getElementById("submit");
const rss = document.getElementById("rss");
const url = document.getElementById("url");
const base =
    "https://www.googleapis.com/youtube/v3/channels?key=AIzaSyBetOKjwEUCtS04Av-8nhIV30hTZ6KvVoY";
const rssbase = "https://www.youtube.com/feeds/videos.xml?channel_id=";

async function submit() {
    let channel = new URL(url.value);
    if (channel.host !== "www.youtube.com") {
        url.innerText = "Not a YouTube URL";
    } else {
        let parse = channel.pathname.match(/\/([^/]+)\/([^/]+)/);

        if (parse[1] === "channel") {
            rss.href = rssbase + parse[2];
            rss.innerText = rss.href;
        } else if (parse[1] === "user") {
            let res = await (await fetch(
                base + "&part=id&forUsername=" + parse[2]
            )).json();
            rss.href = rssbase + res.items[0].id;
            rss.innerText = rss.href;
        }
    }
}

button.addEventListener("click", submit);

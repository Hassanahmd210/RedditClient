document.getElementById('addSubredditBtn').addEventListener('click', function() {
    const subreddit = document.getElementById('subredditInput').value.trim();
    
    if (subreddit) {
      fetchSubredditPosts(subreddit);
    }
  });
  
  async function fetchSubredditPosts(subreddit) {
    const lane = document.createElement('div');
    lane.classList.add('lane');
    lane.innerHTML = `<h3>Loading ${subreddit}...</h3>`;
    document.getElementById('lanesContainer').appendChild(lane);
  
    try {
      const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
      
      if (!response.ok) throw new Error('Subreddit not found');
      
      const data = await response.json();
      displaySubreddit(data, subreddit, lane);
    } catch (error) {
      lane.innerHTML = `<h3>Error: ${error.message}</h3>`;
    }
  }
  
  function displaySubreddit(data, subreddit, lane) {
    lane.innerHTML = `<h3>${subreddit}</h3>`;

    const posts = data.data.children;
    posts.forEach(post => {
        const title = post.data.title;
        const author = post.data.author;
        const upvotes = post.data.ups;
        const createdUtc = post.data.created_utc * 1000; // Convert to milliseconds
        const date = new Date(createdUtc).toLocaleString(); // Format the date

        const postElement = `
            <div class="post">
                <h4>${title}</h4>
                <p>By ${author} | ${upvotes} upvotes | Posted on ${date}</p>
            </div>
        `;

        lane.innerHTML += postElement;
    });
}

  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-lane')) {
      e.target.parentElement.remove();
    }
  });
  
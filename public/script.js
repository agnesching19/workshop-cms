if (document.readyState !== 'loading') {
  ready();
} else {
  document.addEventListener('DOMContentLoaded', ready);
}

const ready = () => {
  getBlogposts('/get-posts');

  // send posts to server
  let form = document.querySelector('form');
  form.addEventListener('submit', (event) => {

    event.preventDefault(); // prevents the form from contacting our server automatically (we want to do it ourselves)
    let formActionUrl = form.action; // 'form.action' is the url '/create-post'
    let formData = new FormData(form);

    postBlogposts(formActionUrl, formData);
  });
}

/****
 * Function definitions
 ***/
const postBlogposts = (url, data) => {
  fetch(url, {
    method: 'POST',
    body: data
  })
  .then((res) => {
    res.json()
    .then((json) => {
      console.log(json);
      addBlogpostsToPage(json);
      document.querySelector('form').reset();
    })
  })
  .catch((err) => {
    console.error(err);
  });
}

const getBlogposts = (url) => {
  fetch(url, {
    method: 'GET'
  })
  .then((res) => {
    res.json()
    .then((json) => {
      console.log(json);
      addBlogpostsToPage(json);
    });
  })
  .catch((err) => {
    console.error(err);
  });
}

const addBlogpostsToPage = (data) => {
  for (let blogpost in data) {
    if (data.hasOwnProperty(blogpost)) {

      let postDiv         = document.createElement('div');
      let postText        = document.createElement('div');
      let postContainer   = document.querySelector('.post-container');

      // put <p> tags around each separate line of blogpost, otherwise
      // they will all run together
      postText.innerHTML = data[blogpost].split('\n').map((item) => {
        return '<p>'+item+'</p>';
      }).join('');
      postText.className = 'postBody';
      postDiv.className = 'post';

      let postDetail = document.createElement('div');
      postDetail.className = 'postDetail'
      postDetail.innerHTML = blogpost;

      postDiv.appendChild(postText);
      postDiv.appendChild(postDetail);
      postContainer.appendChild(postDiv);
    }
  }
}

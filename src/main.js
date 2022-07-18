// JavaScript Document

//blog list
const blog = ['news/examplepost.html', 'news/test.html' , 'news/test-two.html']
//reads blog posts and stores them in variable
async function getBlogPost(url) {
	const response = await fetch(url)
	var post = await response.text();
	console.log(post)
	show(post)
	console.log("post rendered")
}

//renders html
function show(data) {
	var post = document.createElement('div');
	post.className = "textblock";
	document.getElementById('blogger').appendChild(post);
	post.innerHTML = data;
}

//renders blog
function writeBlog (post) {
	for (let i in post) {
		getBlogPost(post[i]);
	}
}

writeBlog(blog)

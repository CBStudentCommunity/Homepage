// Blog Rendering Tool
// blog posts
const bloglist = ['blog/cbsmp.html', 'blog/Welcome.html'];
// position in blog post list
var progress = 0;
//render a block of 4 blog posts
function renderBlock() {
	// stop on 4 or end of blog list
	for(let i = 0; i <= 3 && progress <= bloglist.length - 1; i++) {
		// create blog post holder with embeded script to render post
		console.log(progress)
		let div = document.createElement('div');
		let scr = document.createElement('script')
		div.className = 'Blogbox';
		div.id = progress
		scr.innerHTML = `
		fetch('` + bloglist[progress] + `').then(data => {
			data.text().then(text => {
				document.getElementById(` + progress + `).innerHTML = text
			}) 
		}) 
		`;
		div.appendChild(scr);
		document.getElementById('blogger').appendChild(div);
		progress++
	}
}
renderBlock()
// triggered when footer visible
document.addEventListener('scroll', () => {
	if(document.getElementById('bottom').offsetParent != null) {
		renderBlock()
	}
})
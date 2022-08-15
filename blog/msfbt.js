// Micheal's Simple Funky Blogging Tool
/* 
MIT License

Copyright (c) 2022 Michael Dmitry Ward

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

// blog posts
fetch('./blogs.json').then(rawList => {
	rawList.json().then(list => {
		var bloglist = list.files
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
				div.className = 'textblock';
				div.id = progress
				scr.innerHTML = `
				fetch('` + './remove/' + bloglist[progress] + `').then(data => {
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
	})

})


//club rendering js, forgive my variable name choices, very tired.
//This code is alike to blogger.js, except we are creating divs inside a section. 

//list of blog posts
const clubList = ['clubHub/testclub.html', 'worthlessUrl']

//position in club list
var advance = 0;

function createClub() {

    //renders 4 clubs
    for(let i = 0; i <= 3 && advance <= clubList.length - 1; i++){

        let sect = document.getElementById(poutine);
        let create = sect.createElement('div');
        let inScript = sect.createElement('script');
        create.className = 'club';
        create.id = advance;

        inScript.innerHTML = `fetch('` + clubList[advance] + `').then(data => {
            data.text().then(text => {
                document.getElementById(` + advance + `).innerHTML = text
                })
            })`;
        create.appendChild(inScript);
        document.getElementById('').appendChild(create)
        advance++
    }
	
}
/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: 
   https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: 
   https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/


console.log(data);
/*
The 'showPage' function will create and insert the elements
needed to display a page of 9 students using 2 parameters:
list - the student data to be shown
page - the page number to be shown
*/
function showPage(list, page) {
	//start and end index of list items to be displayed
	const startIndex = (page*9)-9;
	const endIndex = page*9;
	const studentList = document.querySelector('.student-list');
	//clears previously displayed items
	studentList.innerHTML = '';
	for(let i=0; i<list.length; i++) {
		if(i >= startIndex && i < endIndex) {
			//creating elements needed to display student info
			//and inserting them into the DOM
			const student = `<li class='student-item cf'><div class='student-details'>
			<img class='avatar' src=${list[i].picture.large} alt='Profile Picture'>
			<h3>${list[i].name.first} ${list[i].name.last}</h3>
			<span class='email'>${list[i].email}</span></div>
			<div class='joined-details'><span class='date'>Joined ${list[i].registered.date}</span></li>`
			studentList.insertAdjacentHTML('beforeend', student);
		}
	}
}

/*
The 'addPagination' function creates/inserts the elements needed
for pagination buttons. It requires 1 parameter:
list - student data to be displayed
*/
function addPagination(list) {
	//number of pages/buttons needed
	const numPages = Math.ceil(list.length/9);
	const uList = document.querySelector('ul.link-list');
	//clears previously displayed items
	uList.innerHTML = '';
	for(let i=1; i<=numPages; i++) {
		//creating button and inserting it into the DOM
		let button = `<li><button type='button'>${i}</button></li>`;
		uList.insertAdjacentHTML('beforeend', button);
	}
	//gives first button 'active' class
	document.querySelector('.link-list button').className = 'active';

	uList.addEventListener('click', (e) => {
		const clicked = e.target;
		//only updates page if the target clicked within the 
		//ul is a button
		if(clicked.tagName === 'BUTTON') {
			//removes 'active' from all pagination buttons
			for(let i=0; i<uList.children.length; i++) {
				uList.children[i].children[0].className = '';
			}
			//sets the clicked button's class to 'active' and 
			//displays the student info on that page
			clicked.className = 'active';
			showPage(list, clicked.textContent);
		}
	});
}

function addSearch() {

}

// Call functions
showPage(data, 1);
addPagination(data);
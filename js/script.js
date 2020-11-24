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

//I am going for an Exceeds Expectations grade, 
//but will accept a pass for Meets Expectations.

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

	//checks if there are more than 0 pages
	if(numPages > 0) {
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
}

function addSearch(list) {
	//creates search bar and inserts into the DOM
	const searchBar = `<label for='search' class='student-search'>
	<input id='search' placeholder='Search by name...'>
	<button type='button'><img src='img/icn-search.svg' alt='Search icon'>
	</button></label>`;
	const title = document.querySelector('header h2');
	title.insertAdjacentHTML('afterend', searchBar);

	const label = document.querySelector('label.student-search');

	//search function creates list of students who's names 
	//match the search term inserted into the input and
	//displays them on the page
	function search() {
		const search = document.querySelector('input').value;
		let students = [];
		for(let i=0; i<list.length; i++) {
			let student = `${list[i].name.first} ${list[i].name.last}`;
			if(student.toLowerCase().includes(search.toLowerCase())) {
				students.push(list[i]);
			}
		}
		if(students.length === 0) {
			document.querySelector('.student-list').innerHTML = 'No results found';
			addPagination(students);
		} else {
			showPage(students, 1);
			addPagination(students);
		}
	}

	//listens for search button click to run search
	label.addEventListener('click', (e) => {
		if(e.target.tagName === 'BUTTON') {
			search();
		}
	});
	//listens for keyup event to run search while user types
	label.addEventListener('keyup', search);

}

// Call functions
showPage(data, 1);
addSearch(data);
addPagination(data);
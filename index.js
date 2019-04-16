const template = `
<div class="row">
<div class="col-3 m-5">
		<div class="input-group mb-2">
			<input type="text" class="form-control" id="date">
			<div class="input-group-append">
				<div class="input-group-text show-calendar" onclick="showCalendar()">
					<i class="far fa-calendar-alt"></i>
				</div>
			</div>
		</div>
		<table class="table table-sm calendar" id="calendar_light">
				<thead>
						<tr>
							<th scope="col">
									<button class="btn btn-outline-dark" onclick="changeMonth('left')">
										<i class="fas fa-angle-left"></i>
									</button>
							</th>
							<th scope="col" colspan="2" id="years"></th>
							<th scope="col" colspan="3" id="months"></th>
							<th scope="col">
								<button class="btn btn-outline-dark" onclick="changeMonth('right')">
									<i class="fas fa-angle-right"></i>
								</button>
							</th>
						</tr>
					<tr id="daysOfWeek"></tr>
				</thead>
				<tbody id="days"></tbody>
			</table>
</div>
</div>
`;

function init() {
	let date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDay();

	document.getElementById("calendar").innerHTML = template;
	let years = getNumbersArr(1970, 2100);
	years = setOptionsSelect(years, "years", year);
	document.getElementById("years").innerHTML = years;
	let months = getMonths();
	months = setOptionsSelect(months, "months", month);
	document.getElementById("months").innerHTML = months;
	let daysOfWeek = getDayOfWeek();
	daysOfWeek = setTableTh(daysOfWeek, "th");
	document.getElementById("daysOfWeek").innerHTML = daysOfWeek;
	let countDaysInMonth = daysInMonth(year, month);
	let days = getNumbersArr(1, countDaysInMonth);
	days = getWeeks(days);
	days = setBodyTable(days);
	document.getElementById("days").innerHTML = days;

	setDate(day);
}

function showCalendar() {
	let display = document.getElementById("calendar_light").style.display;

	display = display === "none" || !display.length ? "block" : "none";
	document.getElementById("calendar_light").style.display = display;
}

function getNumbersArr(from, to) {
	let arr = [];

	for(let i = from; i <= to; i++) {
		arr.push(i);
	}

	return arr;
}

function getMonths() {
	return [
		{number: 1, name: "January"}, 
		{number: 2, name: "February"}, 
		{number: 3, name: "March"}, 
		{number: 4, name: "April"}, 
		{number: 5, name: "May"}, 
		{number: 6, name: "June"}, 
		{number: 7, name: "July"}, 
		{number: 8, name: "August"}, 
		{number: 9, name: "September"}, 
		{number: 10, name: "October"}, 
		{number: 11, name: "November"}, 
		{number: 12, name: "December"}
	];
}

function setOptionsSelect(arr, name, number) {
	let options = arr.map(item => {
		let value = Object.keys(item).length ? item.number : item;
		return `
			<option 
				${value === number ? "selected": ""} 
				value=${value}>${Object.keys(item).length ? item.name : item}
			</option>
		`;
	});

	return `
		<select name=${name} class="custom-select">
			${options}
		</select>
	`;
}

function getDayOfWeek() {
	return ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
}

function setTableTh(arr, tag) {
	return arr.map(item => `<${tag} scope="col">${item}</${tag}>`).join("");
}

function getWeeks(arr) {
	let weeks = [];
	let week = [];

	arr.forEach((item, index) => {
		week.push(item);
		
		if(item % 7 == 0) {
			weeks.push(week);
			week = [];
		}

		if(arr.length-1 === index) {
			weeks.push(week);
			week = [];
		}

	});

	return weeks;
}

function setBodyTable(arr) {
	return arr.map(week => {
		return `
			<tr>
				${week.map(item => `<td onClick="setDate(${item})">${item}</td>`).join("")}
			</tr>
		`;
	}).join("");
}

function changeMonth(direction) {
	let elMonths = document.getElementById("months").children[0];
	let elYears = document.getElementById("years").children[0];

	if(elMonths.selectedIndex === 0 && direction === "left") {
		let yearIndex = elYears.selectedIndex === 0 ? elYears.selectedIndex : elYears.selectedIndex--;
		elYears.options[yearIndex--];
	}

	if(elMonths.selectedIndex === 11 && direction === "right") {
		let yearIndex = elYears.selectedIndex === elYears.options.length-1 ? elYears.selectedIndex : elYears.selectedIndex++;
		elYears.options[yearIndex];
	}

	if(direction === "left") {
		let indexMonth = elMonths.selectedIndex === 0 ? elMonths.selectedIndex = 11 : elMonths.selectedIndex--; 
		elMonths.options[indexMonth];
	}

	if(direction === "right") {
		let indexMonth = elMonths.selectedIndex === 11 ? elMonths.selectedIndex = 0 : elMonths.selectedIndex++;
		elMonths.options[indexMonth];
	}

	let year = elYears.options[elYears.selectedIndex].value;
	let month = elMonths.options[elMonths.selectedIndex].value;

	render(year, month);
}

function setDate(date) {
	let elMonths = document.getElementById("months").children[0];
	let elYears = document.getElementById("years").children[0];

	let year = elYears.options[elYears.selectedIndex].value;
	let month = elMonths.options[elMonths.selectedIndex].value;

	document.getElementById("date").value = `${year}/${month}/${date}`;
}

function daysInMonth(year, month) {
	return new Date(year, month, 0).getDate();
}

function render(year, month, day) {
	let countDaysInMonth = daysInMonth(year, month);
	let days = getNumbersArr(1, countDaysInMonth);
	days = getWeeks(days);
	days = setBodyTable(days);
	document.getElementById("days").innerHTML = days;
}

init();

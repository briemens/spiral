/*jslint browser:true*/
/**
 * Variable Declarations
 */
var main = document.getElementById('main'),
	gridSize = 30,
	combinations = [],
	content = '',
	intervalId,
	colors = [ "r", "g", "b"],
	rows, 
	cols;

for (rows = 0; rows < gridSize; rows += 1) {
	content += '<tr>';
	for (cols = 0; cols < gridSize; cols += 1) {
		combinations.push([rows, cols]);
		content += '<td><div class="cell col' + cols + ' row' + rows + '">&nbsp</div></td>';
	}
	content += '</tr>';
}
main.innerHTML = '<table>' + content + '</table>';

function random() {
	var shiftR = 0, shiftG = 0, shiftB = 0

	intervalId = setInterval(function () {
		var index = Math.floor(Math.random() * combinations.length),
			cellInfo = combinations[index],
			cell = document.getElementsByClassName('col' + cellInfo[1] + ' row' + cellInfo[0])[0],
			tint = 20 + Math.floor(Math.random() * 215);

		cell.style.backgroundColor = 'rgb(' + (tint + shiftR) + ',' + (tint + shiftR) + ',' + (tint + shiftR) + ')'; // 'gray';
		cell.setAttribute('class', cell.getAttribute('class') + ' filled');

		combinations.splice(index, 1);
		if (combinations.length === 0) {
			clearInterval(intervalId);
		}
	}, 10);
}

function spiral() {

	var x = 0, y = 0, xd = 1, yd = -1, dir = 'horizontal', iteration = 1;

	(function (x, y, xd, yd, dir, iteration) {
		var number = Math.floor((Math.random() * 3));
		var shiftR = 0;
		var shiftG = 0;
		var shiftB = 0;

		//if (colors[number] === 'r') {
		shiftR = Math.floor(Math.random() * 128)
		//} else if (colors[number] === 'g') {
		shiftG = Math.floor(Math.random() * 128)
		//} else if (colors[number] === 'b') {
		shiftB = Math.floor(Math.random() * 128)
		//}

		console.log(shiftR, shiftG, shiftB);

		var intervalId = setInterval(function () {
			function move() {
				if (dir === 'horizontal') {
					if (xd === 1) {
						if (x < gridSize - iteration) {
							x += 1;
						}
						if (x >= gridSize - iteration) {
							dir = 'vertical';
							yd *= -1;
						}
					} else {
						if (x > iteration) {
							x -= 1;
						}
						if (x <= iteration) {
							dir = 'vertical';
							yd *= -1;
						}
					}
				} else if (dir === 'vertical') {
					if (yd === 1) {
						if (y < gridSize - iteration) {
							y += 1;
						}
						if (y >= gridSize - iteration) {
							dir = 'horizontal';
							xd *= -1;
						}
					} else {
						if (y > iteration) {
							y -= 1;
						}
						if (y <= iteration) {
							dir = 'horizontal';
							xd *= -1;
							iteration += 1;
						}
					}
				}

			}

			move();
			//console.log(x, y);
			var cell = document.getElementsByClassName('col' + x + ' row' + y)[0],
				tint = 20 + Math.floor(Math.random() * 215);

			cell.style.backgroundColor = 'rgb(' + (tint + shiftR) + ',' + (tint + shiftG) + ',' + (tint + shiftB) + ')'; // 'gray';
			cell.setAttribute('class', cell.getAttribute('class') + ' filled');

			if (iteration > gridSize / 2) {
				clearInterval(intervalId);
			}
		}, 10);
	}(x, y, xd, yd, dir, iteration));

}

/**
 * Start the animations
 */

spiral();
setInterval(spiral, 5000);
console.log("Test")
//random();

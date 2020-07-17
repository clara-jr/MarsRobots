function robots_from_mars(input) {

  console.log("Input: ");
  console.log(input);
  console.log("\n");

  var output = "";
  const lines = input.split('\n');

  const coordinates = lines[0];
  const max_X = coordinates.length > 2 ? coordinates.length <= 3 ? coordinates.substr(0, 2) > 50 ? coordinates[0] : coordinates.substr(0, 2) : coordinates.substr(0, 2) : coordinates[0];
  const max_Y = coordinates.length > 2 ? coordinates.length <= 3 ? coordinates.substr(0, 2) > 50 ? coordinates.substr(1, 2) : coordinates[2] : coordinates.substr(2, 2) : coordinates[1];

  var fall = false;
  var scent = false;
  for (var i = 1; i < lines.length - 1; i+=2) {
    // processing each robot
    var [x, y, orientation] = lines[i].split(' ');
    var instructions = lines[i+1];
    fall = false;
    for (j in instructions) {
      if (instructions[j] == 'F') {
        if (orientation == 'N' && y + 1 <= max_Y) {
          y++;
        } else if (orientation == 'S' && y - 1 >= 0) {
          y--;
        } else if (orientation == 'E' && x + 1 <= max_X) {
          x++;
        } else if (orientation == 'W' && x - 1 >= 0) {
          x--;
        } else {
          if (!scent) {
            fall = true;
            scent = true;
            break;
          }
        }
      }
      else {
        if ((instructions[j] == 'R' && orientation == 'N') || (instructions[j] == 'L' && orientation == 'S')) {
          orientation = 'E';
        } else if ((instructions[j] == 'R' && orientation == 'S') || (instructions[j] == 'L' && orientation == 'N')) {
            orientation = 'W';
        } else if ((instructions[j] == 'R' && orientation == 'E') || (instructions[j] == 'L' && orientation == 'W')) {
            orientation = 'S';
        } else {
          orientation = 'N';
        }
      }
    }
    if (fall) output += x + "" + y + orientation + "LOST\n";
    else output += x + "" + y + orientation + "\n";
  }

  console.log("Output: ");
  console.log(output);

}

const input = "53\n1 1 E\nRFRFRFRF\n3 2 N\nFRRFLLFFRRFLL\n0 3 W\nLLFFFLFLFL";
robots_from_mars(input);
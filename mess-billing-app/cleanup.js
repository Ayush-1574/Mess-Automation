const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src', 'app', 'student', 'forms');
if (fs.existsSync(dir)) {
  fs.rmSync(dir, {recursive: true, force: true});
  console.log('Cleaned up');
} else {
  console.log('Directory does not exist');
}

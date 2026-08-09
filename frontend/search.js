const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('c:/Harshal/Apps/devtools/frontend/src', function(filePath) {
  if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
    const content = fs.readFileSync(filePath, 'utf-8');
    if (content.includes('/api/') || content.includes('VITE_API_URL')) {
      console.log(filePath);
    }
  }
});

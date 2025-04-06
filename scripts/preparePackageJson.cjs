const fs = require('fs');
const path = require('path');

const srcPath = path.resolve(__dirname, '../package.json');
const destPath = path.resolve(__dirname, '../dist/package.json');

const packageJson = JSON.parse(fs.readFileSync(srcPath, 'utf-8'));

delete packageJson.type;

fs.writeFileSync(destPath, JSON.stringify(packageJson, null, 2));

console.log('Production package.json prepared at', destPath);

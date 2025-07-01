import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJsonPath = process.argv[2];

if (!packageJsonPath) {
  console.error('Error: Please provide the path to package.json');
  process.exit(1);
}

if (!fs.existsSync(packageJsonPath)) {
  console.error(`Error: File not found: ${packageJsonPath}`);
  process.exit(1);
}

const absolutePackageJsonPath = path.resolve(packageJsonPath);

try {
  fs.accessSync(absolutePackageJsonPath, fs.constants.W_OK);
} catch (err) {
  console.error(`Error: Cannot write to ${absolutePackageJsonPath}`);
  process.exit(1);
}

try {
  // update package.json with Playwright dependencies
  const packageJsonContent = fs.readFileSync(absolutePackageJsonPath, 'utf8');
  let packageJson = JSON.parse(packageJsonContent);
  
  packageJson.devDependencies = packageJson.devDependencies || {};
  packageJson.devDependencies['@playwright/test'] = '^1.52.0';
  
  // add script for installing browsers
  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts['install:browsers'] = 'playwright install chromium-headless-shell';

  fs.writeFileSync(absolutePackageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('dependencies added successfully');
  
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const studentTestFilePath = path.join(__dirname, './src/Notifications/NotificationItem.spec.js');
const injectedJSXPath = path.join(__dirname, './NotificationItem-test-seq2.jsx');

function replaceImportStatement() {
  const testFileContent = fs.readFileSync(studentTestFilePath, 'utf8');

  const updatedContent = testFileContent.replace(
    /^import\s+NotificationItem\s+from\s+['"].*['"];/m,
    `import NotificationItem from "${injectedJSXPath}";`
  );

  fs.writeFileSync(studentTestFilePath, updatedContent, 'utf8');
}

(function runTests() {
  replaceImportStatement();
  exec('jest --config=package.json src/Notifications/NotificationItem.spec.js', (error, stdout, stderr) => {
    if (error) {
      if (error.code === 1) {
        process.stdout.write('NOK\n');
        return;
      } else {
        const hasFail = stderr.split('\n').some(line => line.includes('FAIL'));
        if (hasFail) {
          process.stdout.write('NOK\n');
        } else {
          process.stdout.write('OK\n');
        }
        return;
      }
    }
    
    const hasFail = stdout.split('\n').some(line => line.includes('FAIL'));
    if (hasFail) {
      process.stdout.write('NOK\n');
    } else {
      process.stdout.write('OK\n');
    }
  });
})()
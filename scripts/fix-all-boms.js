import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

async function fixBoms() {
  const packageJsonFiles = await glob('**/package.json', { ignore: 'node_modules/**' });

  for (const file of packageJsonFiles) {
    const filePath = path.resolve(file);
    let data = fs.readFileSync(filePath, 'utf8');

    if (data.charCodeAt(0) === 0xFEFF) {
      data = data.slice(1);
      fs.writeFileSync(filePath, data, 'utf8');
      console.log(`Successfully removed BOM from ${file}`);
    }
  }
}

fixBoms();

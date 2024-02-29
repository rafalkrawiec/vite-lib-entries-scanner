import fs from 'node:fs';
import path from 'node:path';

export function scanPackageEntries(directory: string, extensions: string[]) {
  return Object.fromEntries(scanDirectory(directory, directory, extensions));
}

function scanDirectory(original: string, directory: string, extensions: string[], result: [string, string][] = []) {
  const files = fs.readdirSync(directory);

  files.forEach((file) => {
    const filePath = path.join(directory, file);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      result = scanDirectory(original, filePath, extensions, result);
    } else {
      if (extensions.includes(path.extname(file))) {
        let entry = path.normalize(filePath)
          .replace(new RegExp(`^${original}`), '')
          .replace(/^\//, '')
          .replace(path.extname(file), '');

        result.push([entry, filePath]);
      }
    }
  });

  return result;
}

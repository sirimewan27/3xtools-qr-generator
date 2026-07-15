import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

const __dirname = path.resolve();

// Configurations
const TEMP_DIR = path.join(__dirname, 'temp_package');
const DIST_DIR = path.join(__dirname, 'dist');
const DOCS_SRC = path.join(__dirname, 'Documentation', 'index.html');
const ZIP_OUTPUT = path.join(__dirname, '3xtools-qr-suite-package.zip');

// Files and folders to exclude from Source Code directory
const EXCLUDES = [
  'node_modules',
  'dist',
  'temp_package',
  '.git',
  '.github',
  '3xtools-qr-suite-package.zip',
  'package-codester.js',
  '.env',
  '.DS_Store'
];

// Helper to recursively copy directories
function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (EXCLUDES.includes(entry.name)) continue;

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Helper to recursively zip a folder
async function zipFolder(zip, folderPath, rootPath = folderPath) {
  const entries = fs.readdirSync(folderPath, { withFileTypes: true });

  for (let entry of entries) {
    const fullPath = path.join(folderPath, entry.name);
    const relativePath = path.relative(rootPath, fullPath).replace(/\\/g, '/');

    if (entry.isDirectory()) {
      const folderZip = zip.folder(relativePath);
      await zipFolder(rootPath === folderPath ? folderZip : zip, fullPath, rootPath);
    } else {
      const fileData = fs.readFileSync(fullPath);
      zip.file(relativePath, fileData);
    }
  }
}

async function main() {
  console.log('🚀 Starting Packaging for Codester...');

  try {
    // 1. Clean up old artifacts
    if (fs.existsSync(TEMP_DIR)) {
      fs.rmSync(TEMP_DIR, { recursive: true, force: true });
    }
    if (fs.existsSync(ZIP_OUTPUT)) {
      fs.unlinkSync(ZIP_OUTPUT);
    }

    // 2. Ensure production build exists
    if (!fs.existsSync(DIST_DIR)) {
      throw new Error('Production build not found. Please run "npm run build" first.');
    }

    // 3. Create structured directories in temp_package
    fs.mkdirSync(TEMP_DIR, { recursive: true });
    
    // Copy Documentation
    console.log('📄 Copying Documentation...');
    const docsDestDir = path.join(TEMP_DIR, 'Documentation');
    fs.mkdirSync(docsDestDir, { recursive: true });
    if (fs.existsSync(DOCS_SRC)) {
      fs.copyFileSync(DOCS_SRC, path.join(docsDestDir, 'index.html'));
    } else {
      console.warn('⚠️ Warning: Documentation index.html not found! Skipping docs.');
    }

    // Copy Production Build
    console.log('📦 Copying Pre-Built static files (Production Build)...');
    const buildDestDir = path.join(TEMP_DIR, 'Production Build', 'dist');
    copyDirSync(DIST_DIR, buildDestDir);

    // Copy Source Code
    console.log('💻 Copying project Source Code (excluding node_modules & dist)...');
    const sourceDestDir = path.join(TEMP_DIR, 'Source Code');
    copyDirSync(__dirname, sourceDestDir);

    // Copy Welcome Readme file
    console.log('📝 Creating README.txt welcome card...');
    const readmeContent = `========================================================================
3xtools QR Suite - Realtime Premium Offline QR Suite
========================================================================
Thank you for purchasing our premium utility application!

Here is a breakdown of this package folder:

1. 📁 Documentation/
   - Open 'index.html' inside your browser to access the complete interactive
     step-by-step rebranding and customization guides.

2. 📁 Source Code/
   - Contains the React + Vite + Tailwind CSS v4 codebase. Use this folder to run 
     the project in your local development environment or customized rebuilds.

3. 📁 Production Build/
   - Contains the precompiled, compressed static distribution 'dist/' folder files.
     You can directly drag & drop the files inside this directory straight into your 
     cPanel/shared hosting public_html/ folder to put the application online immediately.

========================================================================
For support or questions, email us at: support@3xtools.app
========================================================================`;
    fs.writeFileSync(path.join(TEMP_DIR, 'README.txt'), readmeContent);

    // 4. Compress to ZIP
    console.log('🤐 Compressing structured package into ZIP archive...');
    const zip = new JSZip();
    await zipFolder(zip, TEMP_DIR);

    const content = await zip.generateAsync({
      type: 'nodebuffer',
      compression: 'DEFLATE',
      compressionOptions: { level: 9 }
    });

    fs.writeFileSync(ZIP_OUTPUT, content);
    console.log(`✅ Success! Package ZIP saved to: ${ZIP_OUTPUT}`);

  } catch (error) {
    console.error('❌ Error during packaging:', error);
  } finally {
    // 5. Clean up temporary directory
    if (fs.existsSync(TEMP_DIR)) {
      console.log('🧹 Cleaning up temporary directories...');
      fs.rmSync(TEMP_DIR, { recursive: true, force: true });
    }
  }
}

main();

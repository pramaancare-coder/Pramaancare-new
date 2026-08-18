#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Clean up build artifacts
function cleanBuildArtifacts() {
  const buildDir = path.join(process.cwd(), '.next');
  const cacheDir = path.join(buildDir, 'cache');
  
  if (fs.existsSync(cacheDir)) {
    console.log('Cleaning build cache...');
    fs.rmSync(cacheDir, { recursive: true, force: true });
  }
}

// Optimize static assets
function optimizeStaticAssets() {
  const staticDir = path.join(process.cwd(), '.next', 'static');
  
  if (fs.existsSync(staticDir)) {
    console.log('Optimizing static assets...');
    // Add compression logic here if needed
  }
}

// Main optimization function
function optimize() {
  console.log('Starting build optimization...');
  cleanBuildArtifacts();
  optimizeStaticAssets();
  console.log('Build optimization complete!');
}

if (require.main === module) {
  optimize();
}

module.exports = { optimize };
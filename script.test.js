// Import required modules
import { JSDOM } from 'jsdom';
import { expect } from 'chai';

// Create a mock DOM environment
const dom = new JSDOM(`
  <html>
    <body>
      <div id="app">
        <select id="mood">
          <option value="">Select a mood</option>
        </select>
        <div id="results"></div>
      </div>
    </body>
  </html>
`);
global.document = dom.window.document;

// Import the script.js file
import script from './script.js';

// Before each test, clear the results div
beforeEach(() => {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';
});

// Test that showSongs handles an empty mood select dropdown
describe('showSongs function', () => {
  it('should display a message when no mood is selected', () => {
    showSongs();
    const resultsDiv = document.getElementById('results');
    expect(resultsDiv.innerHTML).to.equal('<p>Please select a mood.</p>');
  });
});
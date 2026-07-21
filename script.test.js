const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

class MockElement {
  constructor(tagName, id = null) {
    this.tagName = tagName.toUpperCase();
    this.id = id;
    this.children = [];
    this._innerHTML = '';
    this.value = '';
    this.textContent = '';
    this.href = '';
    this.target = '';
  }

  appendChild(child) {
    this.children.push(child);
    return child;
  }

  set innerHTML(content) {
    this._innerHTML = content;
    if (typeof content === 'string') {
      this.children = [];
    }
  }

  get innerHTML() {
    return this._innerHTML;
  }
}

class MockDocument {
  constructor() {
    this.nodesById = new Map();
  }

  registerElement(element) {
    if (element.id) {
      this.nodesById.set(element.id, element);
    }
    return element;
  }

  getElementById(id) {
    return this.nodesById.get(id);
  }

  createElement(tagName) {
    return new MockElement(tagName);
  }
}

const scriptSource = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf-8');

function createDocument() {
  const document = new MockDocument();
  document.registerElement(new MockElement('select', 'mood')).value = '';
  document.registerElement(new MockElement('div', 'results'));
  return document;
}

function setup() {
  const document = createDocument();
  const context = {
    document,
    window: {},
    console,
  };
  context.window.document = document;
  vm.createContext(context);
  vm.runInContext(scriptSource, context);
  return { document, context };
}

function collectAnchors(node) {
  if (!node || !node.children) {
    return [];
  }
  return node.children.reduce((anchors, child) => {
    if (child.tagName === 'A') {
      anchors.push(child);
    }
    return anchors.concat(collectAnchors(child));
  }, []);
}

test('showSongs displays a message when no mood is selected', () => {
  const { document, context } = setup();
  const moodSelect = document.getElementById('mood');
  const resultsDiv = document.getElementById('results');

  moodSelect.value = '';
  context.showSongs();

  assert.equal(resultsDiv.innerHTML, '<p>Please select a mood.</p>');
  assert.equal(resultsDiv.children.length, 0);
});

test('showSongs renders links for the selected mood', () => {
  const { document, context } = setup();
  const moodSelect = document.getElementById('mood');
  const resultsDiv = document.getElementById('results');

  moodSelect.value = 'happy';
  context.showSongs();

  const anchors = collectAnchors(resultsDiv);
  assert.equal(anchors.length, 2);
  assert.equal(anchors[0].textContent, 'Happy – Pharrell Williams');
  assert.equal(anchors[0].href, 'https://www.youtube.com/watch?v=ZbZSe6N_BXs');
  assert.equal(anchors[0].target, '_blank');
});
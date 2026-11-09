import { basicSetup } from 'codemirror';
import { python } from '@codemirror/lang-python';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { EditorState } from '@codemirror/state';
import { Decoration, EditorView, ViewPlugin } from '@codemirror/view';
import { tags } from '@lezer/highlight';
import { prefix, starter, suffix } from './challenge.js';

const draftKey = 'bugorithm:last-shuttle:v1';

function readDraft() {
  try {
    return localStorage.getItem(draftKey) ?? starter;
  } catch {
    return starter;
  }
}

const syntax = HighlightStyle.define([
  { tag: tags.keyword, color: '#ceb1ff' },
  { tag: tags.comment, color: '#a5a1bd', fontStyle: 'italic' },
  { tag: tags.number, color: '#f1ba87' },
  { tag: tags.string, color: '#b5e8bb' },
  { tag: tags.function(tags.variableName), color: '#a6dfff' },
]);

const theme = EditorView.theme({
  '&': { backgroundColor: '#181c2c', color: '#ece9fb', fontSize: '13px' },
  '&.cm-focused': { outline: '2px solid #b6a0ff', outlineOffset: '-2px' },
  '.cm-content': { fontFamily: '"DM Mono", ui-monospace, monospace', padding: '13px 0', caretColor: '#fff' },
  '.cm-line': { padding: '0 10px', lineHeight: '1.68' },
  '.cm-gutters': { backgroundColor: '#181c2c', color: '#a19bb7', border: 0 },
  '.cm-activeLine, .cm-activeLineGutter': { backgroundColor: '#2a2d45' },
  '.cm-cursor': { borderLeftColor: '#fff' },
  '.cm-editable-line': { backgroundColor: '#28223f' },
  '.cm-selectionBackground, &.cm-focused .cm-selectionBackground, .cm-content ::selection': { background: '#51447a' },
}, { dark: true });

const editableLines = ViewPlugin.fromClass(class {
  constructor(view) {
    this.updateLines(view.state.doc);
  }

  update(update) {
    if (update.docChanged) this.updateLines(update.state.doc);
  }

  updateLines(doc) {
    const first = doc.lineAt(prefix.length).number;
    const last = doc.lineAt(doc.length - suffix.length).number;
    const ranges = [];
    for (let number = first; number <= last; number += 1) {
      ranges.push(Decoration.line({ class: 'cm-editable-line' }).range(doc.line(number).from));
    }
    this.decorations = Decoration.set(ranges);
  }
}, { decorations: (plugin) => plugin.decorations });

export function createEditor(parent, onBlocked, onChange) {
  const view = new EditorView({
    parent,
    state: EditorState.create({
      doc: prefix + readDraft() + suffix,
      extensions: [
        basicSetup, python(), syntaxHighlighting(syntax), theme, editableLines,
        EditorView.contentAttributes.of({ 'aria-label': 'Python code for Last shuttle', spellcheck: 'false' }),
        EditorState.changeFilter.of((transaction) => {
          const end = transaction.startState.doc.length - suffix.length;
          let allowed = true;
          transaction.changes.iterChangedRanges((from, to) => {
            if (from < prefix.length || to > end) allowed = false;
          });
          if (!allowed) onBlocked();
          return allowed;
        }),
        EditorView.updateListener.of((update) => {
          if (!update.docChanged) return;
          const { doc } = update.state;
          try {
            localStorage.setItem(draftKey, doc.sliceString(prefix.length, doc.length - suffix.length));
          } catch {
            // The editor also works when the browser blocks local storage.
          }
          onChange();
        }),
      ],
    }),
  });

  return {
    code: () => view.state.doc.toString(),
    reset() {
      view.dispatch({
        changes: { from: prefix.length, to: view.state.doc.length - suffix.length, insert: starter },
        selection: { anchor: prefix.length + 4 },
      });
      view.focus();
    },
  };
}

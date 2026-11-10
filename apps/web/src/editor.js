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
  { tag: tags.keyword, color: '#e4d5ff' },
  { tag: tags.comment, color: 'var(--muted)', fontStyle: 'italic' },
  { tag: tags.number, color: '#f6c294' },
  { tag: tags.string, color: '#b5e8bb' },
  { tag: tags.function(tags.variableName), color: '#99e8e0' },
]);

const theme = EditorView.theme({
  '&': { backgroundColor: 'var(--inset)', color: 'var(--ink)', fontSize: '.94rem' },
  '&.cm-focused': { outline: '2px solid var(--accent)', outlineOffset: '-2px' },
  '.cm-scroller': { lineHeight: '1.65' },
  '.cm-content': { fontFamily: 'var(--mono)', padding: '13px 0', caretColor: '#fff' },
  '.cm-line': { padding: '0 10px' },
  '.cm-gutters': { backgroundColor: 'var(--inset)', color: 'var(--muted)', border: 0 },
  '.cm-activeLine, .cm-activeLineGutter': { backgroundColor: 'var(--hover)' },
  '.cm-cursor': { borderLeftColor: '#fff' },
  '.cm-editable-line': { backgroundColor: 'color-mix(in srgb, var(--raised) 45%, var(--inset))' },
  '.cm-selectionBackground, &.cm-focused .cm-selectionBackground, .cm-content ::selection': { background: 'var(--hover)' },
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
        basicSetup, python(), syntaxHighlighting(syntax), theme, editableLines, EditorView.lineWrapping,
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

import { parser } from "./syntax.grammar";
import {
  LezerLanguage,
  LanguageSupport
  /* indentNodeProp,
  foldNodeProp,
  foldInside,
  delimitedIndent */
} from "@codemirror/language";
import { styleTags, tags as t } from "@codemirror/highlight";
import { completeFromList, Completion } from "@codemirror/autocomplete";
import { EditorView } from "@codemirror/view";

export const papershiveLanguage = LezerLanguage.define({
  parser: parser.configure({
    props: [
      /* foldNodeProp.add({
        Application: foldInside
      }), */
      styleTags({
        Identifier: t.variableName,
        String: t.string,
        LineComment: t.lineComment,
        "( )": t.paren,
        LogicAnd: t.logicOperator,
        LogicOr: t.logicOperator,
        CompareOp: t.compareOperator,
        Function: t.function,
        "au: a: t: ta: y: c:": t.keyword
      })
    ]
  }),
  languageData: {
    commentTokens: { line: ";" }
  }
});

export const papershiveCompletion = papershiveLanguage.data.of({
  autocomplete: completeFromList([
    {
      label: "au:",
      type: "function",
      detail: "Authors",
      apply: (
        view: EditorView,
        completion: Completion,
        from: number,
        to: number
      ) => {
        console.log(EditorView, completion, from, to);
      }
    },
    { label: "a:", type: "function", detail: "Abstracts", apply: 'a:("")' },
    { label: "t:", type: "function", detail: "Titless" },
    { label: "ta:", type: "function", detail: "Titles and Abstracts" },
    { label: "y:", type: "function", detail: "Year" },
    { label: "c:", type: "function", detail: "Citations" },
    {
      label: "AND",
      type: "logicOperator"
    },
    { label: "OR", type: "logicOperator" }
  ])
});

export function papershive() {
  return new LanguageSupport(papershiveLanguage, [papershiveCompletion]);
}

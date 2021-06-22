import { parser } from "./syntax.grammar";
import {
  LezerLanguage,
  LanguageSupport,
  // indentNodeProp,
  foldNodeProp,
  foldInside,
  delimitedIndent
} from "@codemirror/language";
import { styleTags, tags as t } from "@codemirror/highlight";
import { completeFromList, Completion } from "@codemirror/autocomplete";
import { EditorView } from "@codemirror/view";

export const papershiveLanguage = LezerLanguage.define({
  parser: parser.configure({
    props: [
      foldNodeProp.add({
        BinaryExpression: foldInside,
        Function: foldInside
      }),
      styleTags({
        String: t.string,
        LineComment: t.lineComment,
        "( )": t.paren,
        LogicAnd: t.operatorKeyword,
        LogicOr: t.operatorKeyword,
        CompareOp: t.compareOperator,
        Keyword: t.keyword
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
      apply: 'au:("")'
    },
    { label: "a:", type: "function", detail: "Abstracts", apply: 'a:("")' },
    { label: "t:", type: "function", detail: "Titless", apply: 't:("")' },
    {
      label: "ta:",
      type: "function",
      detail: "Titles and Abstracts",
      apply: 'ta:("")'
    },
    { label: "c:", type: "function", detail: "Citations", apply: 'c:("")' },
    { label: "y:<", type: "function", detail: "Published before year" },
    { label: "y:>", type: "function", detail: "Published after year" },
    {
      label: "y:<=",
      type: "function",
      detail: "Published before and including year"
    },
    {
      label: "y:>=",
      type: "function",
      detail: "Published after and including year"
    },
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

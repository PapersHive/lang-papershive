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
import { completeFromList } from "@codemirror/autocomplete";

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
        LogicOp: t.logicOperator,
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
    { label: "au:", type: "function" },
    { label: "a:", type: "function" },
    { label: "t:", type: "function" },
    { label: "ta:", type: "function" },
    { label: "y:", type: "function" },
    { label: "c:", type: "function" },
    { label: "AND", type: "logicOperator" },
    { label: "OR", type: "logicOperator" }
  ])
});

export function papershive() {
  return new LanguageSupport(papershiveLanguage, [papershiveCompletion]);
}

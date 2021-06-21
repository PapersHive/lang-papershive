import { parser } from "./syntax.grammar";
import {
  LezerLanguage,
  LanguageSupport,
  indentNodeProp,
  foldNodeProp,
  foldInside,
  delimitedIndent
} from "@codemirror/language";
import { styleTags, tags as t } from "@codemirror/highlight";

export const papershiveLanguage = LezerLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Application: delimitedIndent({ closing: ")", align: false })
      }),
      foldNodeProp.add({
        Application: foldInside
      }),
      styleTags({
        Identifier: t.variableName,
        Boolean: t.bool,
        String: t.string,
        LineComment: t.lineComment,
        "( )": t.paren,
        And: t.keyword,
        Or: t.keyword,
        Keyword: t.keyword
      })
    ]
  }),
  languageData: {
    commentTokens: { line: ";" }
  }
});

export function papershive() {
  return new LanguageSupport(papershiveLanguage);
}

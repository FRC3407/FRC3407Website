import reactSyntaxHighlighter, {
  PrismLight as SyntaxHighlighter,
} from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import React from "react";
import jsx from "react-syntax-highlighter/dist/cjs/languages/prism/jsx";
import ts from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import md from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";
import cpp from "react-syntax-highlighter/dist/cjs/languages/prism/cpp";
import java from "react-syntax-highlighter/dist/cjs/languages/prism/java";

SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("ts", ts);
SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("md", md);
SyntaxHighlighter.registerLanguage("java", java);
SyntaxHighlighter.registerLanguage("c++", cpp);

export default function CodeBlock({
  lang,
  children,
  fontSize = "medium",
}: {
  lang: string;
  children: string;
  fontSize?: string;
}) {
  const [init, setInit] = React.useState(false);

  React.useEffect(() => {
    setInit(true);
  }, []);

  if (init) {
    return (
      <SyntaxHighlighter
        language={lang}
        style={a11yDark}
        customStyle={{
          fontSize: fontSize,
        }}
        showLineNumbers
        wrapLines
      >
        {formatTabs(children.trim())}
      </SyntaxHighlighter>
    );
  }

  return <>Loading Code Block...</>;
}

function formatTabs(str: string) {
  let startAt: number = 0;
  return str
    .split("\n")
    .map((line, index, array) => {
      if (index === 1) {
        const cloneArray = [...array];
        cloneArray.shift();
        const leadingSpaces = line.length - line.trimStart().length;
        let every = cloneArray.every(
          (codeline) =>
            codeline.length - codeline.trimStart().length >= leadingSpaces
        );
        if (every) startAt = leadingSpaces;
      }

      return line.substring(startAt);
    })
    .join("\n");
}

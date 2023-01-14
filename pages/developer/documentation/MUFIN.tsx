import CodeBlock from "@components/codeBlock";
import Layout from "@components/layout";
import Link from "next/link";

export default function MUFIN() {
  return (
    <Layout title="MUFIN System">
      <h1>The MUFIN System</h1>
      <p>
        The MUFIN (Mark Up File Inital Renderer) system is a system that
        automatically renders .md files into pages through the use of the file
        system and an .md to .html compiler.
      </p>
      <p>
        An example of the MUFIN system can be seen in the Robot Profiles (
        <Link href="/developer/documentation/robot-profiles">
          Documentation
        </Link>
        )
      </p>

      <CodeBlock lang="tsx">
        {`
                    import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
                    import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
                    
                    export default function CodeBlock({ lang, children }: { lang: string, children: string }) {
                        return (
                            <SyntaxHighlighter language={lang}>
                                {children}
                            </SyntaxHighlighter>
                        )
                    }
                `}
      </CodeBlock>
    </Layout>
  );
}

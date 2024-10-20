import { Code, InlineCode } from "./code";
import { WithNotes } from "./notes";
import { NoteTooltip } from "./notes.tooltip";
import { z } from "zod";
import { RawCode } from "codehike/code";
import { parseProps, Block, CodeBlock } from "codehike/blocks";
import { Terminal, TerminalPicker } from "./terminal";

function DocsKitCode(props: { codeblock: RawCode }) {
  const { codeblock, ...rest } = props;

  if (codeblock.lang == "package-install") {
    return (
      // @ts-ignore
      <TerminalPicker
        store="package-install"
        code={[
          {
            ...codeblock,
            value: "$ npm install " + codeblock.value,
            meta: "npm",
            lang: "bash",
          },
          {
            ...codeblock,
            value: "$ yarn add " + codeblock.value,
            meta: "yarn",
            lang: "bash",
          },
          {
            ...codeblock,
            value: "$ pnpm add " + codeblock.value,
            meta: "pnpm",
            lang: "bash",
          },
        ]}
      />
    );
  }

  if (codeblock.lang == "terminal") {
    // @ts-ignore
    return <Terminal codeblock={{ ...codeblock, lang: "bash" }} />;
  }

  // @ts-ignore
  return <Code {...rest} codeblocks={[props.codeblock]} />;
}

function CodeTabs(props: unknown) {
  const { code, flags, storage } = parseProps(
    props,
    Block.extend({
      code: z.array(CodeBlock),
      flags: z.string().optional(),
      storage: z.string().optional(),
    })
  );
  // @ts-ignore
  return <Code codeblocks={code} flags={flags} storage={storage} />;
}

function Link(props: any) {
  if (props.href == "tooltip") {
    return <NoteTooltip name={props.title}>{props.children}</NoteTooltip>;
  }
  return <a {...props} />;
}

export const docskit = {
  DocsKitCode,
  CodeTabs,
  WithNotes,
  a: Link,
  DocsKitInlineCode: InlineCode,
};

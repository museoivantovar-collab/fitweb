/**
 * Minimal Payload CMS Lexical → HTML serializer.
 * Handles paragraphs, headings, bold/italic text, and line breaks.
 * Unknown node types are skipped gracefully.
 */

interface LexicalTextNode {
  type: "text";
  text: string;
  format?: number; // bitmask: 1=bold, 2=italic, 4=strikethrough, 8=underline
}

interface LexicalLinebreakNode {
  type: "linebreak";
}

interface LexicalElementNode {
  type: string;
  tag?: string; // for heading: "h1"–"h6"
  children?: LexicalNode[];
}

type LexicalNode = LexicalTextNode | LexicalLinebreakNode | LexicalElementNode;

interface LexicalRoot {
  root: {
    children: LexicalNode[];
  };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function serializeNode(node: LexicalNode): string {
  if (node.type === "linebreak") {
    return "<br />";
  }

  if (node.type === "text") {
    const textNode = node as LexicalTextNode;
    let text = escapeHtml(textNode.text);
    const format = textNode.format ?? 0;
    if (format & 1) text = `<strong>${text}</strong>`;
    if (format & 2) text = `<em>${text}</em>`;
    if (format & 4) text = `<s>${text}</s>`;
    if (format & 8) text = `<u>${text}</u>`;
    return text;
  }

  const el = node as LexicalElementNode;
  const children = (el.children ?? []).map(serializeNode).join("");

  switch (el.type) {
    case "paragraph":
      return children.trim() ? `<p>${children}</p>` : "";
    case "heading": {
      // Offset headings: h1→h2, h2→h3, h3→h4, else h4
      const tagMap: Record<string, string> = {
        h1: "h2",
        h2: "h3",
        h3: "h4",
        h4: "h4",
        h5: "h4",
        h6: "h4",
      };
      const tag = tagMap[el.tag ?? "h1"] ?? "h2";
      return `<${tag}>${children}</${tag}>`;
    }
    case "list": {
      const listEl = el as LexicalElementNode & { listType?: string };
      const tag = (listEl as any).listType === "number" ? "ol" : "ul";
      return `<${tag}>${children}</${tag}>`;
    }
    case "listitem":
      return `<li>${children}</li>`;
    case "quote":
      return `<blockquote>${children}</blockquote>`;
    case "link": {
      const linkEl = el as LexicalElementNode & { fields?: { url?: string } };
      const href = escapeHtml((linkEl as any).fields?.url ?? "#");
      return `<a href="${href}">${children}</a>`;
    }
    default:
      // Render children of unknown containers, skip unknown leaf nodes
      return children;
  }
}

export function serializeRichText(content: unknown): string {
  if (!content || typeof content !== "object") return "";
  const root = content as LexicalRoot;
  if (!root.root?.children) return "";
  return root.root.children.map(serializeNode).join("\n");
}

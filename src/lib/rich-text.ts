export interface RichTextBlock {
  _type?: string;
  style?: string;
  children?: Array<{ _type?: string; text?: string }>;
}

export interface RichTextNode {
  type: 'heading' | 'paragraph' | 'blockquote';
  level?: 1 | 2 | 3 | 4;
  text: string;
}

export function blocksToRichNodes(value: unknown): RichTextNode[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((block) => {
      const typedBlock = block as RichTextBlock;
      if (!typedBlock || typedBlock._type !== 'block' || !Array.isArray(typedBlock.children)) {
        return null;
      }

      const text = typedBlock.children.map((child) => child?.text || '').join('').trim();
      if (!text) return null;

      const style = typedBlock.style || 'normal';

      if (style === 'blockquote') {
        return { type: 'blockquote' as const, text };
      }

      if (style.startsWith('h')) {
        const level = Number(style.replace('h', '')) as 1 | 2 | 3 | 4;
        if ([1, 2, 3, 4].includes(level)) {
          return { type: 'heading' as const, level, text };
        }
      }

      return { type: 'paragraph' as const, text };
    })
    .filter(Boolean) as RichTextNode[];
}

import { Block } from '../core/Block';

export function render(query:string, block:Block) {
  const root = document.querySelector(query);
  if (root instanceof HTMLElement) {
    root.append(block.getContent() as Node);
  }
  return root;
}

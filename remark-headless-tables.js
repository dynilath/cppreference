import { visit } from 'unist-util-visit';
import { toMarkdown } from 'mdast-util-to-markdown';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { gfmTable } from 'micromark-extension-gfm-table';
import { gfmTableFromMarkdown } from 'mdast-util-gfm-table';
import { mdxFromMarkdown } from "mdast-util-mdx";
import { mdxjs } from "micromark-extension-mdxjs";

const remarkHeadlessTable = function () {
    return (tree, file) => {
        visit(tree, 'paragraph', (node, index, parent) => {
            if (!parent || typeof index !== 'number') return;

            const children = node.children;
            if (children.length === 0 || children[0].type !== 'text') return;

            const textContent = file.toString().slice(node.position.start.offset, node.position.end.offset);

            const firstLine = textContent.split('\n')[0].trim();

            // we supports the following table format:
            // |---|---|
            // | :--- | --- |
            // | :---: | :---: |
            // | --- | --- |
            // | --- | ---: |
            if (/^\|.*\|$/.test(firstLine) === false) return;

            let tableTextNew = '|';

            for (let i = 0; i < firstLine.split('|').filter(Boolean).length; i++) {
                tableTextNew += ' |';
            }

            tableTextNew += '\n';
            tableTextNew += textContent;

            const table = fromMarkdown(tableTextNew, {
                extensions: [mdxjs(), gfmTable()],
                mdastExtensions: [mdxFromMarkdown(), gfmTableFromMarkdown()],
            }).children[0];

            parent.children.splice(index, 1, table);
        });
    };
};

export default remarkHeadlessTable;
// src/lib/constants.ts
import {all, createLowlight} from "lowlight";

import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'

const lowlight = createLowlight(all)

lowlight.highlight('html', '"use strict";')
lowlight.highlight('css', '"use strict";')
lowlight.highlight('js', '"use strict";')
lowlight.highlight('ts', '"use strict";')

lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)

// import {StarterKit} from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import {ReactNodeViewRenderer} from "@tiptap/react";
import Heading from "@tiptap/extension-heading";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Dropcursor from "@tiptap/extension-dropcursor";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import {Color} from "@tiptap/extension-color";
import {CharacterCount} from "@tiptap/extension-character-count";
import Focus from "@tiptap/extension-focus";
import Code from "@tiptap/extension-code";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import {FontFamily} from "@tiptap/extension-font-family";
import ListKeymap from "@tiptap/extension-list-keymap";
import Blockquote from "@tiptap/extension-blockquote";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Link from "@tiptap/extension-link";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import ImageResize from 'tiptap-extension-resize-image'
import Underline from "@tiptap/extension-underline";
import HardBreak from '@tiptap/extension-hard-break'
import CodeBlockComponent from "@/components/tiptap/extensions/CodeBlockComponent";

export const TiptapExtensions = [
    // 浏览器中可以拖动内容到其他位置, tauri中不行
    // StarterKit.configure({
    // Disable an included extension
    // history: true, // undo, redo
    // codeBlock: false,
    // code: false
    // gapcursor: true,
    // dropcursor: true,
    // heading: {
    //     levels: [1, 2, 3, 4]
    // }
    // }),
    // StarterKit,
    CodeBlockLowlight
        .extend({
            addNodeView() {
                // @ts-ignore
                return ReactNodeViewRenderer(CodeBlockComponent)
            },
        })
        .configure({lowlight}),
    // Heading.configure({
    //     levels: [1, 2, 3, 4]
    // }),
    Heading,
    HardBreak,
    Document,
    Underline,
    Paragraph,
    Dropcursor,
    Text,
    TextStyle,
    Color,
    CharacterCount.configure({
        mode: 'nodeSize',
    }),
    Focus.configure({
        className: 'has-focus',
        mode: 'all',
    }),
    Code,
    BulletList,
    ListItem,
    FontFamily,
    ListKeymap,
    // CodeBlock,
    Blockquote,
    HorizontalRule,
    Highlight.configure({
        // 适配色盘
        multicolor: true,
    }),
    // Highlight,
    Image.configure({
        allowBase64: true,
        // inline: true, // inline 不能resize, 不能拖动, 不能选中
    }),
    ImageResize,
    Table.configure({
        resizable: true,
        allowTableNodeSelection: true
    }),
    TableRow,
    TableHeader,
    TableCell,
    Text,
    TaskList,
    TaskItem.configure({
        nested: true,
        HTMLAttributes: {
            class: 'list-none',
        },
    }),
    Link.configure({
        HTMLAttributes: {
            class: 'underline cursor-pointer text-blue-400 tiptap-link',
        },
        // openOnClick: true,
        // 编辑器内点击不打开, 但是read页渲染后点击可以打开
        openOnClick: false,
        // linkOnPaste: true,
        autolink: true,
        defaultProtocol: 'https',
    }),
    Highlight.configure({multicolor: true}),
    Subscript,
    Superscript,
    TextAlign.configure({
        types: ['heading', 'paragraph'],
    }),
    AudioNode,
]
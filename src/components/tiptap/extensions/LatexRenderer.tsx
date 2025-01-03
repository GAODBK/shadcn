// src/components/tiptap/extensions/LatexRenderer.ts
import React from 'react';
import 'katex/dist/katex.min.css';
import {BlockMath} from 'react-katex';

// @ts-ignore
const LatexRenderer = ({formula}) => {
    return <BlockMath>{formula}</BlockMath>;
};

export default LatexRenderer;
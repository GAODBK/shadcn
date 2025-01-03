// src/components/tiptap/TipTap.tsx
'use client';
import Text from '@tiptap/extension-text'
import React, {useEffect, useRef, useState} from 'react';
import {useEditorStore} from "@/hooks/use-editor-store";
import {EditorContent, useEditor} from "@tiptap/react";
import {TiptapExtensions} from '@/lib/constants';
import {useCompletion} from "ai/react"; // pnpm i ai@3.4.33
import {RichTextEditor, Link} from '@mantine/tiptap';
import StarterKit from '@tiptap/starter-kit';

import '@mantine/core/styles.css';
import {pasteImage} from "@/lib/utils";
import MantineFloatingToolbar from "@/components/tiptap/bar/MantineFloatingToolbar";
import MantineBubbleToolbar from "@/components/tiptap/bar/MantineBubbleToolbar";
import BarItems from "@/components/tiptap/item/BarItems";

const TipTap = ({description, onChange, slug, onSubmit}: {
    description: string
    onChange: (richText: string) => void
    onSubmit: () => Promise<void>
    slug: string
}) => {
    const {setEditor} = useEditorStore()

    // 编辑器设置, 比如使用哪些插件, 支持哪些功能
    const editor = useEditor({
        extensions: [
            ...TiptapExtensions,
            StarterKit,
            // customText,
            Text.extend({
                addKeyboardShortcuts() {
                    return {
                        'Shift-a': () => {
                            // console.log('activate AI')
                            // take the last 30 words
                            // const prompt = this.editor.getText().split(' ').slice(-30).join(' ')
                            const prompt = this.editor.getText().slice(-120)
                            // const prompt = this.editor.getText().slice(-30)
                            // console.log(prompt)
                            complete(prompt)
                            return true
                        },
                        'Ctrl-shift-s': () => {
                            onChange(this.editor.getHTML())
                            return true
                        },
                        'Ctrl-z': () => {
                            this.editor.commands.undo();
                            return true
                        },
                        'Ctrl-y': () => {
                            this.editor.commands.redo();
                            return true
                        },
                        'Ctrl-shift-z': () => {
                            this.editor.commands.redo();
                            return true
                        }
                    }
                }
            }),
        ],
        autofocus: true,
        // 数据库获取富文本, 直接设置
        content: description,
        editorProps: {
            attributes: {
                class:
                    'p-2 rounded-sm focus:outline-none border border-[#C7C7C7] cursor-text ' +
                    'disabled:cursor-not-allowed disabled:opacity-50 '
            }
        },
        enableContentCheck: true,
        onUpdate({editor}) {
            // 保存到外部变量, 方便外部保存数据库
            onChange(editor.getHTML())
            setEditor(editor)
        },
        // onSelectionUpdate({editor}) {
        //     // 保存到外部变量, 方便外部保存数据库
        //     onChange(editor.getHTML())
        //     setEditor(editor)
        // },
        // onTransaction({editor}) {
        //     // 保存到外部变量, 方便外部保存数据库
        //     onChange(editor.getHTML())
        //     setEditor(editor)
        // },
        // onFocus({editor}) {
        //     // 保存到外部变量, 方便外部保存数据库
        //     onChange(editor.getHTML())
        //     setEditor(editor)
        // },
        // onBlur({editor}) {
        //     // 保存到外部变量, 方便外部保存数据库
        //     onChange(editor.getHTML())
        //     setEditor(editor)
        // },
        // onContentError({editor}) {
        //     // 保存到外部变量, 方便外部保存数据库
        //     onChange(editor.getHTML())
        //     setEditor(editor)
        // },
    })

    // ai代写
    const {complete, completion} = useCompletion({
        api: 'http://localhost:3000/api/completion',
    })
    const lastCompletion = useRef('')
    useEffect(() => {
        if (!editor || !completion) return
        // 新的completion(ai之前生成的sentence + ai生成的新的char) 减去 上次的completion的长度
        // 得出新的char
        const diff = completion.slice(lastCompletion.current.length);
        // 更新lastCompletion
        lastCompletion.current = completion;
        // 当前editor后面加上新char
        editor.commands.insertContent(diff);
    }, [completion, editor])

    // 防止编辑器未加载时操作出错
    // @ts-ignore
    const [isEditable, setIsEditable] = useState(true)

    // 监听粘贴事件， 可以从网站等地方复制，可以复制截图，但是不能从本地文件复制
    useEffect(() => {
        if (editor) {
            // @ts-ignore
            editor.on('paste', async (event) => {
                await pasteImage(event, editor, slug)
            });
            // editor.setEditable(isEditable)
            // if (editor.getHTML() !== description) {
            //     editor.commands.setContent(description);
            // }
        }
    }, [description, isEditable, editor])

    if (!editor) return

    return (
        <>
            <RichTextEditor editor={editor}>
                <MantineBubbleToolbar editor={editor}/>
                <MantineFloatingToolbar editor={editor}/>
                {/*<RichTextEditor.Toolbar sticky stickyOffset={60}>*/}
                <RichTextEditor.Toolbar sticky stickyOffset={0}>
                    <BarItems editor={editor}/>
                </RichTextEditor.Toolbar>
                <RichTextEditor.Content/>
            </RichTextEditor>

            {/* 底部字数统计 */}
            <div
                className={`h-14 character-count items-center my-4 flex gap-x-2`}>
                {editor?.storage.characterCount.characters()} 字符数
                {' '}
                {editor?.storage.characterCount.words()} 字数
                <button
                    className={`w-14 h-8 text-sm rounded-md text-white bg-green-600`}
                    onClick={() => onSubmit()}>
                    保存
                </button>
            </div>
        </>
    );
};

export default TipTap;
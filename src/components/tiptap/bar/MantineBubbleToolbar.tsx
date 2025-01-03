// src/components/tiptap/bar/MantineBubbleToolbar.tsx
'use client';
import '@/app/(knowledge)/[username]/[libraryId]/style.scss'
import {BubbleMenu, type Editor} from "@tiptap/react";
import {RichTextEditor} from '@mantine/tiptap';
import FontHighLightBarItem from "@/components/tiptap/item/FontHighLightBarItem";
import FontColorBarItem from "@/components/tiptap/item/FontColorBarItem";
import LineHeightBarItem from "@/components/tiptap/item/LineHeightBarItem";

type Props = {
    editor: Editor | null
}

export default function MantineBubbleToolbar({editor}: Props) {
    if (!editor)
        return null

    // const {slug} = useSlugStore()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const addImage = addImageWrapper(editor, slug)

    // const setLink = setLinkWrapper(editor)

    // const handleAudioGenerateClick = handleAudioGenerateClickWrapper(editor)

    // const addFileLink = addFileLinkWrapper(editor)

    return (
        <>
            {editor && (
                <BubbleMenu
                    // className={`overflow-auto`}
                    editor={editor}>
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.H1/>
                        <RichTextEditor.H2/>
                        <RichTextEditor.H3/>
                        <RichTextEditor.H4/>

                        <RichTextEditor.Bold/>
                        <RichTextEditor.Italic/>
                        <RichTextEditor.Underline/>
                        <RichTextEditor.Strikethrough/>
                        <RichTextEditor.ClearFormatting/>
                        {/*<RichTextEditor.Highlight />*/}
                        <RichTextEditor.Control
                            // onClick={() => editor?.commands.insertContent('⭐')}
                            // aria-label="Insert star emoji"
                            // title="Insert star emoji"
                        >
                            <FontHighLightBarItem size={'sm'}/>
                        </RichTextEditor.Control>
                        <RichTextEditor.Control
                        >
                            <FontColorBarItem size={'sm'}/>
                        </RichTextEditor.Control>
                        <RichTextEditor.Control
                        >
                            <LineHeightBarItem />
                        </RichTextEditor.Control>

                        <RichTextEditor.Subscript/>
                        <RichTextEditor.Superscript/>

                        <RichTextEditor.Link/>
                        <RichTextEditor.Unlink/>
                    </RichTextEditor.ControlsGroup>
                </BubbleMenu>
            )}
        </>
    )
}
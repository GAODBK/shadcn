// src/components/tiptap/item/ExcalidrawBarItem.tsx
import React from 'react';
import {Editor} from "@tiptap/react";
import {Toggle} from "@/components/ui/toggle";
import {cn} from "@/lib/utils";
import Image from "next/image";

const ExcalidrawBarItem = ({editor}: { editor: Editor }) => {

    return (
        <Toggle
            className={cn(
                'size-6 shrink-0 flex flex-col items-center justify-center rounded-sm ',
                'hover:bg-neutral-200/80 overflow-hidden text-sm'
            )}
            onClick={() => {
                editor?.chain().focus().insertContent(`
                       <excalidraw-component></excalidraw-component>
                `).run()
            }}
        >
            <Image
                alt={`excalidraw`}
                src={`/board-svgrepo-com.svg`}
                width={16}
                height={16}
            />
        </Toggle>
    );
};

export default ExcalidrawBarItem;
// src/app/(knowledge)/[username]/[libraryId]/[noteId]/_components/note-home-header.tsx
import React from 'react';
import NoteHomeHeaderNameInput
    from "@/app/(knowledge)/[username]/[libraryId]/[noteId]/_components/note-home-header-name-input";
import {RiRobot2Line} from "react-icons/ri";
import Link from "next/link";
import {FaUserPlus} from "react-icons/fa6";
import {BsChatText} from "react-icons/bs";
import {AiOutlineInsertRowRight} from "react-icons/ai";
import NoteHomeHeaderEditButton
    from "@/app/(knowledge)/[username]/[libraryId]/[noteId]/_components/note-home-header-edit-button";
import NoteHomeHeaderAIButton
    from "@/app/(knowledge)/[username]/[libraryId]/[noteId]/_components/note-home-header-ai-button";

const NoteHomeHeader = ({id, libraryId, name}: {
    id: string
    libraryId: string
    name: string
}) => {

    return (
        <div className={`h-14 border-b p-2 flex justify-between items-center`}>
            <NoteHomeHeaderNameInput id={id} name={name}/>
            <div className={`flex items-center gap-x-3`}>
                <NoteHomeHeaderAIButton  id={id} libraryId={libraryId}/>
                <FaUserPlus className={`size-6`}/>
                <span/>
                <span className={`py-1.5 h-8 px-4 font-semibold rounded-md text-sm border`}>
                    分享
                </span>
                <NoteHomeHeaderEditButton id={id} libraryId={libraryId}/>
                <BsChatText className={`size-5`}/>
                <AiOutlineInsertRowRight className={`size-5`}/>
            </div>
        </div>
    );
};

export default NoteHomeHeader;
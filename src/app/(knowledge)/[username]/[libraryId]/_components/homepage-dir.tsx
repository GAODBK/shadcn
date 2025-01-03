// src/app/(knowledge)/[username]/[libraryId]/_components/homepage-dir.tsx
import React from 'react';
import {db} from "@/lib/db";
import {Library, Note} from "@prisma/client";
import HomepageDirItem from "@/app/(knowledge)/[username]/[libraryId]/_components/homepage-dir-item";

const HomepageDir = async ({library}: { library: Library & { Note: Note[] } }) => {
    async function getNotes(id: string): Promise<null | Note> {
        const node = await db.note.findUnique({
            where: {id},
            include: {
                childrenNote: {
                    where: {
                        parentNoteId: id,
                    },
                },
            },
        });

        if (!node) {
            // @ts-ignore
            return {};
        }

        if (node.childrenNote.length > 0) {
            for (const child of node.childrenNote) {
                const childNodes = await getNotes(child.id);
                // @ts-ignore
                child.childrenNote = childNodes;
            }
        }

        return node;
    }

    let notes: Note[] = []
    if (library?.Note && library?.Note.length > 0) {
        for (let note of library?.Note) {
            // @ts-ignore
            notes.push(await getNotes(note.id))
        }
    }

    return (
        <div className={`w-full p-4 flex flex-col`}>
            <h2 className={`py-2 text-2xl font-semibold text-center`}>目录</h2>
            <HomepageDirItem notes={notes}/>
        </div>
    );
};

export default HomepageDir;
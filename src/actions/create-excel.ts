// src/actions/create-excel.ts
'use server';
import {db} from "@/lib/db";

interface Prop {
    libraryId: string;
    name: string
}

export const createExcel = async (value: Prop) => {
    await db.excel.create({
        data: {...value}
    })
}
// src/app/(dashboard)/dashboard/library/actions/new-library.ts
'use server';
import {db} from "@/lib/db";

export const createLibrary = async (values: {
    name: string
    description: string
}) => {
    return await db.library.create({
        data: {
            ...values
        }
    })
}
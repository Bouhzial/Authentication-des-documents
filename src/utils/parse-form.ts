import type { NextApiRequest } from "next";
import mime from "mime";
import { join } from "path";
import formidable from "formidable";
import { mkdir, stat } from "fs/promises";

export const FormidableError = formidable.errors.FormidableError;

export const parseForm = async (
    req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
    return new Promise(async (resolve, reject) => {
        const uploadDir = join(
            process.env.ROOT_DIR || process.cwd(),
            `/public/uploads/profilepics`
        );

        try {
            await stat(uploadDir);
        } catch (e: any) {
            if (e.code === "ENOENT") {
                await mkdir(uploadDir, { recursive: true });
            } else {
                console.error(e);
                reject(e);
                return;
            }
        }

        const form = formidable({
            maxFileSize: 5 * 1024 * 1024, // 5mb
            uploadDir,
            filename: (_name, _ext, part) => {
                const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                const filename = `${uniqueSuffix}.${mime.getExtension(part.mimetype || "") || "unknown"
                    }`;
                return filename;
            },
            filter: (part) => {
                return (
                    part.mimetype?.includes("image") || false
                );
            },
        });

        form.parse(req, function (err, fields, files) {
            if (err) reject(err);
            else resolve({ fields, files });
        });
    });
};
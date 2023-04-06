import { parseForm, FormidableError } from "../../../utils/parse-form";


import type { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "../../../server/auth";
import formidable from "formidable";
import { Role } from "../../../types/types";

export const config = {
    api: {
        bodyParser: false,
    },
};


const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<{
        data: {
            url: string;
        } | null;
        error: string | null;
    }>
) => {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        res.status(405).json({
            data: null,
            error: "Method Not Allowed",
        });
        return;
    }
    const session = await getServerAuthSession({ req, res });

    if (!session || !session.user) return res.status(403).json({
        data: null,
        error: "Unauthorized",
    });

    if (session.user.role != Role.superAdmin) return res.status(403).json({
        data: null,
        error: "Not super admin",
    });

    try {

        const { fields, files } = await parseForm(req);

        if (!files) return res.status(403).json({
            data: null,
            error: "no image sent !",
        });

        const image = await prisma.image.findFirst({
            where: {
                user_id: Number(fields.id)
            }
        })

        if (image?.path) return res.status(403).json({
            data: null,
            error: "image already set",
        });

        await prisma.image.update({
            where: {
                user_id: Number(fields.id)
            },
            data: {
                path: (files?.files as formidable.File).newFilename
            }
        })

        res.status(200).json({
            data: {
                url: "Created Successfully",
            },
            error: null,
        });


    } catch (e) {
        if (e instanceof FormidableError) {
            res.status(e.httpCode || 400).json({ data: null, error: e.message });
        } else {
            console.error(e);
            res.status(500).json({ data: null, error: "Internal Server Error" });
        }
    }


}


export default handler;

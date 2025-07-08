import { ApiExpress, Auth } from '../../express/express'
import { JoiValidator } from '../../joiValidator/joiValidator'
import { Request, Response } from 'express'
import { GetPictureRequest } from './picture.joi'
import { PictureService } from './picture.service'

export class PictureController {
    private this: PictureController

    public static async init() {
        const endpoint: string = '/picture/'
        ApiExpress.get(endpoint + 'get', this.getPicture, [], Auth.None)
    }

    private static async getPicture(req: Request, res: Response) {
        return await JoiValidator(req.query, async (data) => PictureService.getPictire(), GetPictureRequest)
    }
}
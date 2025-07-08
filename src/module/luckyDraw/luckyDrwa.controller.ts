import { ApiExpress, Auth } from '../../express/express'
import { JoiValidator } from '../../joiValidator/joiValidator'
import { Request, Response } from 'express'
import { LuckyDrawService } from './luckyDraw.service'
import { GetWinnerRequest } from './luckyDraw.joi'

export class LuckyDrawController {
    private this: LuckyDrawController

    public static async init() {
        const endpoint: string = '/lucky-draw/'
        ApiExpress.get(endpoint + 'get/winner', this.getWinner, [], Auth.None)
    }

    private static async getWinner(req: Request, res: Response) {
        return await JoiValidator(req.query, async (data) => LuckyDrawService.getWinner(data), GetWinnerRequest)
    }
}
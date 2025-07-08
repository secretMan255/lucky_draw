import { log } from '../../utils/utils';
import { MySqlService } from '../../mysql/mysql.service';

interface GetWinnerRequest {
    gift_id: number
    user_id: number
}

export class LuckyDrawService {
    public static async getWinner(data: GetWinnerRequest) {
        return await MySqlService.getWinner(data.gift_id, data.user_id)
    }
}
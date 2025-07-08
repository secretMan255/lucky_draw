import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

export class MySqlService {
    private static Instance: mysql.Connection
    private static MysqlURL: string

    public static async init() {
        dotenv.config()
        this.MysqlURL = process.env.DATABASE_URL || ''

        try {

            // connection to mysql -> mysql.createConnection
            this.Instance = await mysql.createConnection({ uri: this.MysqlURL, multipleStatements: true })
            console.log('Connected to MySQL database!')
        } catch (err) {
            console.error('Error connecting to MySQL:', err)
            throw err
        }
    }

    private static async exec(sp: string, data?: any[]): Promise<any> {
        if (!this.Instance) {
            throw new Error('MySql connection not initializd. Call init first...')
        }

        const query = data?.length ? `CALL ${sp}(${data.map(() => '?').join(',')})` : `CALL ${sp}()`
        const [rows] = await this.Instance.execute(query, data || [])
        return rows[0] || []
    }

    public static async getWinner(giftId: number, userId: number) {
        await this.exec('sp_assign_winner', [giftId, userId])

        const [rows]: any[] = await this.Instance.query(
            `SELECT g.winner_id, u.name AS winner_name
            FROM gifts g
            LEFT JOIN users u ON g.winner_id = u.id
            WHERE g.id = ?`,
            [giftId]
        )
        const result = rows[0]

        const winnerId: number = result?.winner_id
        const winnerName: string = result?.winner_name

        return { winnerId, winnerName, gift: Number(winnerId) === Number(userId) ? 'You have won the gift!' : 'You did not win this time.' }
    }
}

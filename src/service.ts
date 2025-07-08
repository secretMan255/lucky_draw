import dotenv from 'dotenv'
dotenv.config()
import { ApiExpress } from './express/express'
import { CronJob } from 'cron'
import { CronService } from './cron/cronService'
import { PictureController } from './module/picture/picture.controller'
import { MySqlService } from './mysql/mysql.service'
import { LuckyDrawController } from './module/luckyDraw/luckyDrwa.controller'

export class Service {
    private static cronJob: CronJob
    private static cronTime: string
    private static isDirty: boolean = false
    private static runner: NodeJS.Timeout

    public static async init() {
        this.cronTime = process.env.cronTime

        ApiExpress.init()
        await PictureController.init()
        await LuckyDrawController.init()
        await MySqlService.init()
        // await this.start()
    }

    private static async start() {
        this.cronJob = new CronJob(process.env.CRON_TIME, () => this.trigger(), null, true, process.env.TIME_ZONE)
    }

    private static async trigger() {
        this.isDirty = true
        if (undefined === this.runner) {
            this.runner = setTimeout(async () => {
                try {
                    do {
                        this.isDirty = false

                        await this.process()
                    } while (this.isDirty)
                } catch (err) {
                    console.log(`Failed to trigger: `, err)
                }

                this.runner = undefined
                return console.log('Process exited')
            }, 0)
        }
    }

    private static async process() {
        await CronService.process()
    }

    public static async TerminateService() {
        console.log('Service terminate ...')
        this.cronJob.stop()
        ApiExpress.terminate()
        // await MySqlService.terminate()
    }
}
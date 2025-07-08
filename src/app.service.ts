import { log } from './utils/utils'
import { Service } from './service'

class App {
    public static async init() {
        try {
            await Service.init()

            process.on('SIGINT', async () => {
                await Service.TerminateService()
            })
        } catch (err) {
            log(`Init service failed: ${err}`)
            process.exit(1)
        }
    }
}

App.init()
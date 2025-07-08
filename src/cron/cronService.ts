import { log } from '../utils/utils'

export class CronService {
    public static async process(): Promise<void> {
        return new Promise((resolve) => {
            this.Task()
            resolve()
        })
    }

    public static async Task() {
        // log('Task running')
    }
}
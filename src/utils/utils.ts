import moment from 'moment'

export function log(msg: any) {
    console.log(`${moment().format('YYYY-MM-DD HH:mm:ss')} ${msg}`)
}
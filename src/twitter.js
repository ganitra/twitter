/*
 *  Entryfile of Twitter plugin for ganitra.
 *  Created On 26 October 2020
 */

import coverPage from './modules/coverPage/index.js'
import profile from './tasks/profile.js'

export const config = {
    name: 'twitter',
}

export const modules = [coverPage]

export default async () => {
    console.log('Twitter plugin initialized')
    profile()
}

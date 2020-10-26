/*
 *  Entryfile of Twitter plugin for ganitra.
 *  Created On 26 October 2020
 */

import coverPage from './modules/coverPage/index.js'
import profile from './tasks/profile.js'

export const modules = [coverPage]
export const tasks = [profile]

export { default as config } from './config.js'

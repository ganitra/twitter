/*
 *  This ganitra module will update the cover page of a Twitter account.
 *  Created On 26 October 2020
 */

import utilities from '@vasanthdeveloper/utilities'

import { login, twitter } from '../../vendor/index.js'

const action = async ganitra => {
    // login if we're not already
    if (!twitter) await login(ganitra.config.auth)

    const render = await ganitra.render(false)
    if (!render || ganitra.rc.dry == true) return

    const updated = await utilities.promise.handle(
        twitter.accountsAndUsers.accountUpdateProfileBanner({
            banner: Buffer.from(render.result).toString('base64'),
        }),
    )

    // handle the errors
    if (updated.error) {
        ganitra.logger.warning(`Couldn't update cover artwork on Twitter.`)
        return
    }

    ganitra.logger.verbose(
        `Updated cover artwork of @${ganitra.config.username}`,
    )

    await ganitra.snapshot(render)

    return
}

export default {
    action,
    name: 'coverPage',
    interval: 2300 * 60,
}

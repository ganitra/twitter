/*
 *  This ganitra module will update the cover page of a Twitter account.
 *  Created On 26 October 2020
 */

import utilities from '@vasanthdeveloper/utilities'

import { login, twitter } from '../../vendor/index.js'

const action = async ganitra => {
    // login if we're not already
    if (!twitter) await login(ganitra.config.auth)

    const type = ganitra.rc.dry ? 'path' : 'base64'

    // render the image
    const render = await ganitra.render(type)

    // we're done for dry mode
    if (!render || ganitra.rc.dry == true) return

    // send to twitter
    const updated = await utilities.promise.handle(
        twitter.accountsAndUsers.accountUpdateProfileBanner({
            banner: render.rendered,
        }),
    )

    // handle the errors
    if (updated.error) {
        ganitra.logger.warning(`Couldn't update cover artwork on Twitter.`)
        return
    }

    // take a data snapshot to leverage
    // caching
    await ganitra.snapshot(render)

    ganitra.logger.verbose(
        `Updated cover artwork of @${ganitra.config.username}`,
    )
}

export default {
    action,
    name: 'coverPage',
    interval: 2300 * 60,
}

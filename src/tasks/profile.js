/*
 *  This file will fetch data from Twitter and update the profile
 *  information in the database.
 *  Created On 26 October 2020
 */

import vendor, { twitter } from '../vendor/index.js'

const action = async ganitra => {
    // login to twitter if not already logged in
    if (!twitter) await vendor.login(ganitra.config.auth)

    // fetch the profile information
    let profile
    try {
        profile = (
            await twitter.get('users/lookup', {
                screen_name: ganitra.config.username,
            })
        ).data[0]
    } catch (e) {
        ganitra.logger.warning(
            `Couldn't fetch new profile data from Twitter.\nOld data will be used instead.`,
        )
        return
    }

    // update in the database
    ganitra.database.set('id', profile.id_str)
    ganitra.database.set('name', profile.name)
    ganitra.database.set('username', profile.screen_name)
    ganitra.database.set('location', profile.location)
    ganitra.database.set('bio', profile.description)
    ganitra.database.set('followers', profile.followers_count)
    ganitra.database.set('following', profile.friends_count)
    ganitra.database.set('listed', profile.listed_count)
    ganitra.database.set('createdAt', profile.created_at)
    ganitra.database.set('favourites', profile.favourites_count)
    ganitra.database.set('verified', profile.verified)
    ganitra.database.set('tweets', profile.statuses_count)
    ganitra.database.set('tweets', profile.statuses_count)
    ganitra.database.set('theme', profile.profile_link_color)
    ganitra.database.set('link', profile.entities.url.urls[0].expanded_url)

    ganitra.logger.verbose('Updated Twitter profile information')
}

export default { action, name: 'twitterProfile', interval: 1100 * 60 }

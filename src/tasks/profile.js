/*
 *  This file will fetch data from Twitter and update the profile
 *  information in the database.
 *  Created On 26 October 2020
 */

import utilities from '@vasanthdeveloper/utilities'

import { login, twitter } from '../vendor/index.js'

const action = async ganitra => {
    // login if we're not already
    if (!twitter) await login(ganitra.config.auth)

    // fetch the profile information
    const fetch = await utilities.promise.handle(
        twitter.accountsAndUsers.usersLookup({
            screen_name: ganitra.config.username,
        }),
    )

    // handle the errors
    if (fetch.error) {
        ganitra.logger.warning(
            `Couldn't fetch new profile data from Twitter.\nOld data will be used instead.`,
        )
        return
    }

    // now that we know it was successful, let save in our database
    const profile = fetch.returned[0]

    ganitra.database.set('id', profile.id_str)
    ganitra.database.set('name', profile.name)
    ganitra.database.set('username', profile.screen_name)
    ganitra.database.set('location', profile.location)
    ganitra.database.set('bio', profile.description)
    ganitra.database.set('followers', profile.followers_count)
    ganitra.database.set('following', profile.friends_count)
    ganitra.database.set('listed', profile.listed_count)
    ganitra.database.set('createdAt', profile.created_at)
    ganitra.database.set('favorites', profile.favourites_count)
    ganitra.database.set('verified', profile.verified)
    ganitra.database.set('tweets', profile.statuses_count)
    ganitra.database.set('tweets', profile.statuses_count)
    ganitra.database.set('theme', profile.profile_link_color)
    ganitra.database.set('link', profile.entities.url.urls[0].expanded_url)

    await ganitra.logger.verbose(`Updated profile info of ${profile.name}`)
}

export default { action, name: 'twitterProfile', interval: 1100 * 60 }

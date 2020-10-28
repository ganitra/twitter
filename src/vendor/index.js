/*
 *  This file exports Twitter's API functions.
 *  Created On 29 October 2020
 */

import Twit from 'twit'

export let twitter

const login = config => {
    twitter = new Twit({
        consumer_key: config.key,
        consumer_secret: config.key_secret,
        access_token: config.token,
        access_token_secret: config.token_secret,
    })
}

export default { login }

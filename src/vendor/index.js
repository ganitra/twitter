/*
 *  This file exports Twitter's API functions.
 *  Created On 29 October 2020
 */

import { TwitterClient } from 'twitter-api-client'

export let twitter

export const login = config => {
    twitter = new TwitterClient({
        apiKey: config.key,
        apiSecret: config.key_secret,
        accessToken: config.token,
        accessTokenSecret: config.token_secret,
    })
}

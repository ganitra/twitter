/*
 *  This file will fetch data from Twitter and update the profile
 *  information in the database.
 *  Created On 26 October 2020
 */

const action = async () => {
    console.log('twitter task is running')
}

export default { action, name: 'twitterProfile', interval: 1000 }

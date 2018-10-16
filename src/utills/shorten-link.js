/* eslint-disable no-console, no-await-in-loop, no-loop-func */

/**
 * A collection of onetime use scripts for taking an object like this:
 * {
 *     'rule-name': {
 *         context: ['https://long.url/to/rule/context/on/some/repo/#with_anchors']
 *     }
 * }
 * into
 * {
 *     'rule-name': {
 *         context: ['https://bit.ly/small']
 *     }
 * }
 *
 * I mostly use these from the devtools. Just paste everything from here in along with:
 *
 * const data = {...} // your data object from above
 * const token = 'get a token from bit.ly > menu > edit profile > Generic Access Token'
 * const shorterLinkData = await upgradeObject(data, token)
 *
 * It'll run ~90 requests a minute (under bit.ly's API restrictions) so you'll see your
 * console start filling up. If you have more than ~90 links to shorten, you'll see it wait
 * and then resume after about a minute.
 *
 * At the end, there's a confirmation log.
 *
 * Yeah, it's really roundabout, but 🤷‍♂️
 */

async function oauthShortenLink(longUrl, token) {
    const data = {
        long_url: longUrl
    };
    return fetch('https://api-ssl.bitly.com/v4/shorten', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.json());
}

async function wait(timeMs) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), timeMs);
    });
}

async function upgradeObject(inputData, token) {
    const data = JSON.parse(JSON.stringify(inputData));
    const REQUEST_WINDOW = 61 * 1000; // ms
    const REQUESTS_PER_WINDOW = 90;

    let availableRequests = 90;

    const rules = Object.keys(data);

    for (let i = 0; i < rules.length; i += 1) {
        const ruleName = rules[i];
        const rule = data[ruleName];
        console.log('working on ', rule);
        if (availableRequests <= 0) {
            console.log(
                `WAITING FOR ${REQUEST_WINDOW / 1000}s TO NOT FLOOD API`
            );
            await wait(REQUEST_WINDOW);
            availableRequests = REQUESTS_PER_WINDOW;
        }
        const shortenedLinks = await Promise.all(
            rule.context.map(con => {
                availableRequests -= 1;
                console.log('shortening: ', con);
                return oauthShortenLink(con, token).then(val => {
                    console.log(`returned for ${con}`);
                    console.log(val);
                    return val.link;
                });
            })
        );
        data[ruleName].context = shortenedLinks;
    }
    console.log('UPDATE COMPLETE!');
}

const https = require('https');
const fs = require('fs');
const path = require('path');

const fontUrls = [
    'https://raw.githubusercontent.com/williams-matthew/MarvelFinder/master/assets/fonts/AvengeanceHeroicAvengerNormal-1OWe.ttf',
    'https://raw.githubusercontent.com/matthewlambert1/avengers/master/fonts/avengeance_heroic_avenger.ttf'
];

const dest = path.join(__dirname, '..', 'public', 'Avengeance.ttf');
const publicDir = path.dirname(dest);

if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

function fetchFont(urlIndex) {
    if (urlIndex >= fontUrls.length) {
        console.log('Failed to download font. Could not find any valid URLs.');
        process.exit(1);
    }

    const url = fontUrls[urlIndex];
    console.log(`Trying ${url}...`);

    https.get(url, (response) => {
        if (response.statusCode === 200) {
            const file = fs.createWriteStream(dest);
            response.pipe(file);
            file.on('finish', () => {
                file.close(() => {
                    console.log(`Successfully downloaded font to ${dest}`);
                });
            });
        } else if (response.statusCode === 301 || response.statusCode === 302) {
            https.get(response.headers.location, (redirectRes) => {
                if (redirectRes.statusCode === 200) {
                    const file = fs.createWriteStream(dest);
                    redirectRes.pipe(file);
                    file.on('finish', () => {
                        file.close(() => { console.log(`Successfully downloaded font to ${dest}`); });
                    });
                } else {
                    fetchFont(urlIndex + 1);
                }
            }).on('error', () => fetchFont(urlIndex + 1));
        } else {
            console.log(`Status ${response.statusCode}. Trying next URL...`);
            fetchFont(urlIndex + 1);
        }
    }).on('error', (err) => {
        console.error(`Error fetching ${url}: ${err.message}`);
        fetchFont(urlIndex + 1);
    });
}

fetchFont(0);

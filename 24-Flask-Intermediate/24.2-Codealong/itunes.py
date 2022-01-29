import requests


res = requests.get(
    'https://itunes.apple.com/search',
    params={'term': 'jack johnson', 'limit': 2})

data = res.json()

for result in data['results']:
    print(result['trackName'])
    print(result['collectionName'])

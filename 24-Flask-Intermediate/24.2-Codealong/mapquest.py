import requests
from secrets import key

location = 'Gloucester, VA'
base_url = 'http://www.mapquestapi.com/geocoding/v1/address'

res = requests.get(base_url, params={'key': key, 'location': location})

coords = res.json()['results'][0]['locations'][0]['latLng']

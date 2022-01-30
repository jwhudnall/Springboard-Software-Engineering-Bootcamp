from flask import Flask, render_template, request
import requests
import SecretAPICreds

location = 'Gloucester, VA'
API_BASE_URL = 'http://www.mapquestapi.com/geocoding/v1'

app = Flask(__name__)


@app.route('/')
def show_address_form():
    return render_template('address_form.html')


@app.route('/geocode')
def get_location():
    address = request.args['address']
    coords = get_coords(address)
    return render_template('address_form.html', coords=coords)


def get_coords(address):
    res = requests.get(f'{API_BASE_URL}/address',
                       params={'key': SecretAPICreds.API_KEY, 'location': address})
    data = res.json()
    coords = data['results'][0]['locations'][0]['latLng']
    return coords

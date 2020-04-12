from flask import render_template,Blueprint
import os
import requests
import json

# Consol pretty printing  
from pprint import pprint

# initiating the app 
stream = Blueprint("stream", __name__)

# storing the api key somewhere
api_key =  os.environ.get('API_KEY')

# global tmdb (movie database) url 
global_url = 'https://api.themoviedb.org/3/'

# popular movie url 
url_popular = 'movie/popular'

#language to use 
language = '&language=en-US'

url = str(global_url + url_popular + '?api_key='+ api_key + language)

#methode to render the most popular movies max(20) in card section
@stream.route('/poplar-movies')
def popular_mv():
    page = requests.get(url)
    page_text = page.text
    resp = page.status_code
    
    # Check reqponese is valid or not 
    if resp:
        print('Response was : ', resp)
    else:
        Exception()
    json_data = json.loads(page_text)

    # save output to local file 
    with open('Popular Movies.json', 'w') as get_data:
        json.dump(json_data, get_data, indent=4) 
    
    # Prety print data in consol 
    prety_data = json.dumps(json_data, indent=4)
    print('Got Data :', prety_data)

    # grab the poster images only  
    posters = json_data['results'][1]
    if posters:
        for i in posters:
            print('got values : ', posters['adult'])
        with open('posters.json', 'w') as data:
            json.dump(posters, data, indent=4)

    else:
        Exception()

    return render_template(
        'testme.html'
    )

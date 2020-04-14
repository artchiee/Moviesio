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

# Will be  collecting every key value (specified) once this function is called . 
def extract_values(obj, key):
    # pull all vlaues of specific key from json data 
    arr = []
    def extract(obj, arr, key):
        # search for value keys in json 
        if isinstance(obj, dict):
            for k, v in obj.items():
                if isinstance(v, (dict, list)):
                    extract(v, arr, key)
                elif k == key:
                    arr.append(v)
        elif isinstance(obj, list):
            for item in obj:
                extract(item, arr, key)
        return arr

    results = extract(obj, arr, key)
    return results


#methode to render the most popular movies max(20) in card section
@stream.route('/poplar-movies')
def popular_mv():
    popular_list = requests.get(url)
    page_text = popular_list.text
    resp = popular_list.status_code 
    
    # Check reqponese is valid or not (optional)
    if resp:
        print('Response was : ', resp)
    else:
        Exception()

    json_data = json.loads(page_text)

    # save output to local file 
    with open('Popular Movies.json', 'w') as get_data:
        json.dump(json_data, get_data, indent=4) 
    
    # Prety print data in consol  (optional)
    prety_data = json.dumps(json_data, indent=4)
    print('Got Data \n :',  prety_data)

 
    return render_template(
        'index.html',
        # context for template to render 
        popolar_mv = popular_list,
    )

from flask import render_template,Blueprint
import os
import requests
import json
from urllib.request import urlopen 

# initiating the app 
stream = Blueprint("stream", __name__)

# storing the api key somewhere
api_key =  os.environ.get('API_KEY')

key_word = '?api_key='

# global tmdb (movie database) url 
global_url = 'https://api.themoviedb.org/3/'


#language to use 
language = '&language=en-US'

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

@stream.route('/')
def popular_mv():

    # popular movie url 
    url_popular = 'movie/popular'

    url = str(global_url + url_popular + key_word + api_key + language)

    popular_list = requests.get(url)
    resp = popular_list.status_code 

    # Check reqponese is valid or not (optional)
    if resp:
        print('Response was : ', resp)
    else:
        Exception()
    
    # converte url data to json
    to_json = popular_list.json()

    # save to a local file 
    with open('Popular_movies.json', 'w') as save_dt:
        json.dump(to_json, save_dt, indent=4)

    # Must read the data to display it in jinja
    with open('Popular_movies.json', 'r') as f:
        data = json.load(f)
        clean_data = json.dumps(data, indent=4)  #optional 
        print('dt ; \n ', clean_data)

    # get genres names instead of ids (not yet working)
    genre_base = 'genre/movie/list'
    genres_url = str(global_url + genre_base + key_word + api_key)
    genre_req  = requests.get(genres_url)

    if genre_req:
        print('genres response was :  ',  genre_req.status_code)
        genre_to_json = genre_req.json()
        dump_gnr = json.dumps(genre_to_json, indent=4) 
        print('genres list are , ', dump_gnr)
    else:
        print (Exception())
    
 
    return render_template(
        'popular_mv.html',
        # context for template to render 
        popular_movies = data,  
        genres = genre_to_json,
    )   

# Carousel trending movies 
@stream.route('/')
def trending_mv():
    word = 'trending/'
    media_type = 'movie/' #can be changed 
    time_window = 'week' #can be changed 

    trending_path = str(global_url + word + media_type + time_window + key_word + api_key)
    request_url = requests.get(trending_path)
    url_to_json =request_url.json()

    if request_url:
        r = request_url.status_code

        trending_file = 'Trending_movies.json'  #dave to * local file 
        print('trending url : ', r)
        with open(trending_file, 'w') as w:
            json.dump(url_to_json,w, indent=4)
        
        # read the data 
        with open(trending_file, 'r') as rd:
            trnd = json.load(rd)
            trn_clean = json.dumps(trnd, indent=4)  #optional 
            print('Trending data ; \n ', trn_clean)
    else:
        Exception()
    
    # get first specific data only
    #img_list = []
    get_img = trnd['results'][1]['poster_path']
    print('imgs are  \n ', get_img)

    return render_template(
        'popular_mv.html',
        imgs = get_img,
       # trending_dt = trnd

    )

@stream.route('/Popular_Movies/Detail/<string:movie_id>')
def movie_detail(movie_id):

    # later append other items in detail to url 

    movie_url =  str(global_url + 'movie/' + movie_id  + key_word + api_key + language)
    url_req = requests.get(movie_url)
    movie_js = url_req.json()

    print('response from server ', url_req.status_code)
    url_dumps = json.dumps(movie_js, indent=4)
    if url_dumps:
        print('Details for %s \n ' % (movie_id) + url_dumps)
    else:
        Exception()
    
    with open('movie_details.json', 'w') as w:
        json.dump(movie_js, w, indent=4)

    # get detail for every movie selected 


    return render_template(
        'detail.html', 
        mv_detail = movie_js
    )
    
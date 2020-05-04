from flask import render_template,Blueprint,jsonify, request, redirect, url_for
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


#render the most popular movies max(20) in card section

@stream.route('/', methods=['POST', 'GET'])  #Main route 
def main():

    # TRending logic 
    word = 'trending/'
    media_type = 'movie/' #can be changed 
    time_window = 'week' #can be changed 

    trending_path = str(global_url + word + media_type + time_window + key_word + api_key)
    request_url = requests.get(trending_path)
    url_to_json =request_url.json()

    if request_url:
        r = request_url.status_code
        trending_file = 'Trending_movies.json'  #dave to * local file 
        print('trending url response \t  : ', r)
        with open(trending_file, 'w') as w:
            json.dump(url_to_json,w, indent=4)
        
        # read the data 
        with open(trending_file, 'r') as rd:
            trnd = json.load(rd)
            trn_clean = json.dumps(trnd, indent=4)  #optional 
           # print('Trending data ; \n ', trn_clean)
    else:
        Exception()
 
    # carousel not working yet 
    data_slide = trnd['results'][0:3]
 
    # popular Logic
    url_popular = 'movie/popular'

    url = str(global_url + url_popular + key_word + api_key + language)

    popular_list = requests.get(url)
    resp = popular_list.status_code 

    # Check reqponese is valid or not (optional)
    if resp:
        print('Response popular was \t : ', resp)
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


    return render_template(
        'popular_mv.html',
        popular_movies = data,  
        trend_img = trnd,
        data_slide = data_slide
    )

# genres list names 
@stream.context_processor
def get_genres():
    
    genre_base = 'genre/movie/list'
    genres_url = str(global_url + genre_base + key_word + api_key)
    genre_req  = requests.get(genres_url)

    if genre_req:
        print('genres response was :  ',  genre_req.status_code)
        genre_to_json = genre_req.json()
        #dump_gnr = json.dumps(genre_to_json, indent=4) 

        # save to jsn file 
        with open('genres.json', 'w') as gnrs:
            json.dump(genre_to_json, gnrs, indent=4, sort_keys=True)

    else:
        Exception()

    # alter ids to be keys in genre list 
    return dict (
        key= 'value'
    )

stream.context_processor
@stream.route('/fetch', methods=['POST', 'GET'])
def search_by():
    if request.method == 'POST':
        query_str = request.form['key_search']
        if len(query_str) > 2:
            print('data recieved was : ' , query_str)

            query_word = '&query='
            search_word = 'search/movie/'
            search_url = str(global_url + search_word + key_word + api_key + language + query_word + query_str)
            search_call = requests.get(search_url)
            print('status code reqponse : ', search_call.status_code)
            search_dt =  search_call.json()
            
            dumpdt = json.dumps(search_dt, indent=4)
            print('data are \n ' , dumpdt)

            # test data to be deleted later 
            if search_dt:
                # send jsonify 
                return render_template(
                    'testme.html',
                    query_str = query_str,
                    query_res = search_dt
                )
            else:
                return jsonify({'error' : 'Missing data!', 
                'query_res' : search_dt})

        #if search input < 2 char
        else:
            return render_template(
                'testme.html',
                query_str = query_str,
                query_res = search_dt
            )

    return render_template(
        'testme.html'
    )


# Fetch by categorie 
def get_by_category():
    pass

@stream.route('/Popular_Movies/Detail/<string:movie_id>')
def movie_detail(movie_id):
    append_to = '&append_to_response='

    # Append to this url other details 
    credit = 'credits'
    images = 'images'
    videos = 'videos'
    # later append other items in detail to url     

    movie_url =  str(global_url + 'movie/' + movie_id  + key_word + api_key + language + append_to + credit + ',' + images + ','  + videos)
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
    

# Delete later
@stream.route('/imgs')
def imgs():
    with open('Trending_movies.json', 'r') as f:
        imgs_dt = json.load(f)
        clean_data = json.dumps(imgs_dt, indent=4)  #optional 
        print('dt ; \n ', clean_data)
    
    return render_template(
        'testme.html', 
        imgss = imgs_dt
    )

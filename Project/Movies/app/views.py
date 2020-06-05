from flask import render_template, Blueprint, jsonify, request, redirect, url_for
import os
import requests
import json

Movies = Blueprint('movies',
                   __name__,
                   template_folder='../templates')

# storing the api key somewhere
api_key = os.environ.get('TMDB_KEY')  # call it whatever you want

key_word = '?api_key='

# global tmdb (movie database) url
global_url = 'https://api.themoviedb.org/3/'


# language to use
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


# render the most popular movies max(20) in card section

@Movies.route('/', methods=['POST', 'GET'])  # Main route
def main():

    # TRending logic
    word = 'trending/'
    media_type = 'movie/'  # can be changed
    time_window = 'week'  # can be changed

    trending_path = str(global_url + word + media_type +
                        time_window + key_word + api_key)
    request_url = requests.get(trending_path)
    trend_jsn = request_url.json()

    if request_url:
        r = request_url.status_code
        trending_file = 'Trending_movies.json'  # save to * local file
        print('trending url response \t  : ', r)

        with open(trending_file, 'w') as w:
            json.dump(trend_jsn, w, indent=4)

    else:
        Exception()

    # create fun attribute
    main.trend_data = trend_jsn

    # carousel not working yet
    main.data_slide = main.trend_data['results'][0:3]

    # popular Logic
    url_popular = 'movie/popular'

    url = str(global_url + url_popular + key_word + api_key + language)

    popular_list = requests.get(url)
    resp = popular_list.status_code
    to_json = popular_list.json()

    # Check reqponese is valid or not (optional)
    if resp:
        print('Response popular was \t : ', resp)
    else:
        Exception()

    # converte url data to json / create fun attribut
    main.pop_dt = to_json

    # save to a local file
    with open('Popular_movies.json', 'w') as save_dt:
        json.dump(to_json, save_dt, indent=4)

    return render_template(
        'movies/popular_mv.html',
        popular_movies=main.pop_dt,
        trend_dt=main.trend_data,
        data_slide=main.data_slide
    )


@Movies.context_processor
def get_genres():

    genre_base = 'genre/movie/list'
    genres_url = str(global_url + genre_base + key_word + api_key)
    genre_req = requests.get(genres_url)

    if genre_req:
        print('genres response was :  ',  genre_req.status_code)
        genre_fetched = genre_req.json()
        # dump_gnr = json.dumps(genre_to_json, indent=4)

        # save to jsn file
        with open('genres.json', 'w') as gnrs:
            json.dump(genre_fetched, gnrs, indent=4, sort_keys=True)

    else:
        Exception()

    # create Function attribute to access outside of this fun
    get_genres.categ_fetched = genre_fetched

    return dict(
        categories=get_genres.categ_fetched
    )


# Fetch by categorie

@Movies.route('/catg/<int:genre_id>/<string:genre_name>')
def get_by_category(genre_id, genre_name):

    # Visit tmdb api page to discover more of these options
    movie_discover = 'discover/movie'
    sort_by = 'popularity.desc'
    include_adult = 'true'
    include_video = 'true'
    genre_clicked = genre_id  # (user clicks genre btn)
    print('flask genre clicked : ', genre_clicked)

    discover_url = global_url + movie_discover + key_word + api_key + language+'&sort_by='+sort_by + \
        '&include_adult='+include_adult+'&include_video=' + \
        include_video+'&with_genres='+str(genre_clicked)

    discover_call = requests.get(discover_url)
    discover_to_jsn = discover_call.json()

    # might give(200)response even if you missparsed url (strings)
    print("discover resp :", discover_call.status_code)

    # get clicked id name / save the movies to .json file
    for get_name in get_genres.categ_fetched['genres']:
        if genre_clicked == get_name['id']:
            id_name = get_name['name']
    genre_id_name = id_name
    print('you have clicked Genre id Nm %d and it\'s name is %s :' % (genre_clicked, genre_id_name),
          '\n --> .json file is saved')

    with open(genre_id_name+'.json', 'w') as new_list:
        json.dump(discover_to_jsn, new_list, indent=4)

    if discover_to_jsn:
        return render_template(
            'movies/popular_mv.html',
            genre_results=discover_to_jsn,
            genre_clicked=genre_clicked,
            popular_movies=main.pop_dt,
            trend_dt=main.trend_data,
            data_slide=main.data_slide

        )
        # return jsonify({
        #     'status : ': 'OK',
        #     'genre_clicked': discover_to_jsn,
        #     'with_genres': genre_clicked
        # })
    else:
        return jsonify('error occured : ', discover_to_jsn.error)


@Movies.route('/fetch', methods=['POST', 'GET'])
def search_by():
    if request.method == 'POST':
        # return none if key not found
        # query_search coming from ajax call
        query_str = request.form.get('query_search', None)

        if len(query_str) > 0:
            print('data recieved was : ', query_str)

            query_word = '&query='
            search_word = 'search/movie/'
            search_url = str(global_url + search_word + key_word +
                             api_key + language + query_word + query_str)
            search_call = requests.get(search_url)
            print('status code response : ', search_call.status_code)
            search_dt = search_call.json()

            with open('search_response.json', 'w') as search_res:
                json.dump(search_dt, search_res, indent=4, sort_keys=True)

            if len(search_dt['results']) > 1:

                print('Found movie results for %s ' % query_str, '\n',
                      'Global results are %d \n' % len(search_dt['results']))

                # optional
                for get_dt in search_dt['results']:
                    titles = get_dt['title']
                    if titles:
                        print('--', json.dumps(titles, indent=4))

                    else:
                        Exception()

                return jsonify({
                    'query_search':  search_dt,
                    'query_str': query_str
                })

            else:
                return jsonify({'error': 'Missing data!',
                                },
                               print('could not find search for -->  %s' %
                                     query_str)
                               )
        else:

            return render_template(
                'movies/testme.html',
                query_search=search_dt,
            )

    return render_template(
        'movies/testme.html',
    )


@Movies.route('/Popular_Movies/Detail/<string:movie_id>')
def movie_detail(movie_id):
    append_to = '&append_to_response='

    # Append to url other details
    credit = 'credits'
    images = 'images'
    videos = 'videos'
    # later append other items in detail to url

    movie_url = str(global_url + 'movie/' + movie_id + key_word + api_key +
                    language + append_to + credit + ',' + images + ',' + videos)
    url_req = requests.get(movie_url)
    movie_js = url_req.json()

    print('response from server ', url_req.status_code)

    with open('movie_details.json', 'w') as w:
        json.dump(movie_js, w, indent=4)

    # get detail for every movie selected

    return render_template(
        'movies/detail.html',
        mv_detail=movie_js
    )

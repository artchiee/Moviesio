from flask import render_template, Blueprint, jsonify, request, redirect, url_for
import os
import requests
import json
from ...Models import (Requests, serialize)

# TODO:delete
from flask_util_js import FlaskUtilJs

Moviesio = Blueprint('moviesio',
                     __name__,
                     template_folder='../templates')

# storing the api key somewhere
api_key = os.environ.get('TMDB_KEY')  # call it whatever you want

key_word = '?api_key='

# global tmdb (movie database) url
global_url = 'https://api.themoviedb.org/3/'

# language to use
language = '&language=en-US'
url_trend = 'trending/'
url_popular = 'popular'

# Will be  collecting every key value (specified) once this function is called


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


# Trending view --> extend other views
@Moviesio.route('/', methods=['POST', 'GET'])
def get_trending():

    time_window = 'week'  # can be changed

    # switching to either (tv|movie) view
    if request.method == 'POST':
        # variable received from ajax call
        choice_clicked = request.form.get('choice_clicked', None)

        if choice_clicked == "tv" or choice_clicked == 'movie':
            media_type = choice_clicked + '/'
            print(media_type)

            # Handling two view (trending/popular) calls in one
            trending_choice = Requests.Trending_Call(
                global_url, url_trend, media_type, time_window, key_word, api_key
            )

            popular_path = Requests.Popular_Call(
                global_url, media_type, url_popular, key_word, api_key
            )

            trend_call = Requests.Request(trending_choice)
            pop_call = Requests.Request(popular_path)

            trend_saved = trend_call.request_to_json()
            pop_saved = pop_call.request_to_json()

            # get_trending.context = trend_saved
            # get_popular.context = pop_saved

            # save trend json clicked
            with open(choice_clicked+'_Trending.json', 'w') as w:
                json.dump(trend_saved, w, indent=4,
                          cls=serialize.RequestEncoder)

            # json popular clicked
            with open(choice_clicked + '_Popular.json', 'w') as w:
                json.dump(pop_saved, w, indent=4, cls=serialize.RequestEncoder)

            # if return omitted will raise an error
            return jsonify({
                "Status": 'OK',
                'choice_clicked': choice_clicked,
                'get_trends': trend_saved,
                'get_pops': pop_saved
            })

    # Default view
    else:
        get_req = request.method == 'post'
        # Defaul is movie (view)
        media_type = 'movie/'
        # print('data got  : ', media_type)
        trending_path = Requests.Trending_Call(
            global_url, url_trend, media_type,
            time_window, key_word, api_key
        )

        pop_path = Requests.Popular_Call(
            global_url, media_type, url_popular,
            key_word, api_key
        )

        # print('trending_path : ', trending_path)
        trend_request = Requests.Request(trending_path)
        pop_request = Requests.Request(pop_path)

        trend_jsn = trend_request.request_to_json()
        pop_jsn = pop_request.request_to_json()

        # print(trend_jsn)

        with open('Trending_original.json', 'w') as w:
            json.dump(trend_jsn, w, indent=4,
                      cls=serialize.RequestEncoder)

        with open('Popular_original.json', 'w') as save_dt:
            json.dump(pop_jsn, save_dt, indent=4, cls=serialize.RequestEncoder)


# FIXME get 3 trending data
        get_trending.get_dt = trend_jsn['results'][5]['backdrop_path']

        return render_template("movies/trending_view.html",
                               get_dt=get_trending.get_dt,
                               get_req=get_req,
                               popular_movies=pop_jsn,
                               )


# render the most popular movies max(20) in card section

# @Moviesio.context_processor
# def get_popular():

#     pop_choice = 'movie/'
#     popular_path = Requests.Popular_Call(
#         global_url, pop_choice, url_popular, key_word, api_key
#     )
#     popular_list = Requests.Request(popular_path)

#     pop_to_json = popular_list.request_to_json()

#     # create fun attribut
#     get_popular.pop_dt = pop_to_json

#     # save to a local file
#     cls=serialize.RequestEncoder)

#     return dict(
#         popular_movies=get_popular.pop_dt)
#     #     # trend_dt=get_trending.trend_data,
#     #     # data_slide=get_trending.data_slide
#     # )


@Moviesio.context_processor
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

@ Moviesio.route('/catg/<int:genre_id>/<string:genre_name>')
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
            'movies/trending_view.html',
            genre_results=discover_to_jsn,
            genre_clicked=genre_clicked,
            # popular_movies=get_popular.pop_dt,
            trend_dt=get_trending.get_dt,

        )
        # return jsonify({
        #     'status : ': 'OK',
        #     'genre_clicked': discover_to_jsn,
        #     'with_genres': genre_clicked
        # })
    else:
        return jsonify('error occured : ', discover_to_jsn.error)


@Moviesio.route('/fetch', methods=['POST', 'GET'])
def search_by():
    if request.method == 'POST':
        # return none if key not found
        query_str = request.form.get('query_search', None)  # input from ajax

        if len(query_str) > 0:
            print('data recieved was : ', query_str)

            query_word = '&query='
            search_word = 'search/movie/'
            search_url = str(global_url + search_word + key_word +
                             api_key + language + query_word + query_str)
            search_call = requests.get(search_url)
            print('status code response : ', search_call.status_code)
            search_dt = search_call.json()

            if len(search_dt['results']) > 1:

                print('Found movie results for %s ' % query_str, '\n',
                      'Global results are %d \n' % len(search_dt['results']))

                with open(query_str + '.json', 'w') as search_res:
                    json.dump(search_dt, search_res, indent=4, sort_keys=True)

                #delete :  optional
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

# TODO : Switch between tv / movie detail page


@Moviesio.route('/Popular_Movies/Detail/<string:movie_id>')
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
        'movies/movie_detail.html',
        mv_detail=movie_js
    )

# TODO:delete later/ tv detail test


@Moviesio.route("/tv/")
def tv_detail():
    return render_template(
        'movies/tv_detail.html'
    )

import requests
import os
import json

# storing the api key somewhere
api_key = os.environ.get('TMDB_KEY')  # call it whatever you want

key_word = '?api_key='

# global tmdb (movie database) url
Global_url = 'https://api.themoviedb.org/3/'

tred = 'trending/'
media_tp = 'movie/'  # can be changed
time_win = 'week'  # can be changed

# language to use
language = '&language=en-US'
pop = 'tv/'
pop2 = 'popular'

# Trending Request


class Trending_Call:
    def __init__(self, global_url, trending, media_type, time_window, word, key):
        self.global_url = global_url,
        self.trending = trending,
        self.media_type = media_type,
        self.time_window = time_window,
        self.word = word,
        self.key = key
        self.trend_address = (
            global_url + trending + media_type + time_window + word + key
        )

    # return full (address)
    def __str__(self):
        return self.trend_address


class Popular_Call:
    def __init__(self, global_url, choice, popular, word, key, language):
        self.global_url = global_url
        self.choice = choice
        self.popular = popular
        self.word = word
        self.key = api_key
        self.language = language
        self.pop_address = (
            global_url+choice+popular + word + api_key+language
        )

    # do not return 'text' or will not work
    # needs only full url
    def __str__(self):
        return self.pop_address


# Global request making
class Request:
    def __init__(self, url_to_call):
        self.url_to_call = url_to_call

    def request_to_json(self):
        url_address = requests.get(self.url_to_call)
        call_to_json = url_address.json()
        # response = call.status_code
        # _format = json.dumps(call_to_json, indent=4)
        return call_to_json

    # TODO: (optional)Delete later
    def response(self):
        respons_code = requests.get(self.url_to_call)
        if respons_code:
            try:
                get_resp = respons_code.status_code
                return 'reponde is : {}'.format(get_resp)
            except:
                return 'Invalid url'

# test
# url = Popular_Call(
#     Global_url, pop, pop2, key_word, api_key, language
# )

# print(url)
# r = Request(url)
# print('*' * 30)
# x = r.response()
# print(x)

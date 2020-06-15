import requests
import os

Global_url = 'https://api.themoviedb.org/3/'
api_key = os.environ.get('TMDB_KEY')  # call it whatever you want

key_word = '?api_key='
tred = 'trending/'
media_tp = 'movie'
time_win = 'week'


class Trending_Call:
    def __init__(self, global_url, trending, media_type, time_window, word, key):
        self.global_url = global_url,
        self.trending = trending,
        self.media_type = media_type,
        self.time_window = time_window,
        self.word = word,
        self.key = key

    def trending_req(self):
        print('url is ', self.global_url, self.trending, self.media_type, self.time_window,
              self.word, self.key)

    # TODO : add __str__


# Global request making
class Request(Trending_Call):
    def __init__(self, url_to_call):
        self.url_to_call = url_to_call

    def make_call(self):
        # Fire up the call if the method was called
        req = requests.get(self.url_to_call)
        status_code = 'status code for url is : '
        return status_code + req.status_code


# test
url = Trending_Call(
    Global_url, tred, media_tp, time_win, key_word, api_key
)

r = Request.make_call(url)
print(r)

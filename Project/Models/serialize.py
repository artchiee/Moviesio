# Save Request to file as json
import requests
import json
import os
from Requests import Request, Trending_Call
from json import(
    JSONEncoder
)
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


class RequestEncoder(JSONEncoder):
    # Raise this def one we created instance for it
    def default(self, obj):

        # check if instance has the correct type
        if isinstance(obj):
            try:
                return obj.__dict__
            except AttributeError:
                Exception()


# # test
url = Trending_Call(
    Global_url, tred, media_tp, time_win, key_word, api_key
)
print(url)
print('*' * 30)

r = Request(url)

x = r.request_to_json()
# Request encoder
encod = json.dumps(x, indent=4, cls=RequestEncoder)
print('request encoder \n  : ', encod)

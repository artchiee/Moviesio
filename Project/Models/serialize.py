# Save Request to file as json
import requests
import json
import os
from .Requests import Request, Trending_Call
from json import(
    JSONEncoder
)

class RequestEncoder(JSONEncoder):
    # Raise this def once we created instance for it
    def default(self, obj):

        # check if instance has the correct type
        if isinstance(obj):
            try:
                return obj.__dict__
            except AttributeError:
                Exception()


# # # test
# url = Trending_Call(
#     Global_url, tred, media_tp, time_win, key_word, api_key
# )
# print(url)
# print('*' * 30)

# r = Request(url)

# x = r.request_to_json()
# # Request encoder
# encod = json.dumps(x, indent=4, cls=RequestEncoder)
# print('request encoder \n  : ', encod)

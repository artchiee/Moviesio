from Project.Movies.app.views import Movies
from flask import Flask, render_template


# app initialazation
app = Flask(__name__)
# register static path for (Movies)
app._static_folder = 'Movies/static'

# Register Blueprints
app.register_blueprint(Movies)

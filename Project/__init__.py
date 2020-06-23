from Project.Moviesio.app.views import Moviesio
from flask import Flask, render_template


# app initialazation
app = Flask(__name__)

# register static directory
app._static_folder = 'Moviesio/static'
#app.static_folder = 'Tvshows/static'

# Register Blueprints
app.register_blueprint(Moviesio)

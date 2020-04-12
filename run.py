from flask import Flask,render_template
from main.moviesty import stream

# Global app initalization 
app = Flask(__name__, template_folder='main/Templates',
static_folder='main/static')

# # Register apps below 
app.register_blueprint(stream)

if __name__ == "__main__":
    app.run(debug=True)

import flask
import os
from flask_cors import CORS
import requests

app = flask.Flask(__name__)
CORS(app)

@app.route("/genshin/<uid>")
def get_genshin_data(uid):
    try:
        response = requests.get(f"https://enka.network/api/uid/{uid}")
        return response.json()
    except Exception as e:
        return flask.jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port="8383")
# import necessary libraries
from models import create_classes
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///wh20.sqlite"

# Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = create_engine("sqlite:///wh20.sqlite", connect_args={'check_same_thread': False})
session = Session(bind=db)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db, reflect=True)

# Save reference to the table
Country = Base.classes.wh20

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("titlepage.html")

@app.route("/happy_map")
def happy():
    return render_template("index.html")

@app.route("/life_map")
def life():
    return render_template("life_map.html")


# Query the database and send the jsonified results
@app.route("/send", methods=["GET", "POST"])
def send():
    if request.method == "POST":
        name = request.form["country_name"]
        lat = request.form["latitude"]
        lon = request.form["longitude"]
        happy = request.form["ladder_score"]
        life = request.form["healthy_life_expectancy"]

        happiness = Country(name=name, lat=lat, lon=lon, happy=happy, life=life)
        db.session.add(happiness)
        db.session.commit()
        return redirect("/", code=302)

    return render_template("form.html")


@app.route("/api/happy_map")
def happy_map():
    results = session.query(Country.country_name, Country.latitude, Country.longitude, Country.ladder_score).all()
    country_data1 = []

    for result in results:
        country = {}
        country["country_name"] = result[0]
        country["latitude"] = result[1]
        country["longitude"] = result[2]
        country["happy"] = result[3]
        country_data1.append(country)
    # hover_text = [result[0] for result in results]
    # lat = [result[1] for result in results]
    # lon = [result[2] for result in results]
    # happy = [result[3] for result in results]

    # country_data1 = [{
    #     "lat": lat,
    #     "lon": lon,
    #     "happiness": happy,
    #  }]

    return jsonify(country_data1)


@app.route("/api/life_map")
def life_map():
    results = session.query(Country.country_name, Country.latitude, Country.longitude, Country.healthy_life_expectancy).all()

    hover_text = [result[0] for result in results]
    lat = [result[1] for result in results]
    lon = [result[2] for result in results]
    life = [result[3] for result in results]

    country_data2 = [{"country name": hover_text, "life expectancy": life}]


    print(country_data2)
    return jsonify(country_data2)


if __name__ == "__main__":
    app.run(debug=True)

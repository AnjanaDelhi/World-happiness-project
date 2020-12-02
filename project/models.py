def create_classes(db):
    class Country(db.Model):
        __tablename__ = 'countries'

        id = db.Column(db.Integer, primary_key=True)
        name = db.Column(db.String(64))
        lat = db.Column(db.Float)
        lon = db.Column(db.Float)

        def __repr__(self):
            return '<Country %r>' % (self.name)
    return Country

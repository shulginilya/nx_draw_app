from app import db

class Elements(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    width = db.Column(db.Integer)
    height = db.Column(db.Integer)
    x = db.Column(db.Integer)
    y = db.Column(db.Integer)
    color = db.Column(db.String)
    def to_dict(self):
        return {
            "id": self.id,
            "width": self.width,
            "height": self.height,
            "x": self.x,
            "y": self.y,
            "color": self.color
        }


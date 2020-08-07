from flask import *
import numpy as np
from flask_cors import CORS, cross_origin
from keras.preprocessing import image
from keras.models import load_model

app = Flask(__name__)
CORS(app)

model = load_model('my_model.h5')


@app.route('/')
def hello_world():
    return 'Hello, Worlddd!'


@app.route('/predict', methods=['POST'])
def predict():
    img = request.files['image']
    print(img)
    img.save(img.filename)
    path = img.filename
    img = image.load_img(path, target_size=(150, 150))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    print(x)
    images = np.vstack([x])
    classes = model.predict(images, batch_size=10)
    print(classes[0])
    if classes[0] > 0.5:
        return jsonify(
            message="BOW BOW! I'm a dog!"
        )
    else:
        return jsonify(
            message="MEOW MEOW! I'm a cat!"
        )


if __name__ == 'main':
    app.run()

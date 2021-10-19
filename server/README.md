## How to run

### only flask
```
cd flask

(activate your venv if you need)

pip install -r requirements.txt

export FLASK_RUN_HOST="0.0.0.0"

export FLASK_RUN_PORT=5000

flask run
```

### with docker
```
cd flask

docker build -t flask .

docker run -it -d -e FLASK_RUN_HOST="0.0.0.0" -p 5000:5000 flask
```
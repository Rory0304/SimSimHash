FROM python:3.8-alpine3.13
COPY . /flask
WORKDIR /flask
RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt
CMD ["uwsgi", "wsgi.ini"]
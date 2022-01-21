FROM node:17

RUN apt-get update
RUN apt-get install -y python3.10
RUN apt-get install -y python3-pip

WORKDIR app/api/

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY . .

WORKDIR markov_chain_frontend
RUN yarn install
RUN yarn build

WORKDIR ..

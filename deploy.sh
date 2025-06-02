#!/bin/bash

eval $(ssh-agent -s)
ssh-add ~/.ssh/digitalOcean
docker build . -t gamercred
docker save gamercred > gamercred.tar
rsync -avz --progress gamercred.tar docker-compose.yml .env.production init.sql digitalOcean:/home/soly/gamercred/

ssh digitalOcean "cd /home/soly/gamercred/ && \
docker load < gamercred.tar && \
mv .env.production .env && \
docker-compose down && \
docker-compose up -d && \
exit"
rm gamercred.tar

ssh-agent -k

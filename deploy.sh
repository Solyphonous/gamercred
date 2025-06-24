#!/bin/bash
set -e

REMOTE_DIR="/srv/gamercred"

eval $(ssh-agent -s)
trap "ssh-agent -k" EXIT
ssh-add ~/.ssh/digitalOcean
docker build . -t gamercred
docker save gamercred > gamercred.tar
rsync -avz --progress gamercred.tar docker-compose.yml .env.production init.sql "digitalOcean:${REMOTE_DIR}/"

ssh digitalOcean <<EOF

cd "${REMOTE_DIR}"
docker load < gamercred.tar
mv .env.production .env
docker-compose down
docker-compose up -d
exit

EOF

rm gamercred.tar

ssh-agent -k

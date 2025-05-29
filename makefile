deploy:
	docker build . -t gamercred && \
	docker save gamercred | gzip > gamercred.tar.gz && \
	scp gamercred.tar.gz docker-compose.yml .env.production init.sql digitalOcean:/home/soly/gamercred && \
	ssh digitalOcean "cd /home/soly/gamercred/ && \
	gunzip -c /home/soly/gamercred/gamercred.tar.gz | docker load && \
	mv .env.production .env && \
	docker-compose down && \
	docker-compose up -d && \
	exit"
	rm gamercred.tar.gz

.PHONY: deploy

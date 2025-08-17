deploy:
	./deploy.sh

images:
	scp -r static/images digitalOcean:/home/soly/ && \
	ssh digitalOcean "sudo rm -r /srv/gamercred/images/ && \
	sudo mv images /srv/gamercred/ && \
	exit"

.PHONY: deploy images

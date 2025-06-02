deploy:
	./deploy.sh

images:
	scp -r static/images digitalOcean:/home/soly/ && \
	ssh digitalOcean "sudo mv images /static/ && \
	exit"

.PHONY: deploy images

help:
	@echo "Existing goals are: "
	@echo "clean      -> clean dependencies"
	@echo "install    -> npm install"
	@echo "prod       -> clean, install and restart the pm2 service"

clean:
	rm -rf node_modules/ 

install:
	npm install

prod: clean install
	sudo service pm2-init.sh restart
	sudo service pm2-init.sh status



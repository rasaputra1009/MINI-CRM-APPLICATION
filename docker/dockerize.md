## Development Using Docker
 
#### Setting up docker
 
1. Install docker on system <br>
`sudo apt install docker`

2. Install docker-compose on system <br>
`sudo apt install docker-compose`

#### Installing dependencies
 
1. Run npm/composer/gulp <br>
`bash setup.sh`


#### Spawning a docker container
1. Run the following to spawn a docker container with the project mount in the */home/mnet* directory <br>
`sudo docker-compose up`

Your server should be up on port 8880 by default.

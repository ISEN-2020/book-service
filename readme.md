# Book Service API

# 1. Create a Docker Compose YAML File for a MySQL Docker Container

Let’s create a directory nammed db-docker at the source of the project, and then create a docker-compose.yaml file in that directory.

Basically, here, we will specify the services we are going to use and set up the environment variables related to those.
Add the following in the docker-compose.yml file we just created:

	version: '3'

	services:

	  mysql-development:
	    image: mysql:8.0.17
	    environment:
	      MYSQL_ROOT_PASSWORD: helloworld
	      MYSQL_DATABASE: testapp
	    ports:
	      - "3308:3306"


We specified the name of our MySQL container as mysql-development and the Docker image to be used is mysql:8.0.17. Where if don’t specify the tag as 8.0.17, it will take the latest one.
The next thing we need to specify is the environment variables, i.e. the user, password, and database. If you don’t specify the user, by default it will be root.
We will use helloworld as password and testapp as database.
Another important thing is port mapping. 3308:3306 means that the MySQL running in the container at port 3306 is mapped to the localhost of the host machine at port 3308. You can use a different port as well.
Now, after creating the .yaml file, we need to run the following command in the same directory where the .yaml file is located:

	docker-compose up

This will pull the Docker image (if the image is not available locally, it will pull from Docker Hub) and then run the container.
We can check the status with:

	docker-compose ps

This will show the name of the container, command, and state of the container, which shows, for example, that the container is running. It also shows port mapping.
In the next step, we will connect to this MySQL container and run some commands.

# 2. Connect to the MySQL Database Running in a Container

We will discuss two methods to connect and run SQL commands on the MySQL running in a Docker container.
The first method is to use tools like MySQL Workbench (DataGrip also can be used).
As we now have a MySQL container running at our local machine’s port 3308, we can connect using the following configuration parameters (on SQL Workbench for exemple):

	hostname : localhost
	port : 3308
	username : root
	password : helloworld
	default Schema : library

The connection through the local machine’s port 3308 was only possible due to port mapping.
If we want to connect to containerized MySQL, without mapping ports, i.e. from another application running on the same Docker network, we have to use tools like Adminer, which is our other method.

Adminer is a PHP-based web application for accessing databases.
Now, we will add another service for Adminer in our docker-compose.yml file. But, before we make changes here, we need to stop running the container and remove it with the following command:

	docker-compose down

Let’s add the following in our docker-compose.yaml file:

	version: '3'

	services:

	  mysql-development:
	    image: mysql:8.0.17
	    environment:
	      MYSQL_ROOT_PASSWORD: helloworld
	      MYSQL_DATABASE: testapp
	    ports:
	      - "3308:3306"

	  admin:    
	    image: adminer    
	    ports:      
	      - "8080:8080"
      
      
Now, let’s start the Docker containers again:

	docker-compose up

After running this, the image for Adminer will be pulled and the container for both MySQL and Adminer will be started.
We can check this using docker-compose ps.
Now, we can go to our browser and go to localhost:8080 for Adminer. As Adminer runs on the same Docker network as MySQL, it can access the MySQL container via port 3306 (or simply, by the container’s name).
Note: We can’t access the MySQL container through port 3308 in Adminer, as this will try to access port 3308 of the Docker Compose network, not our local machine’s 3308 port.
On the Adminer page, use theses parameters to connect :

	System : MySQL
	Server : mysql-development (or the name you choosed in the docker-compose.yaml 
	Username : root
	Password : helloworld
	Database : testapp (or the name you choosed for the DATABASE)

# Installing PostgresSQL on your Docker Appliance (DEPRECATED)



Postgresql database which stores  datas related to  the library's books.

  - login to your dockerHub and search the correct Postgres version, according to yout Operating System : https://hub.docker.com/_/postgres.
  - If you want to install a specific version of postgreSQL, you can choose the version you want by specifying as a tag on the pull instrcution eg: docker pull postgres:11.5.

  - Once your image is installed on your system, please do as shown below :

				docker run --name my_postgres -p 5432:5432 -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -d postgres
You can choose the name of your running container by filling the option "--name". Here is called "my_postgres"

For reaching the DB server, you have to specify on which port your computer is supposed to hear with the option -p. For this exemple, the server is reachable at : 

    localhost:5432 
OR

    127.0.0.1:5432.
The default port is the tcp/5432, but you can choose another one.

You can set your own credentials for the server by setting the environment variables with the option -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin (admin/admin here)

Finally, run your container in detached mode by using the option "-d"

Once the container is launched, you can verify its running state by using the command : "docker ps"


Now, to access to your Postgresql server, you may run the following command to open a TTY shell through it whith this command : 

				docker exec -it my_postgres psql -U admin
If you are on Windows, you should  prefix the command by a 'winpty' statement like the following :
				winpty docker exec -it my_postgres psql -U admin

According to the previous given values :

	my_postgres : name of the running container
	using "admin" specific credentials with the option -U


Now open the file "Postgres_DB_setup.SQL" and paste its content.

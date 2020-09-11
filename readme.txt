Installing PostgresSQL on your Docker Appliance

Firs of all, login to your dockerHub and search the correct Postgres version, according to yout Operating System : https://hub.docker.com/_/postgres.

Afterwards, opend a shell on your terminal and paste the following : 

				docker pull postgres.


If you want to install a specific version of postgreSQL, you can choose the version you want by specifying as a tag on the pull instrcution eg: docker pull postgres:11.5.

Once your image is installed on your system, please do as shown below :

				docker run --name my_postgres -p 5432:5432 -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -d postgres


You can choose the name of your running container by filling the option "--name". Here is called "my_postgres"

For reaching the DB server, you have to specify on which port your computer is supposed to hear with the option -p. For this exemple, the server is reachable at localhost:5432 OR 127.0.0.1:5432.
The default port is the tcp/5432, but you can choose another one.


You can set your own credentials for the server by setting the environment variables with the option -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin (admin/admin here)

Finally, run your container in detached mode by using the option "-d"

Once the container is launched, you can verify its running state by using the command : "docker ps"


Now, to access to your Postgresql server, you may run the following command to open a TTY shell through it whith this command : 

				docker exec -it my_postgres psql -U admin

According to the previous given values :

	my_postgres : name of the running container
	using "admin" specific credentials with the option -U


Now open the file "Postgres_DB_setup.SQL" and paste its content.


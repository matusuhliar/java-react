cd ./backend
docker build -t backend:1.0.0 .
cd ../frontend
docker build -t frontend:1.0.0 .
cd ..
docker-compose up -d
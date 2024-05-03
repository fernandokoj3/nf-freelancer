#!/bin/bash

# Adicionando  os pacotes de requisitos básicos
sudo apt-get update && sudo apt-get install ca-certificates curl gnupg --yes

# Adicionando a chave GPG do Docker e adicionando o repositório
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Instalação do Docker
sudo apt-get update && sudo apt-get install --yes docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin 

# Dando permissão para o usuário ubuntu usar o Docker
sudo usermod -aG docker $USER

sudo docker run -d -p 80:3000 \
  -e APP_DATABASE_NAME=docker \
  -e APP_DATABASE_USER=docker \
  -e APP_DATABASE_PWD=docker \
  -e APP_DATABASE_HOST=${database_ip} \
  -e APP_DATABASE_PORT=5432 \
  -e APP_DATABASE_TYPE=postgres \
  -e APP_DATABASE_SYNCHRONIZE=false \
  -e APP_DATABASE_SCHEMA=nf_freelancer \
  -e APP_CIPHER_KEY=F55AA3FC090E14EDEA705861FABABB39B7C4254B469661EC2B206F648DC97B3A \
  -e APP_CIPHER_IV=8E13284218D11C47F60A4A9D038F8C7D \
  -e APP_CIPHER_METHOD=AES-256-CBC \
  -e APP_JWT_SECRET_KEY=0ZUc1EBgexhT0JoCEWwq2UmsuFNkLnFsRmOFuuiBpulos0OYZkPJZjZW5yC0dLdK \
  koj3/nf-freelancer:latest npm run start:production:all

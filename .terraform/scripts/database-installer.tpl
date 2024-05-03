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

sudo docker run -d -p 5432:5432 -e POSTGRES_DB=docker -e POSTGRES_USER=docker -e POSTGRES_PASSWORD=docker postgres

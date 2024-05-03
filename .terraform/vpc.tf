resource "aws_vpc" "avg_vpc" {
  cidr_block = var.avg_vpc_cidr_block

  tags = {
    Name = format("%s-%s", var.project_main_name, "vpc")
  }
}

resource "aws_subnet" "avg_subnet_publica" {
  vpc_id     = aws_vpc.avg_vpc.id
  cidr_block = var.avg_subnet_publica_cidr_block

  tags = {
    Name = format("%s-%s", var.project_main_name, "sub-public")
  }
}

resource "aws_subnet" "avg_subnet_privada" {
  vpc_id     = aws_vpc.avg_vpc.id
  cidr_block = var.avg_subnet_privada_cidr_block

  tags = {
    Name = format("%s-%s", var.project_main_name, "sub-private")
  }
}

resource "aws_internet_gateway" "avg_igw" {

  tags = {
    Name = format("%s-%s", var.project_main_name, "igw")
  }
}

resource "aws_internet_gateway_attachment" "avg_igw_vpc_attach" {
  internet_gateway_id = aws_internet_gateway.avg_igw.id
  vpc_id              = aws_vpc.avg_vpc.id
}

resource "aws_eip" "avg_nat_eip" {

  depends_on = [aws_internet_gateway.avg_igw]

  tags = {
    Name = format("%s-%s", var.project_main_name, "eip")
  }
}

resource "aws_nat_gateway" "avg_nat_gtw" {
  allocation_id = aws_eip.avg_nat_eip.id
  subnet_id     = aws_subnet.avg_subnet_publica.id

  tags = {
    Name = format("%s-%s", var.project_main_name, "nat-gtw")
  }

  depends_on = [aws_internet_gateway.avg_igw]
}

resource "aws_route_table" "avg_rt_publica" {
  vpc_id = aws_vpc.avg_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.avg_igw.id
  }

  tags = {
    Name = format("%s-%s", var.project_main_name, "route-table-public")
  }
}

resource "aws_route_table_association" "avg_rt_publica_a" {
  subnet_id      = aws_subnet.avg_subnet_publica.id
  route_table_id = aws_route_table.avg_rt_publica.id
}

resource "aws_route_table" "avg_rt_privada" {
  vpc_id = aws_vpc.avg_vpc.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.avg_nat_gtw.id
  }

  tags = {
    Name = format("%s-%s", var.project_main_name, "route-table-public-associate")
  }
}

resource "aws_route_table_association" "avg_rt_privada_a" {
  subnet_id      = aws_subnet.avg_subnet_privada.id
  route_table_id = aws_route_table.avg_rt_privada.id
}


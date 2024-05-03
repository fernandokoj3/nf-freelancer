resource "aws_security_group" "avg_sg_web" {
  name        = format("%s-%s", var.project_main_name, "sg-web-api")
  description = "Firewall rules to ec2 web api application"
  vpc_id      = aws_vpc.avg_vpc.id

  dynamic "ingress" {
    for_each = var.avg_sg_web_ingresses
    content {
      description      = ingress.value["description"]
      from_port        = ingress.value["from_port"]
      to_port          = ingress.value["to_port"]
      protocol         = ingress.value["protocol"]
      cidr_blocks      = ingress.value["cidr_blocks"]
      ipv6_cidr_blocks = ingress.value["ipv6_cidr_blocks"]
    }
  }

  dynamic "egress" {
    for_each = var.avg_sg_web_egresses
    content {
      description      = egress.value["description"]
      from_port        = egress.value["from_port"]
      to_port          = egress.value["to_port"]
      protocol         = egress.value["protocol"]
      cidr_blocks      = egress.value["cidr_blocks"]
      ipv6_cidr_blocks = egress.value["ipv6_cidr_blocks"]
    }
  }

  tags = {
    Name = format("%s-%s", var.project_main_name, "sg-web-api")
  }
}

resource "aws_network_acl" "avg_nacl_publica" {
  vpc_id     = aws_vpc.avg_vpc.id
  subnet_ids = [aws_subnet.avg_subnet_publica.id]

  dynamic "ingress" {
    for_each = var.avg_nacl_publica_ingress
    content {
      protocol   = ingress.value["protocol"]
      rule_no    = ingress.value["rule_no"]
      action     = ingress.value["action"]
      cidr_block = ingress.value["cidr_block"]
      from_port  = ingress.value["from_port"]
      to_port    = ingress.value["to_port"]
    }
  }

  dynamic "egress" {
    for_each = var.avg_nacl_publica_egress
    content {
      protocol   = egress.value["protocol"]
      rule_no    = egress.value["rule_no"]
      action     = egress.value["action"]
      cidr_block = egress.value["cidr_block"]
      from_port  = egress.value["from_port"]
      to_port    = egress.value["to_port"]
    }
  }

  tags = {
    Name = format("%s-%s", var.project_main_name, "acl-public")
  }
}

resource "aws_security_group" "avg_sg_db" {
  name        = format("%s-%s", var.project_main_name, "sg-database")
  description = "Firewall rules to ec2 database"
  vpc_id      = aws_vpc.avg_vpc.id

  ingress {
    description     = "Acesso MongoDB"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.avg_sg_web.id]
  }

  ingress {
    description = "Acesso SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [aws_vpc.avg_vpc.cidr_block]
  }

  dynamic "egress" {
    for_each = var.avg_sg_db_egresses
    content {
      description      = egress.value["description"]
      from_port        = egress.value["from_port"]
      to_port          = egress.value["to_port"]
      protocol         = egress.value["protocol"]
      cidr_blocks      = egress.value["cidr_blocks"]
      ipv6_cidr_blocks = egress.value["ipv6_cidr_blocks"]
    }
  }

  tags = {
    Name = format("%s-%s", var.project_main_name, "sg-database")
  }
}

resource "aws_network_acl" "avg_nacl_privada" {
  vpc_id     = aws_vpc.avg_vpc.id
  subnet_ids = [aws_subnet.avg_subnet_privada.id]

  dynamic "ingress" {
    for_each = var.avg_nacl_privada_ingress
    content {
      protocol   = ingress.value["protocol"]
      rule_no    = ingress.value["rule_no"]
      action     = ingress.value["action"]
      cidr_block = ingress.value["cidr_block"]
      from_port  = ingress.value["from_port"]
      to_port    = ingress.value["to_port"]
    }
  }

  dynamic "egress" {
    for_each = var.avg_nacl_privada_egress
    content {
      protocol   = egress.value["protocol"]
      rule_no    = egress.value["rule_no"]
      action     = egress.value["action"]
      cidr_block = egress.value["cidr_block"]
      from_port  = egress.value["from_port"]
      to_port    = egress.value["to_port"]
    }
  }

  tags = {
    Name = format("%s-%s", var.project_main_name, "acl-private")
  }

}

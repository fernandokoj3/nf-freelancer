#
#
#  Project environments
#
#

variable "project_region" {
  type        = string
  default     = "us-east-1"
  description = "Project region"
}

variable "project_main_name" {
  type        = string
  description = "Project main name"
}

#
#
#  VPC environments
#
#

variable "avg_vpc_cidr_block" {
  type        = string
  default     = "10.0.0.0/16"
  description = "cidr block da VPC"
}

variable "avg_subnet_publica_cidr_block" {
  type        = string
  default     = "10.0.0.0/24"
  description = "public subnet cidr block"
}

variable "avg_subnet_privada_cidr_block" {
  type        = string
  default     = "10.0.1.0/24"
  description = "private subnet cidr block"
}

#
#
#  Variáveis das EC2
#
#
variable "ec2_kpair_ssh_name" {
  type        = string
  description = "description"
}

variable "ec2_kpair_ssh_file" {
  type        = string
  description = "description"
}

variable "ec2_ami" {
  type        = string
  description = "description"
}

variable "web_ec2_instance_type" {
  type    = string
  default = "t2.micro"
}

variable "db_ec2_instance_type" {
  type    = string
  default = "t2.micro"
}

#
#
#  Security environments
#
#

variable "avg_sg_web_ingresses" {
  default = [
    {
      description      = "HTTP access",
      from_port        = 80,
      to_port          = 80,
      protocol         = "tcp",
      cidr_blocks      = ["0.0.0.0/0"],
      ipv6_cidr_blocks = ["::/0"]
    },
    {
      description      = "HTTP access"
      from_port        = 80
      to_port          = 80
      protocol         = "tcp"
      cidr_blocks      = ["0.0.0.0/0"]
      ipv6_cidr_blocks = ["::/0"]
    },
    {
      description      = "HTTPs access"
      from_port        = 443
      to_port          = 443
      protocol         = "tcp"
      cidr_blocks      = ["0.0.0.0/0"]
      ipv6_cidr_blocks = ["::/0"]
    },
    {
      description      = "SSH access"
      from_port        = 22
      to_port          = 22
      protocol         = "tcp"
      cidr_blocks      = ["0.0.0.0/0"]
      ipv6_cidr_blocks = ["::/0"]
    }
  ]
  description = "Ingress security group name to instances web api application"
}

variable "avg_sg_web_egresses" {
  default = [
    {
      description      = "HTTP access"
      from_port        = 80
      to_port          = 80
      protocol         = "tcp"
      cidr_blocks      = ["0.0.0.0/0"]
      ipv6_cidr_blocks = ["::/0"]
    },
    {
      description      = "HTTPs access"
      from_port        = 443
      to_port          = 443
      protocol         = "tcp"
      cidr_blocks      = ["0.0.0.0/0"]
      ipv6_cidr_blocks = ["::/0"]
    },
    {
      description      = "DNS access"
      from_port        = 53
      to_port          = 53
      protocol         = "tcp"
      cidr_blocks      = ["0.0.0.0/0"]
      ipv6_cidr_blocks = ["::/0"]
    },
    {
      description      = "DNS access"
      from_port        = 53
      to_port          = 53
      protocol         = "udp"
      cidr_blocks      = ["0.0.0.0/0"]
      ipv6_cidr_blocks = ["::/0"]
    },
    {
      description      = "SSH access"
      from_port        = 22
      to_port          = 22
      protocol         = "tcp"
      cidr_blocks      = ["0.0.0.0/0"]
      ipv6_cidr_blocks = ["::/0"]
    },
    {
      description      = "Postgres access"
      from_port        = 5432
      to_port          = 5432
      protocol         = "tcp"
      cidr_blocks      = ["0.0.0.0/0"]
      ipv6_cidr_blocks = ["::/0"]
    }
  ]
  description = "Egress Security group name to instances database"
}

variable "avg_nacl_publica_ingress" {
  default = [
    # HTTP ports
    {
      protocol   = "tcp"
      rule_no    = 100
      action     = "allow"
      cidr_block = "0.0.0.0/0"
      from_port  = 80
      to_port    = 80
    },
    # HTTPs ports
    {
      protocol   = "tcp"
      rule_no    = 110
      action     = "allow"
      cidr_block = "0.0.0.0/0"
      from_port  = 443
      to_port    = 443
    },
    # SSH ports
    {
      protocol   = "tcp"
      rule_no    = 120
      action     = "allow"
      cidr_block = "0.0.0.0/0"
      from_port  = 22
      to_port    = 22
    },
    # Ephemeral ports
    {
      protocol   = "tcp"
      rule_no    = 130
      action     = "allow"
      cidr_block = "0.0.0.0/0"
      from_port  = 1024
      to_port    = 65535
    },
    # DNS ports
    {
      protocol   = "tcp"
      rule_no    = 140
      action     = "allow"
      cidr_block = "0.0.0.0/0"
      from_port  = 53
      to_port    = 53
    },
    # DNS ports
    {
      protocol   = "udp"
      rule_no    = 150
      action     = "allow"
      cidr_block = "0.0.0.0/0"
      from_port  = 53
      to_port    = 53
    }
  ]
  description = "Ingress ACL rules to network acl form private subnet"
}

variable "avg_nacl_publica_egress" {
  default = [
    # Ephemeral ports
    {
      protocol   = "tcp"
      rule_no    = 100
      action     = "allow"
      cidr_block = "0.0.0.0/0"
      from_port  = 1024
      to_port    = 65535
    },
    # HTTP ports
    {
      protocol   = "tcp"
      rule_no    = 110
      action     = "allow"
      cidr_block = "0.0.0.0/0"
      from_port  = 80
      to_port    = 80
    },
    # HTTPs ports
    {
      protocol   = "tcp"
      rule_no    = 120
      action     = "allow"
      cidr_block = "0.0.0.0/0"
      from_port  = 443
      to_port    = 443
    },
    # DNS ports
    {
      protocol   = "tcp"
      rule_no    = 130
      action     = "allow"
      cidr_block = "0.0.0.0/0"
      from_port  = 53
      to_port    = 53
    },
    # DNS ports
    {
      protocol   = "udp"
      rule_no    = 140
      action     = "allow"
      cidr_block = "0.0.0.0/0"
      from_port  = 53
      to_port    = 53
    },
    # SSH ports
    {
      protocol   = "tcp"
      rule_no    = 150
      action     = "allow"
      cidr_block = "0.0.0.0/0"
      from_port  = 22
      to_port    = 22
    }
  ]
  description = "Egress ACL rules to network acl form public subnet"
}

variable "avg_sg_db_egresses" {
  default = [
    {
      description      = "HTTP access"
      from_port        = 80
      to_port          = 80
      protocol         = "tcp"
      cidr_blocks      = ["0.0.0.0/0"]
      ipv6_cidr_blocks = ["::/0"]
    },
    {
      description      = "HTTPs access"
      from_port        = 443
      to_port          = 443
      protocol         = "tcp"
      cidr_blocks      = ["0.0.0.0/0"]
      ipv6_cidr_blocks = ["::/0"]
    },
    {
      description      = "DNS access"
      from_port        = 53
      to_port          = 53
      protocol         = "tcp"
      cidr_blocks      = ["0.0.0.0/0"]
      ipv6_cidr_blocks = ["::/0"]
    },
    {
      description      = "DNS access"
      from_port        = 53
      to_port          = 53
      protocol         = "udp"
      cidr_blocks      = ["0.0.0.0/0"]
      ipv6_cidr_blocks = ["::/0"]
    }
  ]
  description = "Egress security group name to database instance"
}

variable "avg_nacl_privada_ingress" {
  default = [
    # Postgres
    {
      protocol   = "tcp"
      rule_no    = 100
      action     = "allow"
      cidr_block = "0.0.0.0/0"
      from_port  = 5432
      to_port    = 5432
    },
    # SSH
    {
      protocol   = "tcp"
      rule_no    = 110
      action     = "allow"
      cidr_block = "0.0.0.0/0"
      from_port  = 22
      to_port    = 22
    },
    # Ephemeral ports
    {
      protocol   = "tcp"
      rule_no    = 120
      action     = "allow"
      cidr_block = "0.0.0.0/0"
      from_port  = 1024
      to_port    = 65535
    }
  ]
  description = "Ingress ACL rules to network acl form private subnet"
}

variable "avg_nacl_privada_egress" {
  default = [
    # Ephemeral ports
    {
      protocol   = "tcp"
      rule_no    = 100
      action     = "allow"
      cidr_block = "0.0.0.0/0"
      from_port  = 1024
      to_port    = 65535
    },
    # HTTP ports
    {
      protocol   = "tcp"
      rule_no    = 110
      action     = "allow"
      cidr_block = "0.0.0.0/0"
      from_port  = 80
      to_port    = 80
    },
    # HTTPs ports
    {
      protocol   = "tcp"
      rule_no    = 120
      action     = "allow"
      cidr_block = "0.0.0.0/0"
      from_port  = 443
      to_port    = 443
    },
    # DNS ports
    {
      protocol   = "tcp"
      rule_no    = 130
      action     = "allow"
      cidr_block = "0.0.0.0/0"
      from_port  = 53
      to_port    = 53
    },
    # DNS ports
    {
      protocol   = "udp"
      rule_no    = 140
      action     = "allow"
      cidr_block = "0.0.0.0/0"
      from_port  = 53
      to_port    = 53
    }
  ]
  description = "Egress ACL rules to network acl form private subnet"
}


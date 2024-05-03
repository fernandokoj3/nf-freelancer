locals {
  ec2_ami = var.ec2_ami
}

data "template_file" "web_installer_init" {
  template = file("./scripts/web-installer.tpl")
  vars = {
    database_ip = "${aws_instance.db_ec2.private_ip}"
  }
}

data "template_file" "database_installer_init" {
  template = file("./scripts/database-installer.tpl")
}

resource "aws_key_pair" "kpair_ssh" {
  key_name   = var.ec2_kpair_ssh_name
  public_key = file(var.ec2_kpair_ssh_file)
}

resource "aws_instance" "web_ec2" {

  ami                         = local.ec2_ami
  instance_type               = var.web_ec2_instance_type
  subnet_id                   = aws_subnet.avg_subnet_publica.id
  associate_public_ip_address = true
  vpc_security_group_ids      = [aws_security_group.avg_sg_web.id]
  key_name                    = aws_key_pair.kpair_ssh.key_name
  user_data                   = data.template_file.web_installer_init.rendered

  tags = {
    Name = format("%s-%s", var.project_main_name, "ec2-web-api")
  }
}

resource "aws_instance" "db_ec2" {

  ami                    = local.ec2_ami
  instance_type          = var.db_ec2_instance_type
  subnet_id              = aws_subnet.avg_subnet_privada.id
  vpc_security_group_ids = [aws_security_group.avg_sg_db.id]
  key_name               = aws_key_pair.kpair_ssh.key_name
  user_data              = data.template_file.database_installer_init.rendered

  tags = {
    Name = format("%s-%s", var.project_main_name, "database-postgres")
  }
}

output "web_api_ip" {
  value = aws_instance.web_ec2.public_ip
}

output "database_ip" {
  value = aws_instance.db_ec2.private_ip
}

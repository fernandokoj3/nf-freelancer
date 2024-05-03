# Settings
project_region    = "us-east-1"
project_main_name = "nf-freelancer"


# Ec2 settings
ec2_ami = "ami-080e1f13689e07408"

ec2_kpair_ssh_name = "rsa-terraform-key"
ec2_kpair_ssh_file = "~/.ssh/id_rsa_on_demand_terraform.pub"

web_ec2_instance_type = "t2.micro"
db_ec2_instance_type  = "t2.micro"

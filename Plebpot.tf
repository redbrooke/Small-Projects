terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "honeypot_rg" {
  name     = "Plebpot-rg"
  location = "westeurope"
}

resource "azurerm_virtual_network" "honeypot_vnet" {
  name                = "Plebpot-vnet"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.honeypot_rg.location
  resource_group_name = azurerm_resource_group.honeypot_rg.name
}

resource "azurerm_subnet" "honeypot_subnet" {
  name                 = "internal"
  resource_group_name  = azurerm_resource_group.honeypot_rg.name
  virtual_network_name = azurerm_virtual_network.honeypot_vnet.name
  address_prefixes     = ["10.0.1.0/24"]
}

resource "azurerm_public_ip" "honeypot_ip" {
  name                = "Plebpot-ip"
  resource_group_name = azurerm_resource_group.honeypot_rg.name
  location            = azurerm_resource_group.honeypot_rg.location
  allocation_method   = "Dynamic"
}

resource "azurerm_network_security_group" "honeypot_nsg" {
  name                = "Plebpot-nsg"
  location            = azurerm_resource_group.honeypot_rg.location
  resource_group_name = azurerm_resource_group.honeypot_rg.name

  security_rule {
    name                       = "SSH"
    priority                   = 1001
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "22"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }
}

resource "azurerm_network_interface" "honeypot_nic" {
  name                = "Plebpot-nic"
  location            = azurerm_resource_group.honeypot_rg.location
  resource_group_name = azurerm_resource_group.honeypot_rg.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.honeypot_subnet.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.honeypot_ip.id
  }
}

resource "azurerm_network_interface_security_group_association" "honeypot_nsg_assoc" {
  network_interface_id      = azurerm_network_interface.honeypot_nic.id
  network_security_group_id = azurerm_network_security_group.honeypot_nsg.id
}

resource "azurerm_linux_virtual_machine" "honeypot_vm" {
  name                = "Plebpot"
  resource_group_name = azurerm_resource_group.honeypot_rg.name
  location            = azurerm_resource_group.honeypot_rg.location
  size                = "Standard_B1ls"
  admin_username      = "adminuser"
  admin_password      = "password"
  disable_password_authentication = false

  network_interface_ids = [
    azurerm_network_interface.honeypot_nic.id,
  ]

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts"
    version   = "latest"
  }
}

output "honeypot_public_ip" {
  value = azurerm_public_ip.honeypot_ip.ip_address

}

### Sentinel

resource "azurerm_log_analytics_datasource_linux_syslog" "syslog_auth" {
  name                = "syslog-auth"
  resource_group_name = azurerm_resource_group.honeypot_rg.name
  workspace_name      = azurerm_log_analytics_workspace.honeypot_law.name
  syslog_facilities   = ["auth", "authpriv", "syslog", "cron", "kern"]
  syslog_levels       = ["Debug", "Info", "Notice", "Warning", "Error", "Critical", "Alert", "Emergency"]
}

resource "azurerm_virtual_machine_extension" "oms_agent" {
  name                       = "OmsAgentForLinux"
  virtual_machine_id         = azurerm_linux_virtual_machine.honeypot_vm.id
  publisher                  = "Microsoft.EnterpriseCloud.Monitoring"
  type                       = "OmsAgentForLinux"
  type_handler_version       = "1.13"
  auto_upgrade_minor_version = true

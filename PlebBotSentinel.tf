# --- Sentinel & Logging Configuration ---

resource "azurerm_log_analytics_workspace" "honeypot_law" {
  name                = "honeypot-vm-law"
  location            = azurerm_resource_group.honeypot_rg.location
  resource_group_name = azurerm_resource_group.honeypot_rg.name
  sku                 = "PerGB2018"
  retention_in_days   = 30
}

resource "azurerm_log_analytics_solution" "sentinel" {
  solution_name         = "SecurityInsights"
  location              = azurerm_resource_group.honeypot_rg.location
  resource_group_name   = azurerm_resource_group.honeypot_rg.name
  workspace_resource_id = azurerm_log_analytics_workspace.honeypot_law.id
  workspace_name        = azurerm_log_analytics_workspace.honeypot_law.name

  plan {
    publisher = "Microsoft"
    product   = "OMSGallery/SecurityInsights"
  }
}

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

  settings = <<SETTINGS
    {
      "workspaceId": "${azurerm_log_analytics_workspace.honeypot_law.workspace_id}"
    }
  SETTINGS

  protected_settings = <<PROTECTED_SETTINGS
    {
      "workspaceKey": "${azurerm_log_analytics_workspace.honeypot_law.primary_shared_key}"
    }
  PROTECTED_SETTINGS
}

output "honeypot_public_ip" {
  value = azurerm_public_ip.honeypot_ip.ip_address
}

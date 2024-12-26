local M = {}

local function onExtensionLoaded()
  print("Loaded JDash interface")
end

local function onUpdate()
  print("Tick JDash interface")
end


M.onExtensionLoaded = onExtensionLoaded
M.onModDeactivated = deleteTempFiles
M.onModActivated = onExtensionLoaded
M.onUpdate = onUpdate
M.onExit = deleteTempFiles
return M
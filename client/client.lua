local function toggleNuiFrame(shouldShow)
  SetNuiFocus(shouldShow, shouldShow)
  SendReactMessage('setVisible', shouldShow)
end

RegisterCommand('bls-hackingdevices:open-frame', function()
  toggleNuiFrame(true)
  debugPrint('Show NUI frame')
end)

RegisterNUICallback('close-frame', function(_, cb)
  toggleNuiFrame(false)
  debugPrint('Hide bls-hackingdevices frame')
  cb({})
end)
hackingCallback = {}

local function toggleNuiFrame(shouldShow, hackType, duration)
  SetNuiFocus(shouldShow, shouldShow)
  message = {}
  message.show = shouldShow
  message.hackType = hackType
  message.duration = duration
  SendReactMessage('setVisible', message)
end


-- HACKTYPE
-- NUMERIC = 'numeric',
-- ALPHABET = 'aplhabet',
-- ALPHANUMERIC = 'alphanumeric',
-- GREEK = 'greek',
-- BRAILLE = 'braille',
-- RUNES = 'runes',


RegisterNetEvent('bls-hackingdevices:start-hacking', function(hackType, duration, callback)
  hackingCallback = callback;
  toggleNuiFrame(true, hackType, duration)
  debugPrint('Show NUI frame', hackType, duration)
end)


RegisterNUICallback('close-frame', function(data, cb)
  toggleNuiFrame(false)
  debugPrint('Hide bls-hackingdevices frame', data.success, data.remainingTime)
  hackingCallback(data.success, data.remainingTime)
  cb({})
end)
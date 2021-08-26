hackingCallback = {}

local function toggleNuiFrame(shouldShow, hackType, gameType, duration)
  SetNuiFocus(shouldShow, shouldShow)
  message = {}
  message.show = shouldShow
  message.hackType = hackType
  message.gameType = gameType
  message.duration = duration
  SendReactMessage("setVisible", message)
end


-- HACKTYPE
-- NUMERIC = 'numeric',
-- ALPHABET = 'aplhabet',
-- ALPHANUMERIC = 'alphanumeric',
-- GREEK = 'greek',
-- BRAILLE = 'braille',
-- RUNES = 'runes',

-- GAMETYPE
-- RANDOM = 'random',
-- NORMAL = 'normal',
-- MIRRORED = 'mirrored'



RegisterNetEvent("bls-hackingdevices:start-hacking", function(hackType, gameType, duration, callback)
  hackingCallback = callback;
  toggleNuiFrame(true, hackType, gameType, duration)
  debugPrint("Show NUI frame", hackType, gameType, duration)
end)


-- returns a boolean, whether hack was successful or not
RegisterNUICallback("close-frame", function(data, cb)
  toggleNuiFrame(false)
  debugPrint("Hide bls-hackingdevices frame", data)
  hackingCallback(data)
  cb({})
end)


--testing func

local function testCallback(data)
  print("hehee")
  print(data)
end

RegisterCommand("testHack", function (source, args)
  TriggerEvent("bls-hackingdevices:start-hacking", args[0], args[1], args[2], testCallback)
end)
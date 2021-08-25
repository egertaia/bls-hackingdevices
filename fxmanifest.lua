fx_version "cerulean"

description "Basic Hacking device minigame"
author "egertaia"
version '0.0.1'
repository 'https://github.com/egertaia/bls-hackingdevices'

lua54 'yes'

games {
  "gta5",
}

ui_page 'web/build/index.html'

client_script "client/**/*"
server_script "server/**/*"

files {
  'web/build/index.html',
  'web/build/**/*'
}
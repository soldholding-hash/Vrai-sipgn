import sys

path = "App.jsx"
c = open(path, encoding="utf-8").read()

old = '''    fetch("https://sipgn.metered.live/api/v1/turn/credentials?apiKey=EkNvXhS5n9vhb9jMh6jrefLVVRYT7faDxJ1WW64KCOP1Zhy2")
      .then(function(r) { return r.json(); })
      .then(function(servers) { iceServersRef.current = servers; })
      .catch(function() {});'''

new = '''    fetch("https://sipgn.metered.live/api/v1/turn/credentials?apiKey=EkNvXhS5n9vhb9jMh6jrefLVVRYT7faDxJ1WW64KCOP1Zhy2")
      .then(function(r) { return r.json(); })
      .then(function(servers) {
        if (Array.isArray(servers) && servers.length > 0) {
          iceServersRef.current = servers;
        } else {
          iceServersRef.current = null;
        }
      })
      .catch(function() { iceServersRef.current = null; });'''

count = c.count(old)
print("Occurrences trouvees:", count)
if count == 1:
    c = c.replace(old, new)
    print("Patch applique: OK")
    open(path, "w", encoding="utf-8").write(c)
else:
    print("ATTENTION: ancre non unique ou introuvable")
    sys.exit(1)

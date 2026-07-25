import sys

path = "App.jsx"
c = open(path, encoding="utf-8").read()

old = '''    fetch("https://sipgn.metered.live/api/v1/turn/credentials?apiKey=EkNvXhS5n9vhb9jMh6jrefLVVRYT7faDxJ1WW64KCOP1Zhy2")
      .then(function(r) { return r.json(); })
      .then(function(servers) {
        if (Array.isArray(servers) && servers.length > 0) {
          iceServersRef.current = servers;
        } else {
          iceServersRef.current = null;
        }
      })
      .catch(function() { iceServersRef.current = null; });'''

new = '''    iceServersRef.current = [
      { urls: "stun:stun.relay.metered.ca:80" },
      { urls: "turn:global.relay.metered.ca:80", username: "f18a700b861adb4c5790a4de", credential: "E4PQOCLWhXQ01wLY" },
      { urls: "turn:global.relay.metered.ca:80?transport=tcp", username: "f18a700b861adb4c5790a4de", credential: "E4PQOCLWhXQ01wLY" },
      { urls: "turn:global.relay.metered.ca:443", username: "f18a700b861adb4c5790a4de", credential: "E4PQOCLWhXQ01wLY" },
      { urls: "turns:global.relay.metered.ca:443?transport=tcp", username: "f18a700b861adb4c5790a4de", credential: "E4PQOCLWhXQ01wLY" }
    ];'''

count = c.count(old)
print("Occurrences trouvees:", count)
if count == 1:
    c = c.replace(old, new)
    print("Patch applique: OK")
    open(path, "w", encoding="utf-8").write(c)
else:
    print("ATTENTION: ancre non unique ou introuvable")
    sys.exit(1)

import sys

path = "App.jsx"
c = open(path, encoding="utf-8").read()

old = '''new RTCPeerConnection({iceServers:[{urls:"stun:stun.l.google.com:19302"}]});'''

new = '''new RTCPeerConnection({iceServers:[
          {urls:"stun:stun.l.google.com:19302"},
          {urls:"turn:openrelay.metered.ca:80", username:"openrelayproject", credential:"openrelayproject"},
          {urls:"turn:openrelay.metered.ca:443", username:"openrelayproject", credential:"openrelayproject"},
          {urls:"turn:openrelay.metered.ca:443?transport=tcp", username:"openrelayproject", credential:"openrelayproject"}
        ]});'''

count = c.count(old)
print("Occurrences trouvees:", count)
if count == 2:
    c = c.replace(old, new)
    print("Serveur TURN ajoute aux 2 occurrences: OK")
    open(path, "w", encoding="utf-8").write(c)
else:
    print("ATTENTION: nombre d'occurrences different de 2, rien applique. Verifier manuellement.")
    sys.exit(1)

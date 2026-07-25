import sys

path = "App.jsx"
c = open(path, encoding="utf-8").read()

# ---- PATCH A: ajouter iceServersRef + fetch des identifiants TURN au montage ----
old_a = '''  useEffect(function() {
    function majPresence() {'''

new_a = '''  var iceServersRef = useRef(null);

  useEffect(function() {
    fetch("https://sipgn.metered.live/api/v1/turn/credentials?apiKey=EkNvXhS5n9vhb9jMh6jrefLVVRYT7faDxJ1WW64KCOP1Zhy2")
      .then(function(r) { return r.json(); })
      .then(function(servers) { iceServersRef.current = servers; })
      .catch(function() {});
  }, []);

  useEffect(function() {
    function majPresence() {'''

count_a = c.count(old_a)
print("PATCH A - Occurrences trouvees:", count_a)
if count_a == 1:
    c = c.replace(old_a, new_a)
    print("PATCH A applique: OK")
else:
    print("PATCH A: ANCRE NON UNIQUE OU INTROUVABLE - ARRET")
    sys.exit(1)

# ---- PATCH B: remplacer les 2 configurations RTCPeerConnection statiques par la config dynamique ----
old_b = '''new RTCPeerConnection({iceServers:[
          {urls:"stun:stun.l.google.com:19302"},
          {urls:"turn:openrelay.metered.ca:80", username:"openrelayproject", credential:"openrelayproject"},
          {urls:"turn:openrelay.metered.ca:443", username:"openrelayproject", credential:"openrelayproject"},
          {urls:"turn:openrelay.metered.ca:443?transport=tcp", username:"openrelayproject", credential:"openrelayproject"}
        ]});'''

new_b = '''new RTCPeerConnection({iceServers: iceServersRef.current || [{urls:"stun:stun.l.google.com:19302"}]});'''

count_b = c.count(old_b)
print("PATCH B - Occurrences trouvees:", count_b)
if count_b == 2:
    c = c.replace(old_b, new_b)
    print("PATCH B applique aux 2 occurrences: OK")
else:
    print("PATCH B: nombre d'occurrences different de 2 (" + str(count_b) + ") - ARRET")
    open(path, "w", encoding="utf-8").write(c)
    sys.exit(1)

open(path, "w", encoding="utf-8").write(c)
print("Fichier sauvegarde.")

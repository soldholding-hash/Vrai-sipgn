import sys

path = "App.jsx"
c = open(path, encoding="utf-8").read()

old = '''    var diagTimer = setInterval(function() {
      if (pcRef.current) {
        var ice = pcRef.current.iceConnectionState;
        var conn = pcRef.current.connectionState;
        setDebugStatus("Micro: OK — ICE: " + ice + " — Connexion: " + conn);
      } else {
        setDebugStatus("En attente du micro / connexion...");
      }
    }, 1000);'''

new = '''    var diagTimer = setInterval(function() {
      setDebugStatus(function(prev) {
        if (prev && prev.indexOf("Erreur micro") === 0) { return prev; }
        if (pcRef.current) {
          var ice = pcRef.current.iceConnectionState;
          var conn = pcRef.current.connectionState;
          return "Micro: OK — ICE: " + ice + " — Connexion: " + conn;
        }
        return "En attente du micro / connexion...";
      });
    }, 1000);'''

count = c.count(old)
print("Occurrences trouvees:", count)
if count == 1:
    c = c.replace(old, new)
    print("Patch applique: OK")
    open(path, "w", encoding="utf-8").write(c)
else:
    print("ATTENTION: ancre non unique ou introuvable")
    sys.exit(1)

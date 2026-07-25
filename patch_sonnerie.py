import sys

path = "App.jsx"
c = open(path, encoding="utf-8").read()

# ---- PATCH A: ajouter les refs pour la sonnerie ----
old_a = '''  var remoteAudioRef = useRef(null);'''
new_a = '''  var remoteAudioRef = useRef(null);
  var ringtoneCtxRef = useRef(null);
  var ringtoneOscRef = useRef(null);'''

count_a = c.count(old_a)
print("PATCH A - Occurrences trouvees:", count_a)
if count_a == 1:
    c = c.replace(old_a, new_a)
    print("PATCH A applique: OK")
else:
    print("PATCH A: ANCRE NON UNIQUE OU INTROUVABLE - ARRET")
    sys.exit(1)

# ---- PATCH B: fonctions jouerSonnerie/arreterSonnerie + useEffect declencheur ----
old_b = '''  // Diagnostic connexion (ICE) pendant un appel'''

new_b = '''  function jouerSonnerie() {
    if (ringtoneCtxRef.current) { return; }
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      var ctx = new AC();
      ringtoneCtxRef.current = ctx;
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.frequency.value = 800;
      osc.type = "sine";
      gain.gain.value = 0;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      ringtoneOscRef.current = osc;
      var t = ctx.currentTime;
      for (var i = 0; i < 60; i++) {
        gain.gain.setValueAtTime(0.18, t + i * 1.2);
        gain.gain.setValueAtTime(0.18, t + i * 1.2 + 0.35);
        gain.gain.setValueAtTime(0, t + i * 1.2 + 0.4);
      }
    } catch (e) {}
  }

  function arreterSonnerie() {
    if (ringtoneOscRef.current) {
      try { ringtoneOscRef.current.stop(); } catch (e) {}
      ringtoneOscRef.current = null;
    }
    if (ringtoneCtxRef.current) {
      try { ringtoneCtxRef.current.close(); } catch (e) {}
      ringtoneCtxRef.current = null;
    }
  }

  useEffect(function() {
    if (appelEntrant && !enAppel) {
      jouerSonnerie();
    } else {
      arreterSonnerie();
    }
    return function() { arreterSonnerie(); };
  }, [appelEntrant, enAppel]);

  // Diagnostic connexion (ICE) pendant un appel'''

count_b = c.count(old_b)
print("PATCH B - Occurrences trouvees:", count_b)
if count_b == 1:
    c = c.replace(old_b, new_b)
    print("PATCH B applique: OK")
    open(path, "w", encoding="utf-8").write(c)
else:
    print("PATCH B: ANCRE NON UNIQUE OU INTROUVABLE - ARRET")
    open(path, "w", encoding="utf-8").write(c)
    sys.exit(1)

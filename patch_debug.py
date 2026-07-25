import sys

path = "App.jsx"
c = open(path, encoding="utf-8").read()

# ---- PATCH 1: ajouter le state debugStatus ----
old1 = '''  var nouveauNumeroState = useState(""); var nouveauNumero = nouveauNumeroState[0]; var setNouveauNumero = nouveauNumeroState[1];'''
new1 = '''  var nouveauNumeroState = useState(""); var nouveauNumero = nouveauNumeroState[0]; var setNouveauNumero = nouveauNumeroState[1];
  var debugStatusState = useState(""); var debugStatus = debugStatusState[0]; var setDebugStatus = debugStatusState[1];'''

count1 = c.count(old1)
print("PATCH 1 - Occurrences trouvees:", count1)
if count1 == 1:
    c = c.replace(old1, new1)
    print("PATCH 1 applique: OK")
else:
    print("PATCH 1: ANCRE NON UNIQUE OU INTROUVABLE - ARRET")
    sys.exit(1)

# ---- PATCH 2: catcher les erreurs micro au lieu de les avaler silencieusement ----
old2 = '''}).catch(function(){});'''
new2 = '''}).catch(function(err){ setDebugStatus("Erreur micro: " + (err && err.name ? err.name : String(err))); });'''

count2 = c.count(old2)
print("PATCH 2 - Occurrences trouvees:", count2)
if count2 == 2:
    c = c.replace(old2, new2)
    print("PATCH 2 applique aux 2 occurrences: OK")
else:
    print("PATCH 2: nombre d'occurrences different de 2 (" + str(count2) + "), rien applique pour ce patch")

# ---- PATCH 3: observateur independant de l'etat ICE, poll pcRef toutes les secondes ----
old3 = '''  // Chrono appel
  useEffect(function() {
    if(enAppel) {
      var t = setInterval(function() { setDuree(function(d) { return d+1; }); }, 1000);
      return function() { clearInterval(t); };
    } else {
      setDuree(0);
    }
  }, [enAppel]);'''

new3 = '''  // Chrono appel
  useEffect(function() {
    if(enAppel) {
      var t = setInterval(function() { setDuree(function(d) { return d+1; }); }, 1000);
      return function() { clearInterval(t); };
    } else {
      setDuree(0);
    }
  }, [enAppel]);

  // Diagnostic connexion (ICE) pendant un appel
  useEffect(function() {
    var actif = enAppel || appelSortant || appelEntrant;
    if (!actif) { setDebugStatus(""); return; }
    var diagTimer = setInterval(function() {
      if (pcRef.current) {
        var ice = pcRef.current.iceConnectionState;
        var conn = pcRef.current.connectionState;
        setDebugStatus("Micro: OK — ICE: " + ice + " — Connexion: " + conn);
      } else {
        setDebugStatus("En attente du micro / connexion...");
      }
    }, 1000);
    return function() { clearInterval(diagTimer); };
  }, [enAppel, appelSortant, appelEntrant]);'''

count3 = c.count(old3)
print("PATCH 3 - Occurrences trouvees:", count3)
if count3 == 1:
    c = c.replace(old3, new3)
    print("PATCH 3 applique: OK")
else:
    print("PATCH 3: ANCRE NON UNIQUE OU INTROUVABLE - ARRET")
    open(path, "w", encoding="utf-8").write(c)
    sys.exit(1)

# ---- PATCH 4: afficher debugStatus dans l'ecran "en appel" ----
old4 = '''          <p className="text-slate-500 text-sm">Appel en cours — chiffré</p>
        </div>'''
new4 = '''          <p className="text-slate-500 text-sm">Appel en cours — chiffré</p>
          <p className="text-amber-400 text-xs font-mono">{debugStatus}</p>
        </div>'''

count4 = c.count(old4)
print("PATCH 4 - Occurrences trouvees:", count4)
if count4 == 1:
    c = c.replace(old4, new4)
    print("PATCH 4 applique: OK")
else:
    print("PATCH 4: ANCRE NON UNIQUE OU INTROUVABLE - ignore")

# ---- PATCH 5: afficher debugStatus dans l'ecran "appel sortant" ----
old5 = '''            <p className="text-slate-400 text-sm mt-1 animate-pulse">Appel en cours...</p>
          </div>'''
new5 = '''            <p className="text-slate-400 text-sm mt-1 animate-pulse">Appel en cours...</p>
            <p className="text-amber-400 text-xs font-mono mt-2">{debugStatus}</p>
          </div>'''

count5 = c.count(old5)
print("PATCH 5 - Occurrences trouvees:", count5)
if count5 == 1:
    c = c.replace(old5, new5)
    print("PATCH 5 applique: OK")
else:
    print("PATCH 5: ANCRE NON UNIQUE OU INTROUVABLE - ignore")

open(path, "w", encoding="utf-8").write(c)
print("Fichier sauvegarde.")

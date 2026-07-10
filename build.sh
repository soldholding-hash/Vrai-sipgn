#!/bin/bash
# Build SIPGN
npm run build
# Renommer ERP
mv dist/index.html dist/erp.html
# Copier site vitrine
cp vitrine/index.html dist/index.html
# Ajouter CSS Tailwind a l ERP
npx tailwindcss -i src/index.css -o dist/sipgn.css --content "App.jsx" --minify
python3 -c "
c=open('dist/erp.html').read()
if 'tailwindcss.com' not in c:
    c=c.replace('</head>','<script src=\"https://cdn.tailwindcss.com\"></script><link rel=\"stylesheet\" href=\"/sipgn.css\"/></head>')
open('dist/erp.html','w').write(c)
"
echo "Build termine"
